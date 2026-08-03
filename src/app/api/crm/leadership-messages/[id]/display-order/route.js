import { NextResponse } from "next/server";
import { LeadershipMessageService } from "@/services/LeadershipMessageService";
import { z } from "zod";

const orderSchema = z.object({
  display_order: z.coerce.number().min(0)
});

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { display_order } = orderSchema.parse(body);
    
    const userId = null;
    const updatedMessage = await LeadershipMessageService.updateMessage(id, { display_order }, userId);
    
    return NextResponse.json({ success: true, message: "Display order updated successfully.", data: updatedMessage });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message, errors: [error.message] }, { status: 400 });
  }
}
