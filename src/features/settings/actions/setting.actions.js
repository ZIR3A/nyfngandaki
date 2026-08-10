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

export async function updateContactSettings(formData) {
  try {
    const rawData = {
      contact: {
        address: {
          en: formData.get("contact.address.en") || "",
          np: formData.get("contact.address.np") || "",
        },
        website: formData.get("contact.website") || "",
        location: {
          latitude: formData.get("contact.location.latitude") ? parseFloat(formData.get("contact.location.latitude")) : null,
          longitude: formData.get("contact.location.longitude") ? parseFloat(formData.get("contact.location.longitude")) : null,
        },
        phones: [],
        emails: [],
      },
      socialLinks: {
        facebook: formData.get("socialLinks.facebook") || "",
        twitter: formData.get("socialLinks.twitter") || "",
        instagram: formData.get("socialLinks.instagram") || "",
        youtube: formData.get("socialLinks.youtube") || "",
        tiktok: formData.get("socialLinks.tiktok") || "",
      },
      officeHours: {},
    };

    // Extract phones
    let pIdx = 0;
    while (formData.has(`contact.phones.${pIdx}.number`)) {
      rawData.contact.phones.push({
        label: {
          en: formData.get(`contact.phones.${pIdx}.label.en`) || "",
          np: formData.get(`contact.phones.${pIdx}.label.np`) || "",
        },
        number: formData.get(`contact.phones.${pIdx}.number`) || "",
        primary: formData.get(`contact.phones.${pIdx}.primary`) === "true",
      });
      pIdx++;
    }

    // Extract emails
    let eIdx = 0;
    while (formData.has(`contact.emails.${eIdx}.email`)) {
      rawData.contact.emails.push({
        label: {
          en: formData.get(`contact.emails.${eIdx}.label.en`) || "",
          np: formData.get(`contact.emails.${eIdx}.label.np`) || "",
        },
        email: formData.get(`contact.emails.${eIdx}.email`) || "",
        primary: formData.get(`contact.emails.${eIdx}.primary`) === "true",
      });
      eIdx++;
    }

    // Extract office hours
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    days.forEach(day => {
      rawData.officeHours[day] = {
        enabled: formData.get(`officeHours.${day}.enabled`) === "true",
        open: formData.get(`officeHours.${day}.open`) || "10:00",
        close: formData.get(`officeHours.${day}.close`) || "17:00",
      };
    });

    const updatedSettings = await SiteSettingService.updateSettings(rawData);
    revalidatePath("/");
    revalidatePath("/admin/settings/contact");
    revalidatePath("/[locale]/contact", "page");
    
    return { success: true, message: "Contact settings updated successfully." };
  } catch (error) {
    console.error("Failed to update contact settings:", error);
    return { success: false, message: error.message || "Failed to update contact settings." };
  }
}

