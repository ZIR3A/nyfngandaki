"use server";

import { EventService } from "@/services/EventService";
import { revalidatePath } from "next/cache";

export async function createEvent(formData) {
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
      venue: {
        en: formData.get("venue.en"),
        np: formData.get("venue.np"),
      },
      organizer: {
        en: formData.get("organizer.en"),
        np: formData.get("organizer.np"),
      },
      date: formData.get("date"),
      status: formData.get("status") || "Upcoming",
      coverImage: formData.get("coverImage") || null,
      featured: formData.get("featured") === "on",
    };

    const event = await EventService.createEvent(rawData);
    revalidatePath("/");
    revalidatePath("/admin/events");
    return { success: true, data: JSON.parse(JSON.stringify(event)), message: "Event created successfully." };
  } catch (error) {
    console.error("Failed to create event:", error);
    return { success: false, message: error.message || "Failed to create event." };
  }
}

export async function updateEvent(id, formData) {
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
      venue: {
        en: formData.get("venue.en"),
        np: formData.get("venue.np"),
      },
      organizer: {
        en: formData.get("organizer.en"),
        np: formData.get("organizer.np"),
      },
      date: formData.get("date"),
      status: formData.get("status") || "Upcoming",
      coverImage: formData.get("coverImage") || null,
      featured: formData.get("featured") === "on",
    };

    const event = await EventService.updateEvent(id, rawData);
    revalidatePath("/");
    revalidatePath("/admin/events");
    return { success: true, data: JSON.parse(JSON.stringify(event)), message: "Event updated successfully." };
  } catch (error) {
    console.error("Failed to update event:", error);
    return { success: false, message: error.message || "Failed to update event." };
  }
}

export async function deleteEvent(id) {
  try {
    await EventService.deleteEvent(id);
    revalidatePath("/");
    revalidatePath("/admin/events");
    return { success: true, message: "Event deleted successfully." };
  } catch (error) {
    console.error("Failed to delete event:", error);
    return { success: false, message: error.message || "Failed to delete event." };
  }
}
