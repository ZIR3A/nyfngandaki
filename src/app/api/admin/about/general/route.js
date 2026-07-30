import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { auth } from '@/auth';

import { aboutService } from '@/features/about/services/aboutService';
import connectToDatabase from '@/lib/mongodb';

export async function GET(request) {
  try {
    const session = await auth();
    if (!session || !['Super Admin', 'Admin'].includes(session.user.role)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    
    // For now, using default province
    const provinceId = process.env.NEXT_PUBLIC_PROVINCE_ID || '64f0b2f6e4b0a1b2c3d4e5f6';
    const data = await aboutService.getPublicAboutPage(provinceId);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('General About GET error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const session = await auth();
    if (!session || !['Super Admin', 'Admin'].includes(session.user.role)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const provinceId = process.env.NEXT_PUBLIC_PROVINCE_ID || '64f0b2f6e4b0a1b2c3d4e5f6';
    
    await connectToDatabase();
    
    // We expect the frontend to pass the exact nested objects: hero, organization, leadership, cta, seo, documents config
    const updated = await aboutService.updateAboutPage(provinceId, data, session.user.id);
    
    revalidateTag('about-page');

    return NextResponse.json({ success: true, data: updated, message: 'Updated successfully' });
  } catch (error) {
    console.error('General About PUT error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
