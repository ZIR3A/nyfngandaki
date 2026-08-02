"use server";

import { revalidatePath } from "next/cache";
import { registrationService } from "../services/registrationService";

export async function submitRegistrationAction(eventId, formData) {
  try {
    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      organization: formData.get("organization") || "",
    };

    if (!data.fullName || !data.email || !data.phone) {
      return { success: false, error: "Missing required fields" };
    }

    const registration = await registrationService.registerForEvent(eventId, data);
    
    // MOCK EMAIL DISPATCH
    // In production, we'd trigger Resend/Sendgrid here
    console.log(`[MOCK EMAIL] Dispatching Ticket Confirmation to ${data.email} for ticket ${registration.ticketId}`);

    return { success: true, data: registration };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function updateRegistrationStatusAction(registrationId, status) {
  try {
    await registrationService.updateRegistrationStatus(registrationId, status);
    revalidatePath("/admin/events/[id]/registrations", "page");
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
