import { NextResponse } from 'next/server';
import { auth } from '@/auth';

import { aboutService } from '@/features/about/services/aboutService';
import connectToDatabase from '@/lib/mongodb';
import AboutCoreValue from '@/models/AboutCoreValue';

export async function GET(request) {
  try {
    const session = await auth();
    if (!session || !['Super Admin', 'Admin'].includes(session.user.role)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const provinceId = process.env.NEXT_PUBLIC_PROVINCE_ID || '64f0b2f6e4b0a1b2c3d4e5f6';
    await connectToDatabase();
    
    // Get ALL items including INACTIVE for admin
    const data = await AboutCoreValue.find({ provinceId, deletedAt: null }).sort({ displayOrder: 1 }).lean();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Core Values GET error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!session || !['Super Admin', 'Admin'].includes(session.user.role)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { coreValues } = await request.json();
    const provinceId = process.env.NEXT_PUBLIC_PROVINCE_ID || '64f0b2f6e4b0a1b2c3d4e5f6';
    const userId = session.user.id;
    
    await connectToDatabase();
    
    // Simple bulk sync: for these small arrays, it's often easiest to just clear and recreate 
    // to maintain exact order and handle deletions/additions seamlessly.
    // However, to preserve IDs, we can update existing, create new, and delete missing.
    
    const existing = await AboutCoreValue.find({ provinceId, deletedAt: null });
    const existingIds = existing.map(e => e._id.toString());
    const incomingIds = coreValues.filter(v => v._id).map(v => v._id);
    
    // 1. Delete missing
    const toDelete = existingIds.filter(id => !incomingIds.includes(id));
    for (const id of toDelete) {
      await aboutService.deleteCoreValue(id, userId);
    }
    
    // 2. Update or Create
    for (let i = 0; i < coreValues.length; i++) {
      const item = coreValues[i];
      const payload = { ...item, displayOrder: i + 1 }; // Force order based on array position
      
      if (item._id && existingIds.includes(item._id)) {
        await aboutService.updateCoreValue(item._id, payload, userId);
      } else {
        await aboutService.createCoreValue(provinceId, payload, userId);
      }
    }

    const { revalidateTag } = require('next/cache');
    revalidateTag('about-page');

    return NextResponse.json({ success: true, message: 'Synced successfully' });
  } catch (error) {
    console.error('Core Values Sync error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
