import { NextResponse } from "next/server";
import { LeadershipMessageService } from "@/services/LeadershipMessageService";
import { z } from "zod";

const visibleSchema = z.object({
  about_visible: z.boolean()
});

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { about_visible } = visibleSchema.parse(body);
    
    const userId = null;
    const updatedMessage = await LeadershipMessageService.updateMessage(id, { about_visible }, userId);
    
    return NextResponse.json({ success: true, message: "About visibility updated successfully.", data: updatedMessage });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message, errors: [error.message] }, { status: 400 });
  }
}
