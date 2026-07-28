"use server";

import { BannerService } from "@/services/BannerService";
import { revalidatePath } from "next/cache";

/**
 * Standardize API Response
 */
function apiResponse(success, data = null, message = "", errors = []) {
  return { success, data, message, errors };
}

export async function createBannerAction(formData) {
  try {
    const newBanner = await BannerService.create(formData);
    
    // Revalidate public and admin pages
    revalidatePath("/admin/banners");
    revalidatePath("/", "layout");
    
    return apiResponse(true, newBanner, "Banner created successfully.");
  } catch (error) {
    console.error("Create Banner Error:", error);
    require('fs').writeFileSync('error.log', error.stack + '\n\nData received:\n' + JSON.stringify(formData, null, 2));
    return apiResponse(false, null, "Failed to create banner.", [error.message]);
  }
}

export async function updateBannerAction(id, formData) {
  try {
    const updatedBanner = await BannerService.update(id, formData);
    
    revalidatePath("/admin/banners");
    revalidatePath("/", "layout");
    
    return apiResponse(true, updatedBanner, "Banner updated successfully.");
  } catch (error) {
    console.error("Update Banner Error:", error);
    return apiResponse(false, null, "Failed to update banner.", [error.message]);
  }
}

export async function deleteBannerAction(id) {
  try {
    await BannerService.delete(id);
    
    revalidatePath("/admin/banners");
    revalidatePath("/", "layout");
    
    return apiResponse(true, null, "Banner deleted successfully.");
  } catch (error) {
    console.error("Delete Banner Error:", error);
    return apiResponse(false, null, "Failed to delete banner.", [error.message]);
  }
}
