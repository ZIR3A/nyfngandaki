"use server";

import { ResourceService } from "@/services/ResourceService";
import { revalidatePath } from "next/cache";

export async function createResource(formData) {
  try {
    // Process badges if they exist and are comma separated
    const badgesString = formData.get("badges") || "";
    const badges = badgesString.split(",").map(b => b.trim()).filter(b => b.length > 0);

    const rawData = {
      title: {
        en: formData.get("title.en"),
        np: formData.get("title.np"),
      },
      description: {
        en: formData.get("description.en"),
        np: formData.get("description.np"),
      },
      fileUrl: formData.get("fileUrl"),
      fileSize: formData.get("fileSize") || "",
      badges: badges,
      visibility: formData.get("visibility") === "on",
    };

    const resource = await ResourceService.createResource(rawData);
    revalidatePath("/");
    revalidatePath("/admin/resources");
    return { success: true, data: JSON.parse(JSON.stringify(resource)), message: "Resource created successfully." };
  } catch (error) {
    console.error("Failed to create resource:", error);
    return { success: false, message: error.message || "Failed to create resource." };
  }
}

export async function updateResource(id, formData) {
  try {
    const badgesString = formData.get("badges") || "";
    const badges = badgesString.split(",").map(b => b.trim()).filter(b => b.length > 0);

    const rawData = {
      title: {
        en: formData.get("title.en"),
        np: formData.get("title.np"),
      },
      description: {
        en: formData.get("description.en"),
        np: formData.get("description.np"),
      },
      fileUrl: formData.get("fileUrl"),
      fileSize: formData.get("fileSize") || "",
      badges: badges,
      visibility: formData.get("visibility") === "on",
    };

    const resource = await ResourceService.updateResource(id, rawData);
    revalidatePath("/");
    revalidatePath("/admin/resources");
    return { success: true, data: JSON.parse(JSON.stringify(resource)), message: "Resource updated successfully." };
  } catch (error) {
    console.error("Failed to update resource:", error);
    return { success: false, message: error.message || "Failed to update resource." };
  }
}

export async function deleteResource(id) {
  try {
    await ResourceService.deleteResource(id);
    revalidatePath("/");
    revalidatePath("/admin/resources");
    return { success: true, message: "Resource deleted successfully." };
  } catch (error) {
    console.error("Failed to delete resource:", error);
    return { success: false, message: error.message || "Failed to delete resource." };
  }
}
