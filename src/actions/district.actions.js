"use server";

import { DistrictService } from "@/services/DistrictService";
import { revalidatePath } from "next/cache";

function apiResponse(success, data = null, message = "", errors = []) {
  return { success, data, message, errors };
}

export async function createDistrictAction(formData) {
  try {
    const district = await DistrictService.create(formData);
    revalidatePath("/admin/districts");
    revalidatePath("/api/public/districts/explorer");
    return apiResponse(true, JSON.parse(JSON.stringify(district)), "District created successfully.");
  } catch (error) {
    if (error.code === 11000) {
      return apiResponse(false, null, "Failed to create district. Slug must be unique.", ["Duplicate key error"]);
    }
    return apiResponse(false, null, "Failed to create district.", [error.message]);
  }
}

export async function updateDistrictAction(id, formData) {
  try {
    const district = await DistrictService.update(id, formData);
    revalidatePath("/admin/districts");
    revalidatePath("/api/public/districts/explorer");
    return apiResponse(true, JSON.parse(JSON.stringify(district)), "District updated successfully.");
  } catch (error) {
    if (error.code === 11000) {
      return apiResponse(false, null, "Failed to update district. Slug must be unique.", ["Duplicate key error"]);
    }
    return apiResponse(false, null, "Failed to update district.", [error.message]);
  }
}

export async function deleteDistrictAction(id) {
  try {
    await DistrictService.deleteDistrict(id);
    revalidatePath("/admin/districts");
    revalidatePath("/api/public/districts/explorer");
    return apiResponse(true, null, "District deleted successfully.");
  } catch (error) {
    return apiResponse(false, null, error.message || "Failed to delete district.", [error.message]);
  }
}

export async function getAllDistrictsAction() {
  try {
    const districts = await DistrictService.getAll();
    return apiResponse(true, JSON.parse(JSON.stringify(districts)), "Districts fetched successfully.");
  } catch (error) {
    return apiResponse(false, null, "Failed to fetch districts.", [error.message]);
  }
}
