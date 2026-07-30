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
      heroImageId: formData.get("heroImageId") || null,
      heroTitle: {
        en: formData.get("heroTitle.en"),
        np: formData.get("heroTitle.np"),
      },
      heroSubtitle: {
        en: formData.get("heroSubtitle.en"),
        np: formData.get("heroSubtitle.np"),
      },


      aboutImageId: formData.get("aboutImageId") || null,
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
