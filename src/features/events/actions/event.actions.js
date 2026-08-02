'use server';

import { revalidatePath } from 'next/cache';
import { eventService } from '../services/eventService';
import { eventSchema } from '../validations/event.validation';

// Mock auth helper for demonstration, replace with actual auth logic
const requireAdmin = async () => {
  // const session = await getServerSession(authOptions);
  // if (!session?.user?.isAdmin) throw new Error("Unauthorized");
  return true;
};

/**
 * Server Action: Create Event
 */
export async function createEventAction(formData) {
  try {
    await requireAdmin();
    
    // Parse and validate using Zod
    const validatedData = eventSchema.parse(formData);
    
    const newEvent = await eventService.createEvent(validatedData);
    
    // Revalidate paths to update cache
    revalidatePath('/events');
    revalidatePath('/admin/events');
    
    return { success: true, data: JSON.parse(JSON.stringify(newEvent)) };
  } catch (error) {
    console.error("Create event error:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Server Action: Update Event
 */
export async function updateEventAction(id, formData) {
  try {
    await requireAdmin();
    
    // Parse and validate using Zod
    const validatedData = eventSchema.parse(formData);
    
    const updatedEvent = await eventService.updateEvent(id, validatedData);
    
    // Revalidate cache
    revalidatePath('/events');
    revalidatePath(`/events/${updatedEvent.slug}`);
    revalidatePath('/admin/events');
    
    return { success: true, data: JSON.parse(JSON.stringify(updatedEvent)) };
  } catch (error) {
    console.error("Update event error:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Server Action: Soft Delete Event
 */
export async function deleteEventAction(id) {
  try {
    await requireAdmin();
    
    await eventService.softDeleteEvent(id);
    
    revalidatePath('/events');
    revalidatePath('/admin/events');
    
    return { success: true };
  } catch (error) {
    console.error("Delete event error:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Server Action: Get Categories
 */
export async function getCategoriesAction() {
  try {
    const categories = await eventService.getCategories();
    return { success: true, data: JSON.parse(JSON.stringify(categories)) };
  } catch (error) {
    console.error("Get categories error:", error);
    return { success: false, error: error.message };
  }
}
