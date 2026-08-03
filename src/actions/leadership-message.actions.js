"use server";

import { LeadershipMessageService } from "@/services/LeadershipMessageService";
import { revalidatePath, revalidateTag } from "next/cache";
import { leadershipMessageSchema, leadershipMessageUpdateSchema } from "@/features/leadership-messages/validations/leadership-message.validation";

function apiResponse(success, data = null, message = "", errors = []) {
  return { success, data, message, errors };
}

export async function createLeadershipMessageAction(formData) {
  try {
    const validatedData = leadershipMessageSchema.parse(formData);
    const userId = null; // Mock user ID

    const newMessage = await LeadershipMessageService.createMessage(validatedData, userId);
    
    // Revalidate related pages
    revalidatePath("/admin/leadership-messages");
    revalidatePath("/[locale]/about", "page");
    revalidatePath("/[locale]", "page");
    revalidatePath("/", "layout");
    revalidateTag("about-page");
    revalidateTag("homepage");
    
    return apiResponse(true, newMessage, "Leadership message created successfully.");
  } catch (error) {
    console.error("Create Leadership Message Error:", error);
    if (error.name === "ZodError") {
      return apiResponse(false, null, "Validation failed", error.errors);
    }
    return apiResponse(false, null, error.message, [error.message]);
  }
}

export async function updateLeadershipMessageAction(id, formData) {
  try {
    const validatedData = leadershipMessageUpdateSchema.parse(formData);
    const userId = null; // Mock user ID

    const updatedMessage = await LeadershipMessageService.updateMessage(id, validatedData, userId);
    
    // Revalidate related pages
    revalidatePath("/admin/leadership-messages");
    revalidatePath("/[locale]/about", "page");
    revalidatePath("/[locale]", "page");
    revalidatePath("/", "layout");
    revalidateTag("about-page");
    revalidateTag("homepage");
    
    return apiResponse(true, updatedMessage, "Leadership message updated successfully.");
  } catch (error) {
    console.error("Update Leadership Message Error:", error);
    if (error.name === "ZodError") {
      return apiResponse(false, null, "Validation failed", error.errors);
    }
    return apiResponse(false, null, error.message, [error.message]);
  }
}
