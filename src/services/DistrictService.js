import District from "@/models/District";
import { DatabaseService } from "@/services/DatabaseService";

export class DistrictService {
  /**
   * Get all districts, ordered by displayOrder
   */
  static async getAll() {
    try {
      await DatabaseService.connect();
      const districts = await District.find({ status: "Active" }).sort({ displayOrder: 1 }).lean();
      return districts;
    } catch (error) {
      console.error("Error fetching districts:", error);
      return [];
    }
  }

  /**
   * Get a district by slug
   */
  static async getBySlug(slug) {
    try {
      await DatabaseService.connect();
      const district = await District.findOne({ slug, status: "Active" }).lean();
      return district;
    } catch (error) {
      console.error(`Error fetching district with slug ${slug}:`, error);
      return null;
    }
  }
}
