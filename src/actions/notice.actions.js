"use server";

import { NoticeService } from "@/services/NoticeService";
import { revalidatePath } from "next/cache";

/**
 * Standardize API Response
 */
function apiResponse(success, data = null, message = "", errors = []) {
  return { success, data, message, errors };
}

export async function createNoticeAction(formData) {
  try {
    const newNotice = await NoticeService.create(formData);
    
    // Revalidate public and admin pages
    revalidatePath("/admin/notices");
    revalidatePath("/", "layout");
    
    return apiResponse(true, newNotice, "Notice created successfully.");
  } catch (error) {
    console.error("Create Notice Error:", error);
    return apiResponse(false, null, "Failed to create notice.", [error.message]);
  }
}

export async function updateNoticeAction(id, formData) {
  try {
    const updatedNotice = await NoticeService.update(id, formData);
    
    revalidatePath("/admin/notices");
    revalidatePath("/", "layout");
    
    return apiResponse(true, updatedNotice, "Notice updated successfully.");
  } catch (error) {
    console.error("Update Notice Error:", error);
    return apiResponse(false, null, "Failed to update notice.", [error.message]);
  }
}

export async function deleteNoticeAction(id) {
  try {
    await NoticeService.delete(id);
    
    revalidatePath("/admin/notices");
    revalidatePath("/", "layout");
    
    return apiResponse(true, null, "Notice deleted successfully.");
  } catch (error) {
    console.error("Delete Notice Error:", error);
    return apiResponse(false, null, "Failed to delete notice.", [error.message]);
  }
}
