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
  static async getAll(filter = { status: "Active" }) {
    try {
      await DatabaseService.connect();
      const districts = await District.find(filter).sort({ displayOrder: 1 }).lean();
      return resolveAssets(districts, DISTRICT_ASSET_MAPPING);
    } catch (error) {
      console.error("Error fetching districts:", error);
      return [];
    }
  }

  /**
   * Get a district by ID
   */
  static async getById(id) {
    try {
      await DatabaseService.connect();
      const district = await District.findById(id).lean();
      return resolveAssets(district, DISTRICT_ASSET_MAPPING);
    } catch (error) {
      console.error(`Error fetching district with id ${id}:`, error);
      return null;
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

  /**
   * Create a new district
   */
  static async create(data) {
    await DatabaseService.connect();
    const district = await District.create(data);
    return JSON.parse(JSON.stringify(district.toObject()));
  }

  /**
   * Update an existing district
   */
  static async update(id, data) {
    await DatabaseService.connect();
    const district = await District.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
    if (!district) throw new Error("District not found");
    return JSON.parse(JSON.stringify(district));
  }

  /**
   * Update district stats based on member assignments
   */
  static async updateDistrictStats(districtId) {
    if (!districtId) return;
    try {
      await DatabaseService.connect();
      // Use dynamic import to prevent circular dependency issues
      const Member = (await import("@/models/Member")).default;
      
      const members = await Member.find({ district: districtId }).lean();
      
      let activeMembers = 0;
      let officeBearers = 0;
      let committeeMembers = 0;
      
      members.forEach((member) => {
        if (member.status === "Active") activeMembers++;
        
        const posEn = member.position?.en?.toLowerCase() || "";
        if (
          member.isChairperson || 
          member.isFeaturedOnHome || 
          posEn.includes("chairperson") || 
          posEn.includes("secretary") || 
          posEn.includes("treasurer") || 
          posEn.includes("joint") || 
          (!posEn.includes("member") && !member.position?.np?.includes("सदस्य"))
        ) {
          officeBearers++;
        } else {
          committeeMembers++;
        }
      });

      await District.findByIdAndUpdate(districtId, {
        "stats.totalMembers": members.length,
        "stats.activeMembers": activeMembers,
        "stats.officeBearers": officeBearers,
        "stats.committeeMembers": committeeMembers,
      });
    } catch (error) {
      console.error(`Error updating stats for district ${districtId}:`, error);
    }
  }

  /**
   * Delete district with data integrity check
   */
  static async deleteDistrict(id) {
    await DatabaseService.connect();
    const Member = (await import("@/models/Member")).default;
    
    const memberCount = await Member.countDocuments({ district: id });
    if (memberCount > 0) {
      throw new Error(`Cannot delete district. There are ${memberCount} members assigned to it. Please reassign them first.`);
    }
    
    const deletedDistrict = await District.findByIdAndDelete(id);
    if (!deletedDistrict) throw new Error("District not found");
    
    return true;
  }
}
