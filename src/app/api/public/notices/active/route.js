import { NextResponse } from 'next/server';
import { NoticeService } from '@/services/NoticeService';

// This API endpoint might be called frequently from the homepage.
// We can use Next.js caching or revalidate strategies.
export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  try {
    const activeNotice = await NoticeService.getActiveNotice();
    
    if (!activeNotice) {
      return NextResponse.json({
        success: true,
        data: null,
        message: "No active notice found"
      }, { status: 200 });
    }

    // Filter sensitive fields before returning to public
    const publicNoticeData = {
      id: activeNotice._id,
      title: activeNotice.title,
      summary: activeNotice.summary,
      content: activeNotice.content,
      type: activeNotice.type,
      priority: activeNotice.priority,
      displayFrequency: activeNotice.displayFrequency,
      popupDelay: activeNotice.popupDelay,
      attachments: activeNotice.attachments || []
    };

    return NextResponse.json({
      success: true,
      data: publicNoticeData,
      message: "Active notice fetched successfully"
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
