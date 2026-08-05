"use server";

import { DepartmentService } from "@/services/DepartmentService";
import { revalidatePath } from "next/cache";

export async function getDepartmentsAction(committeeId) {
  try {
    const departments = await DepartmentService.getDepartmentsByCommittee(committeeId);
    
    // Serialize ObjectIds
    const serialized = departments.map(d => ({
      ...d,
      _id: d._id.toString(),
      committee_id: d.committee_id.toString(),
    }));

    return { success: true, data: serialized };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function createDepartmentAction(data) {
  try {
    const newDepartment = await DepartmentService.createDepartment(data);
    revalidatePath("/admin/committees");
    revalidatePath(`/admin/committees/${data.committee_id}/edit`);
    return { success: true, data: newDepartment };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function updateDepartmentAction(id, data) {
  try {
    const updatedDepartment = await DepartmentService.updateDepartment(id, data);
    revalidatePath("/admin/committees");
    revalidatePath(`/admin/committees/${data.committee_id}/edit`);
    return { success: true, data: updatedDepartment };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function deleteDepartmentAction(id, committeeId) {
  try {
    await DepartmentService.deleteDepartment(id);
    revalidatePath("/admin/committees");
    revalidatePath(`/admin/committees/${committeeId}/edit`);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
