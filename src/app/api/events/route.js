import { NextResponse } from 'next/server';
import { eventService } from '@/features/events/services/eventService';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const category = searchParams.get('category') || '';

    const result = await eventService.getEvents({ page, limit, search, status, category });

    return NextResponse.json({
      success: true,
      data: result.events,
      pagination: result.pagination
    });
  } catch (error) {
    console.error("API /api/events error:", error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
