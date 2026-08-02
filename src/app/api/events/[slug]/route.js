import { NextResponse } from 'next/server';
import { eventService } from '@/features/events/services/eventService';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const event = await eventService.getEventBySlug(slug);

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error(`API /api/events/${params.slug} error:`, error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
