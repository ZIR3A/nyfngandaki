import { NextResponse } from "next/server";
import { LeadershipMessageService } from "@/services/LeadershipMessageService";
import { z } from "zod";

const statusSchema = z.object({
  status: z.enum(["draft", "published", "archived"])
});

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status } = statusSchema.parse(body);
    
    const userId = null;
    const updatedMessage = await LeadershipMessageService.updateMessage(id, { status }, userId);
    
    return NextResponse.json({ success: true, message: "Status updated successfully.", data: updatedMessage });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message, errors: [error.message] }, { status: 400 });
  }
}
