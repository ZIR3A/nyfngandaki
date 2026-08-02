"use server";

import { SiteSettingService } from "@/services/SiteSettingService";
import { revalidatePath } from "next/cache";

export async function updateHomepageSettings(formData) {
  try {
    // Collect stats from form data arrays
    const statsCount = parseInt(formData.get("statsCount") || "0", 10);
    const stats = [];
    for (let i = 0; i < statsCount; i++) {
      const enLabel = formData.get(`stats[${i}].label.en`);
      const npLabel = formData.get(`stats[${i}].label.np`);
      const value = formData.get(`stats[${i}].value`);
      
      if (value && (enLabel || npLabel)) {
        stats.push({
          label: { en: enLabel, np: npLabel },
          value: value
        });
      }
    }

    const rawData = {
      aboutImageId: formData.get("aboutImageId") || null,
      stats: stats
    };

    const updatedSettings = await SiteSettingService.updateSettings(rawData);
    revalidatePath("/");
    revalidatePath("/admin/settings/homepage");
    
    return { success: true, message: "Homepage settings updated successfully." };
  } catch (error) {
    console.error("Failed to update homepage settings:", error);
    return { success: false, message: error.message || "Failed to update homepage settings." };
  }
}
