"use server";

import { CommitteeService } from "@/services/CommitteeService";
import { revalidatePath } from "next/cache";

function apiResponse(success, data = null, message = "", errors = []) {
  return { success, data, message, errors };
}

export async function createCommitteeAction(formData) {
  try {
    const slug = formData.name?.en?.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();
    const data = { ...formData, slug };
    const committee = await CommitteeService.create(data);
    revalidatePath("/admin/committees");
    return apiResponse(true, committee, "Committee created successfully.");
  } catch (error) {
    return apiResponse(false, null, "Failed to create committee.", [error.message]);
  }
}

export async function updateCommitteeAction(id, formData) {
  try {
    const committee = await CommitteeService.update(id, formData);
    revalidatePath("/admin/committees");
    return apiResponse(true, committee, "Committee updated successfully.");
  } catch (error) {
    return apiResponse(false, null, "Failed to update committee.", [error.message]);
  }
}

export async function deleteCommitteeAction(id) {
  try {
    await CommitteeService.delete(id);
    revalidatePath("/admin/committees");
    return apiResponse(true, null, "Committee deleted successfully.");
  } catch (error) {
    return apiResponse(false, null, "Failed to delete committee.", [error.message]);
  }
}
