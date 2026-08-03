import { NextResponse } from "next/server";
import { LeadershipMessageService } from "@/services/LeadershipMessageService";
import { leadershipMessageUpdateSchema } from "@/features/leadership-messages/validations/leadership-message.validation";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const message = await LeadershipMessageService.getMessageById(id);
    if (!message) {
      return NextResponse.json({ success: false, message: "Leadership message not found.", errors: [] }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Message fetched successfully.", data: message });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message, errors: [error.message] }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = leadershipMessageUpdateSchema.parse(body);
    
    // Mock user ID for now
    const userId = null;
    
    const updatedMessage = await LeadershipMessageService.updateMessage(id, validatedData, userId);
    return NextResponse.json({ success: true, message: "Leadership message updated successfully.", data: updatedMessage });
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json({ success: false, message: "Validation failed", errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: error.message, errors: [error.message] }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const userId = null; // Mock user ID for now
    
    await LeadershipMessageService.deleteMessage(id, userId);
    return NextResponse.json({ success: true, message: "Leadership message deleted successfully.", data: null });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message, errors: [error.message] }, { status: 500 });
  }
}
