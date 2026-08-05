import Department from "@/models/Department";
import Member from "@/models/Member";
import connectToDatabase from "@/lib/mongodb";

export class DepartmentService {
  /**
   * Fetch all departments for a given committee, supporting optional filters
   */
  static async getDepartmentsByCommittee(committeeId, query = {}) {
    await connectToDatabase();
    
    const filter = { 
      committee_id: committeeId, 
      deletedAt: null,
      ...query 
    };

    return await Department.find(filter)
      .sort({ displayOrder: 1, createdAt: 1 })
      .lean();
  }

  /**
   * Get a single department by ID
   */
  static async getDepartmentById(id) {
    await connectToDatabase();
    return await Department.findOne({ _id: id, deletedAt: null }).lean();
  }

  /**
   * Create a new department
   */
  static async createDepartment(data) {
    await connectToDatabase();
    
    // Optional: check for duplicate names within the same committee
    const existing = await Department.findOne({
      committee_id: data.committee_id,
      "name.en": data.name.en,
      deletedAt: null
    });

    if (existing) {
      throw new Error("A department with this name already exists in this committee.");
    }

    const newDepartment = new Department(data);
    await newDepartment.save();
    return newDepartment.toObject();
  }

  /**
   * Update an existing department
   */
  static async updateDepartment(id, data) {
    await connectToDatabase();
    
    if (data.name && data.name.en) {
      const existing = await Department.findOne({
        _id: { $ne: id },
        committee_id: data.committee_id,
        "name.en": data.name.en,
        deletedAt: null
      });

      if (existing) {
        throw new Error("A department with this name already exists in this committee.");
      }
    }

    const updated = await Department.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { $set: data },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      throw new Error("Department not found");
    }

    return updated;
  }

  /**
   * Soft delete a department
   */
  static async deleteDepartment(id) {
    await connectToDatabase();

    // Check if any members are currently assigned to this department
    const memberCount = await Member.countDocuments({ department_id: id });
    if (memberCount > 0) {
      throw new Error(`Cannot delete department. ${memberCount} member(s) are currently assigned to it.`);
    }

    const deleted = await Department.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { $set: { deletedAt: new Date(), status: "Archived" } },
      { new: true }
    ).lean();

    if (!deleted) {
      throw new Error("Department not found or already deleted");
    }

    return true;
  }
}
