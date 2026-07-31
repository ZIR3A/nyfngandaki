"use server";

import { PositionService } from "@/services/PositionService";
import { revalidatePath } from "next/cache";

function apiResponse(success, data = null, message = "", errors = []) {
  return { success, data, message, errors };
}

export async function createPositionAction(formData) {
  try {
    const slug = formData.name?.en?.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();
    const data = { ...formData, slug };
    const position = await PositionService.create(data);
    revalidatePath("/admin/positions");
    return apiResponse(true, position, "Position created successfully.");
  } catch (error) {
    return apiResponse(false, null, "Failed to create position.", [error.message]);
  }
}

export async function updatePositionAction(id, formData) {
  try {
    const position = await PositionService.update(id, formData);
    revalidatePath("/admin/positions");
    return apiResponse(true, position, "Position updated successfully.");
  } catch (error) {
    return apiResponse(false, null, "Failed to update position.", [error.message]);
  }
}

export async function deletePositionAction(id) {
  try {
    await PositionService.delete(id);
    revalidatePath("/admin/positions");
    return apiResponse(true, null, "Position deleted successfully.");
  } catch (error) {
    return apiResponse(false, null, "Failed to delete position.", [error.message]);
  }
}
