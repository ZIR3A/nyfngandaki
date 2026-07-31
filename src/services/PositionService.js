import Position from "@/models/Position";
import { DatabaseService } from "@/services/DatabaseService";

export class PositionService {
  static async getAll() {
    try {
      await DatabaseService.connect();
      return await Position.find().sort({ weight: 1 }).lean();
    } catch (error) {
      console.error("Error fetching positions:", error);
      return [];
    }
  }

  static async getById(id) {
    try {
      await DatabaseService.connect();
      return await Position.findById(id).lean();
    } catch (error) {
      console.error("Error fetching position:", error);
      return null;
    }
  }

  static async create(data) {
    await DatabaseService.connect();
    const position = new Position(data);
    await position.save();
    return position.toObject();
  }

  static async update(id, data) {
    await DatabaseService.connect();
    const updated = await Position.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }).lean();
    if (!updated) throw new Error("Position not found");
    return updated;
  }

  static async delete(id) {
    await DatabaseService.connect();
    // Validate if any member uses this position
    const Member = (await import("@/models/Member")).default;
    const count = await Member.countDocuments({ position_id: id });
    if (count > 0) {
      throw new Error(`Cannot delete position. ${count} members are assigned to it.`);
    }
    const deleted = await Position.findByIdAndDelete(id);
    if (!deleted) throw new Error("Position not found");
    return true;
  }
}
