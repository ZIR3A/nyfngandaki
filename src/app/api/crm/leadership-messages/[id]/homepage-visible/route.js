import { NextResponse } from "next/server";
import { LeadershipMessageService } from "@/services/LeadershipMessageService";
import { z } from "zod";

const visibleSchema = z.object({
  homepage_visible: z.boolean()
});

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { homepage_visible } = visibleSchema.parse(body);
    
    const userId = null;
    const updatedMessage = await LeadershipMessageService.updateMessage(id, { homepage_visible }, userId);
    
    return NextResponse.json({ success: true, message: "Homepage visibility updated successfully.", data: updatedMessage });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message, errors: [error.message] }, { status: 400 });
  }
}
