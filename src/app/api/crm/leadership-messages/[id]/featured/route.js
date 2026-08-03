import { NextResponse } from "next/server";
import { LeadershipMessageService } from "@/services/LeadershipMessageService";
import { z } from "zod";

const featuredSchema = z.object({
  featured: z.boolean()
});

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { featured } = featuredSchema.parse(body);
    
    const userId = null;
    const updatedMessage = await LeadershipMessageService.updateMessage(id, { featured }, userId);
    
    return NextResponse.json({ success: true, message: "Featured status updated successfully.", data: updatedMessage });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message, errors: [error.message] }, { status: 400 });
  }
}
