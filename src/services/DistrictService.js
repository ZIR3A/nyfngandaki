import District from "@/models/District";
import { DatabaseService } from "@/services/DatabaseService";
import { resolveAssets } from "@/modules/storage/helpers/resolver.helper";

const DISTRICT_ASSET_MAPPING = [
  { idField: 'coverImageId', urlField: 'coverImage' },
  { idField: 'officeImageId', urlField: 'officeImage' }
];

export class DistrictService {
  /**
   * Get all districts, ordered by displayOrder
   */
  static async getAll() {
    try {
      await DatabaseService.connect();
      const districts = await District.find({ status: "Active" }).sort({ displayOrder: 1 }).lean();
      return resolveAssets(districts, DISTRICT_ASSET_MAPPING);
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
      return resolveAssets(district, DISTRICT_ASSET_MAPPING);
    } catch (error) {
      console.error(`Error fetching district with slug ${slug}:`, error);
      return null;
    }
  }
}
