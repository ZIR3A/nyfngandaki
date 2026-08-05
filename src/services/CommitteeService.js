import Committee from "@/models/Committee";
import { DatabaseService } from "@/services/DatabaseService";

export class CommitteeService {
  static async getAll() {
    try {
      await DatabaseService.connect();
      return await Committee.aggregate([
        {
          $lookup: {
            from: "departments",
            localField: "_id",
            foreignField: "committee_id",
            as: "departments",
          },
        },
        {
          $addFields: {
            departmentCount: {
              $size: {
                $filter: {
                  input: "$departments",
                  as: "dept",
                  cond: { $eq: ["$$dept.deletedAt", null] }
                }
              }
            }
          }
        },
        {
          $project: {
            departments: 0
          }
        },
        {
          $sort: { "name.en": 1 }
        }
      ]);
    } catch (error) {
      console.error("Error fetching committees:", error);
      return [];
    }
  }

  static async getById(id) {
    try {
      await DatabaseService.connect();
      return await Committee.findById(id).lean();
    } catch (error) {
      console.error("Error fetching committee:", error);
      return null;
    }
  }

  static async create(data) {
    await DatabaseService.connect();
    const committee = new Committee(data);
    await committee.save();
    return committee.toObject();
  }

  static async update(id, data) {
    await DatabaseService.connect();
    const updated = await Committee.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }).lean();
    if (!updated) throw new Error("Committee not found");
    return updated;
  }

  static async delete(id) {
    await DatabaseService.connect();
    // Validate if any member uses this committee
    const Member = (await import("@/models/Member")).default;
    const count = await Member.countDocuments({ committee_id: id });
    if (count > 0) {
      throw new Error(`Cannot delete committee. ${count} members are assigned to it.`);
    }
    const deleted = await Committee.findByIdAndDelete(id);
    if (!deleted) throw new Error("Committee not found");
    return true;
  }
}
