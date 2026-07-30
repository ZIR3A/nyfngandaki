import { NextResponse } from 'next/server';
import { auth } from '@/auth';

import { aboutService } from '@/features/about/services/aboutService';
import connectToDatabase from '@/lib/mongodb';
import AboutFAQ from '@/models/AboutFAQ';

export async function GET(request) {
  try {
    const session = await auth();
    if (!session || !['Super Admin', 'Admin'].includes(session.user.role)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const provinceId = process.env.NEXT_PUBLIC_PROVINCE_ID || '64f0b2f6e4b0a1b2c3d4e5f6';
    await connectToDatabase();
    
    // Get ALL items including INACTIVE for admin
    const data = await AboutFAQ.find({ provinceId, deletedAt: null }).sort({ displayOrder: 1 }).lean();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('FAQs GET error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!session || !['Super Admin', 'Admin'].includes(session.user.role)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { items } = await request.json();
    const provinceId = process.env.NEXT_PUBLIC_PROVINCE_ID || '64f0b2f6e4b0a1b2c3d4e5f6';
    const userId = session.user.id;
    
    await connectToDatabase();
    
    const existing = await AboutFAQ.find({ provinceId, deletedAt: null });
    const existingIds = existing.map(e => e._id.toString());
    const incomingIds = items.filter(v => v._id).map(v => v._id);
    
    const toDelete = existingIds.filter(id => !incomingIds.includes(id));
    for (const id of toDelete) {
      await aboutService.deleteFAQ(id, userId);
    }
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const payload = { ...item, displayOrder: i + 1 };
      
      if (item._id && existingIds.includes(item._id)) {
        await aboutService.updateFAQ(item._id, payload, userId);
      } else {
        await aboutService.createFAQ(provinceId, payload, userId);
      }
    }

    const { revalidateTag } = require('next/cache');
    revalidateTag('about-page');

    return NextResponse.json({ success: true, message: 'Synced successfully' });
  } catch (error) {
    console.error('FAQs Sync error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
