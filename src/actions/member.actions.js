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

    // Sanitize empty strings for ObjectId fields
    if (!memberData.committee_id) memberData.committee_id = null;
    if (!memberData.district) memberData.district = null;
    if (!memberData.department_id) memberData.department_id = null;

    const newMember = await MemberService.createMember(memberData);
    
    // Revalidate public and admin pages
    revalidatePath("/admin/members");
    revalidatePath("/[locale]/members", "page");
    revalidatePath("/[locale]/about", "page");
    revalidatePath("/[locale]", "page");
    revalidatePath("/", "layout");
    revalidateTag("about-page");
    
    return apiResponse(true, JSON.parse(JSON.stringify(newMember)), "Member created successfully.");
  } catch (error) {
    console.error("Create Member Error:", error);
    return apiResponse(false, null, "Failed to create member.", [error.message]);
  }
}

export async function updateMemberAction(id, formData) {
  try {
    const memberData = { ...formData };
    
    // Sanitize empty strings for ObjectId fields
    if (!memberData.committee_id) memberData.committee_id = null;
    if (!memberData.district) memberData.district = null;
    if (!memberData.department_id) memberData.department_id = null;

    const updatedMember = await MemberService.updateMember(id, memberData);
    
    revalidatePath("/admin/members");
    revalidatePath(`/[locale]/members/${updatedMember.slug}`, "page");
    revalidatePath("/[locale]/members", "page");
    revalidatePath("/[locale]/about", "page");
    revalidatePath("/[locale]", "page");
    revalidatePath("/", "layout");
    revalidateTag("about-page");
    
    return apiResponse(true, JSON.parse(JSON.stringify(updatedMember)), "Member updated successfully.");
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

export async function searchMembersAction(query) {
  try {
    // Basic search across name fields using the MemberService
    // In MemberService, getAllMembers supports filtering.
    // We construct a query object that searches for the string in name, position, or district.
    const filters = {};
    if (query) {
      filters.$or = [
        { "name.en": { $regex: query, $options: "i" } },
        { "name.np": { $regex: query, $options: "i" } },
      ];
    }
    const members = await MemberService.getAllMembers(filters, { createdAt: -1 });
    // We only need a subset for the selector to keep the payload light
    const slimMembers = members.map(m => ({
      _id: m._id,
      name: m.name,
      photo: m.photo,
      position_id: m.position_id,
      district: m.district,
      organizationLevel: m.organizationLevel,
      status: m.status,
    })).slice(0, 20); // Limit to top 20 matches for the dropdown

    return apiResponse(true, JSON.parse(JSON.stringify(slimMembers)), "Members fetched successfully.");
  } catch (error) {
    console.error("Search Members Error:", error);
    return apiResponse(false, [], "Failed to search members.", [error.message]);
  }
}
