import { NextResponse } from "next/server";
import { LeadershipMessageService } from "@/services/LeadershipMessageService";

export async function GET(request) {
  try {
    const messages = await LeadershipMessageService.getHomepageMessages();
    return NextResponse.json({ success: true, message: "Homepage messages fetched successfully.", data: messages });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message, errors: [error.message] }, { status: 500 });
  }
}
