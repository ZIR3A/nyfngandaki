"use server";

import { MemberService } from "@/services/MemberService";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * Standardize API Response
 */
function apiResponse(success, data = null, message = "", errors = []) {
  return { success, data, message, errors };
}

export async function createMemberAction(formData) {
  try {
    // In a real application, we would validate formData with Zod here.
    // For now, we assume formData is already validated.
    
    // Slug generation logic (simple example)
    const baseSlug = formData.name?.en?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "member";
    const slug = `${baseSlug}-${Date.now()}`;
    
    const memberData = {
      ...formData,
      slug,
    };

    const newMember = await MemberService.createMember(memberData);
    
    // Revalidate public and admin pages
    revalidatePath("/admin/members");
    revalidatePath("/[locale]/members", "page");
    revalidatePath("/[locale]/about", "page");
    revalidatePath("/[locale]", "page");
    revalidatePath("/", "layout");
    revalidateTag("about-page");
    
    return apiResponse(true, newMember, "Member created successfully.");
  } catch (error) {
    console.error("Create Member Error:", error);
    return apiResponse(false, null, "Failed to create member.", [error.message]);
  }
}

export async function updateMemberAction(id, formData) {
  try {
    const updatedMember = await MemberService.updateMember(id, formData);
    
    revalidatePath("/admin/members");
    revalidatePath(`/[locale]/members/${updatedMember.slug}`, "page");
    revalidatePath("/[locale]/members", "page");
    revalidatePath("/[locale]/about", "page");
    revalidatePath("/[locale]", "page");
    revalidatePath("/", "layout");
    revalidateTag("about-page");
    
    return apiResponse(true, updatedMember, "Member updated successfully.");
  } catch (error) {
    console.error("Update Member Error:", error);
    return apiResponse(false, null, "Failed to update member.", [error.message]);
  }
}

export async function deleteMemberAction(id) {
  try {
    await MemberService.deleteMember(id);
    
    revalidatePath("/admin/members");
    revalidatePath("/[locale]/members", "page");
    revalidatePath("/[locale]/about", "page");
    revalidatePath("/[locale]", "page");
    revalidateTag("about-page");
    
    return apiResponse(true, null, "Member deleted successfully.");
  } catch (error) {
    console.error("Delete Member Error:", error);
    return apiResponse(false, null, "Failed to delete member.", [error.message]);
  }
}
