import connectToDatabase from "@/lib/mongodb";
import Member from "@/models/Member";
import "@/models/District"; // Required: ensures District schema is registered before populate()
import "@/models/Committee";
import "@/models/Position";
import { resolveAssets } from "@/modules/storage/helpers/resolver.helper";
import { DistrictService } from "@/services/DistrictService";

const MEMBER_ASSET_MAPPING = [
  { idField: 'profilePhotoId', urlField: 'photo' },
  { idField: 'coverPhotoId', urlField: 'coverPhoto' }
];

export class MemberService {
  /**
   * Fetch all members with optional filtering
   */
  static async getAllMembers(filters = {}, sort = { displayOrder: 1, createdAt: -1 }) {
    try {
      await connectToDatabase();
      const members = await Member.find(filters)
        .sort(sort)
        .populate("district")
        .populate("committee_id")
        .populate("position_id")
        .lean();
      return resolveAssets(members, MEMBER_ASSET_MAPPING);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Fetch featured members for the homepage
   */
  static async getFeaturedMembers(limit = 6) {
    await connectToDatabase();
    const members = await Member.find({ isFeaturedOnHome: true, status: "Active" })
      .populate("district")
      .populate("committee_id")
      .populate("position_id")
      .sort({ displayOrder: 1, createdAt: -1 })
      .limit(limit)
      .lean();
    return resolveAssets(members, MEMBER_ASSET_MAPPING);
  }

  /**
   * Fetch a single member by ID
   */
  static async getMemberById(id) {
    try {
      await connectToDatabase();
      const member = await Member.findById(id)
        .populate("district")
        .populate("committee_id")
        .populate("position_id")
        .lean();
      if (!member) return null;
      const resolved = await resolveAssets([member], MEMBER_ASSET_MAPPING);
      return resolved[0];
    } catch (error) {
      throw error;
    }
  }

  /**
   * Fetch a single member by Slug
   */
  static async getMemberBySlug(slug) {
    try {
      await connectToDatabase();
      const member = await Member.findOne({ slug })
        .populate("district")
        .populate("committee_id")
        .populate("position_id")
        .lean();
      if (!member) return null;
      const resolved = await resolveAssets([member], MEMBER_ASSET_MAPPING);
      return resolved[0];
    } catch (error) {
      throw error;
    }
  }

  /**
   * Fetch related members from the same district
   */
  static async getRelatedMembers(districtId, currentMemberId, limit = 4) {
    if (!districtId) return [];
    await connectToDatabase();
    const members = await Member.find({ 
      district: districtId, 
      _id: { $ne: currentMemberId },
      status: "Active" 
    })
      .populate("district")
      .limit(limit)
      .lean();
    return resolveAssets(members, MEMBER_ASSET_MAPPING);
  }

  /**
   * Fetch chairperson member
   */
  static async getChairperson() {
    await connectToDatabase();
    const chairperson = await Member.findOne({ isChairperson: true, status: "Active" })
      .populate("district")
      .lean();
    if (!chairperson) return null;
    const resolved = await resolveAssets([chairperson], MEMBER_ASSET_MAPPING);
    return resolved[0];
  }

  /**
   * Create a new member
   */
  static async createMember(data) {
    await connectToDatabase();
    if (data.isChairperson === true) {
      await Member.updateMany({}, { isChairperson: false });
    }
    if (data.organizationLevel === "PROVINCE") {
      data.district = null;
    } else if (data.organizationLevel === "DISTRICT" && !data.district) {
      throw new Error("District is required for District Committee members.");
    }

    const member = new Member(data);
    await member.save();
    
    if (member.district) {
      await DistrictService.updateDistrictStats(member.district);
    }
    
    return member.toObject();
  }

  /**
   * Update an existing member
   */
  static async updateMember(id, data) {
    await connectToDatabase();
    
    const oldMember = await Member.findById(id).lean();
    if (!oldMember) {
      throw new Error("Member not found");
    }

    if (data.organizationLevel === "PROVINCE") {
      data.district = null;
    } else if (data.organizationLevel === "DISTRICT" && !data.district) {
      throw new Error("District is required for District Committee members.");
    }

    if (data.isChairperson === true) {
      await Member.updateMany({ _id: { $ne: id } }, { isChairperson: false });
    }
    
    const updatedMember = await Member.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    ).lean();

    if (oldMember.district?.toString() !== updatedMember.district?.toString()) {
      if (oldMember.district) await DistrictService.updateDistrictStats(oldMember.district);
      if (updatedMember.district) await DistrictService.updateDistrictStats(updatedMember.district);
    } else if (updatedMember.district) {
      await DistrictService.updateDistrictStats(updatedMember.district);
    }

    return updatedMember;
  }

  /**
   * Delete a member
   */
  static async deleteMember(id) {
    await connectToDatabase();
    
    const oldMember = await Member.findById(id).lean();
    if (!oldMember) {
      throw new Error("Member not found");
    }

    await Member.findByIdAndDelete(id);
    
    if (oldMember.district) {
      await DistrictService.updateDistrictStats(oldMember.district);
    }
    
    return true;
  }
}
