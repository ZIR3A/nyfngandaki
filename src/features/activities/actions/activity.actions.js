"use server";

import { ActivityService } from "@/services/ActivityService";
import { revalidatePath } from "next/cache";

export async function createActivity(formData) {
  try {
    const rawData = {
      title: {
        en: formData.get("title.en"),
        np: formData.get("title.np"),
      },
      description: {
        en: formData.get("description.en"),
        np: formData.get("description.np"),
      },
      type: formData.get("type"),
      image: formData.get("image") || null,
      statistics: {
        value: formData.get("statistics.value") || "",
        label: {
          en: formData.get("statistics.label.en") || "",
          np: formData.get("statistics.label.np") || "",
        }
      },
      featured: formData.get("featured") === "on",
      visibility: formData.get("visibility") === "on",
    };

    const activity = await ActivityService.createActivity(rawData);
    revalidatePath("/");
    revalidatePath("/admin/activities");
    return { success: true, data: JSON.parse(JSON.stringify(activity)), message: "Activity created successfully." };
  } catch (error) {
    console.error("Failed to create activity:", error);
    return { success: false, message: error.message || "Failed to create activity." };
  }
}

export async function updateActivity(id, formData) {
  try {
    const rawData = {
      title: {
        en: formData.get("title.en"),
        np: formData.get("title.np"),
      },
      description: {
        en: formData.get("description.en"),
        np: formData.get("description.np"),
      },
      type: formData.get("type"),
      image: formData.get("image") || null,
      statistics: {
        value: formData.get("statistics.value") || "",
        label: {
          en: formData.get("statistics.label.en") || "",
          np: formData.get("statistics.label.np") || "",
        }
      },
      featured: formData.get("featured") === "on",
      visibility: formData.get("visibility") === "on",
    };

    const activity = await ActivityService.updateActivity(id, rawData);
    revalidatePath("/");
    revalidatePath("/admin/activities");
    return { success: true, data: JSON.parse(JSON.stringify(activity)), message: "Activity updated successfully." };
  } catch (error) {
    console.error("Failed to update activity:", error);
    return { success: false, message: error.message || "Failed to update activity." };
  }
}

export async function deleteActivity(id) {
  try {
    await ActivityService.deleteActivity(id);
    revalidatePath("/");
    revalidatePath("/admin/activities");
    return { success: true, message: "Activity deleted successfully." };
  } catch (error) {
    console.error("Failed to delete activity:", error);
    return { success: false, message: error.message || "Failed to delete activity." };
  }
}
