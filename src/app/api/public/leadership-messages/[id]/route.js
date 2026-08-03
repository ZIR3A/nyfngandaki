import { NextResponse } from "next/server";
import { LeadershipMessageService } from "@/services/LeadershipMessageService";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const message = await LeadershipMessageService.getMessageById(id);
    
    if (!message || message.status !== "published") {
      return NextResponse.json({ success: false, message: "Message not found or not published.", errors: [] }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: "Message fetched successfully.", data: message });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message, errors: [error.message] }, { status: 500 });
  }
}
