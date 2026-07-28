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
      heroTitle: {
        en: formData.get("heroTitle.en"),
        np: formData.get("heroTitle.np"),
      },
      heroSubtitle: {
        en: formData.get("heroSubtitle.en"),
        np: formData.get("heroSubtitle.np"),
      },
      chairpersonName: {
        en: formData.get("chairpersonName.en"),
        np: formData.get("chairpersonName.np"),
      },
      chairpersonMessage: {
        en: formData.get("chairpersonMessage.en"),
        np: formData.get("chairpersonMessage.np"),
      },
      chairpersonImage: formData.get("chairpersonImage") || null,
      mission: {
        en: formData.get("mission.en"),
        np: formData.get("mission.np"),
      },
      vision: {
        en: formData.get("vision.en"),
        np: formData.get("vision.np"),
      },
      googleMapEmbedUrl: formData.get("googleMapEmbedUrl") || null,
      ctaTitle: {
        en: formData.get("ctaTitle.en"),
        np: formData.get("ctaTitle.np"),
      },
      ctaDescription: {
        en: formData.get("ctaDescription.en"),
        np: formData.get("ctaDescription.np"),
      },
      ctaButtonLink: formData.get("ctaButtonLink") || "/contact",
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
