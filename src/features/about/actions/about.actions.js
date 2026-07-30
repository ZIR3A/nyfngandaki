'use server';

import { aboutService } from '../services/aboutService';
import { revalidateTag } from 'next/cache';
import { updateAboutPageSchema, createCoreValueSchema } from '../validations/about.validation';
// ... you would import all other schemas and a session checking utility like getAuthSession()

// Example mock session getter for demonstration
async function getSession() {
  return { user: { id: 'dummy-user-id', provinceId: 'dummy-province-id', role: 'ADMIN' } };
}

export async function updateAboutPageAction(data) {
  try {
    const session = await getSession();
    if (!session || !['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'].includes(session.user.role)) {
      return { success: false, message: 'Unauthorized' };
    }

    const validatedData = updateAboutPageSchema.parse(data);
    const result = await aboutService.updateAboutPage(session.user.provinceId, validatedData, session.user.id);
    
    revalidateTag('about-page');
    return { success: true, message: 'About page updated successfully', data: result };
  } catch (error) {
    return { success: false, message: 'Failed to update about page', errors: error.errors || [error.message] };
  }
}

export async function createCoreValueAction(data) {
  try {
    const session = await getSession();
    if (!session || !['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'].includes(session.user.role)) {
      return { success: false, message: 'Unauthorized' };
    }

    const validatedData = createCoreValueSchema.parse(data);
    const result = await aboutService.createCoreValue(session.user.provinceId, validatedData, session.user.id);
    
    revalidateTag('about-page');
    return { success: true, message: 'Core value created successfully', data: result };
  } catch (error) {
    return { success: false, message: 'Failed to create core value', errors: error.errors || [error.message] };
  }
}

// Additional Server Actions (updateCoreValue, deleteCoreValue, createObjective, updateObjective, etc.) 
// would follow the same pattern: Authenticate -> Validate -> Call Service -> Revalidate Cache -> Return JSON.
