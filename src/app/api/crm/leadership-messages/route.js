import { NextResponse } from "next/server";
import { LeadershipMessageService } from "@/services/LeadershipMessageService";
import { leadershipMessageSchema } from "@/features/leadership-messages/validations/leadership-message.validation";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || undefined;
    const homepage_visible = searchParams.get("homepage_visible");
    const about_visible = searchParams.get("about_visible");
    const featured = searchParams.get("featured");
    const sortField = searchParams.get("sortField") || "display_order";
    const sortOrder = searchParams.get("sortOrder") || 1;

    const result = await LeadershipMessageService.getCrmMessages({
      page,
      limit,
      search,
      status,
      homepage_visible,
      about_visible,
      featured,
      sortField,
      sortOrder,
    });

    return NextResponse.json({ success: true, message: "Messages fetched successfully.", data: result });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message, errors: [error.message] }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const validatedData = leadershipMessageSchema.parse(body);
    
    // Mock user ID for now
    const userId = null;
    
    const newMessage = await LeadershipMessageService.createMessage(validatedData, userId);
    return NextResponse.json({ success: true, message: "Leadership message created successfully.", data: newMessage }, { status: 201 });
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json({ success: false, message: "Validation failed", errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: error.message, errors: [error.message] }, { status: 500 });
  }
}
