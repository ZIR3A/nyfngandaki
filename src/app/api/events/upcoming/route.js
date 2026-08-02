import { NextResponse } from 'next/server';
import { eventService } from '@/features/events/services/eventService';

export async function GET() {
  try {
    // Just fetch upcoming events, maybe limit to 5
    const result = await eventService.getEvents({ 
      page: 1, 
      limit: 5, 
      status: 'Upcoming' 
    });

    return NextResponse.json({
      success: true,
      data: result.events,
    });
  } catch (error) {
    console.error("API /api/events/upcoming error:", error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
