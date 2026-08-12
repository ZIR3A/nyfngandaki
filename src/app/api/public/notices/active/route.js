import { NextResponse } from 'next/server';
import { NoticeService } from '@/services/NoticeService';

// This API endpoint might be called frequently from the homepage.
// We can use Next.js caching or revalidate strategies.
export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  try {
    const activeNotices = await NoticeService.getActiveNotices();
    
    if (!activeNotices || activeNotices.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        message: "No active notices found"
      }, { status: 200 });
    }

    // Filter sensitive fields before returning to public
    const publicNoticesData = activeNotices.map(activeNotice => ({
      id: activeNotice._id,
      title: activeNotice.title,
      summary: activeNotice.summary,
      content: activeNotice.content,
      type: activeNotice.type,
      priority: activeNotice.priority,
      displayFrequency: activeNotice.displayFrequency,
      popupDelay: activeNotice.popupDelay,
      attachments: activeNotice.attachments || []
    }));

    return NextResponse.json({
      success: true,
      data: publicNoticesData,
      message: "Active notices fetched successfully"
    }, { status: 200 });

  } catch (error) {
    console.error("Public API Active Notice Error:", error);
    // Return empty data on error so it doesn't break the public UI
    return NextResponse.json({
      success: false,
      data: null,
      message: "Failed to fetch active notice"
    }, { status: 200 }); 
    // Status 200 is intentionally used for silent fail-safe behavior
  }
}
