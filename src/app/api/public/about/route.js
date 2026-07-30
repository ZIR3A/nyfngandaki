import { aboutService } from '@/features/about/services/aboutService';
import connectToDatabase from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const provinceId = searchParams.get('provinceId');

    if (!provinceId) {
      return NextResponse.json({ success: false, message: 'Province ID is required', errors: [] }, { status: 400 });
    }

    let data = await aboutService.getPublicAboutPage(provinceId);



    return NextResponse.json({
      success: true,
      message: 'About page data retrieved successfully',
      data,
    });
  } catch (error) {
    console.error('Error fetching public about page:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to retrieve about page data',
      errors: [error.message],
    }, { status: 500 });
  }
}
