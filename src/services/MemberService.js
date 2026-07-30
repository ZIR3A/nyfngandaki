import connectToDatabase from "@/lib/mongodb";
import Member from "@/models/Member";
import "@/models/District"; // Required: ensures District schema is registered before populate()
import { resolveAssets } from "@/modules/storage/helpers/resolver.helper";

const MEMBER_ASSET_MAPPING = [
  { idField: 'profilePhotoId', urlField: 'photo' },
  { idField: 'coverPhotoId', urlField: 'coverPhoto' }
];

export class MemberService {
  /**
   * Fetch all members with optional filtering
   */
  static async getAllMembers(filters = {}, sort = { displayOrder: 1, createdAt: -1 }) {
    await connectToDatabase();
    const members = await Member.find(filters).populate("district").sort(sort).lean();
    return resolveAssets(members, MEMBER_ASSET_MAPPING);
  }

  /**
   * Fetch featured members for the homepage
   */
  static async getFeaturedMembers(limit = 6) {
    await connectToDatabase();
    const members = await Member.find({ isFeaturedOnHome: true, status: "Active" })
      .populate("district")
      .sort({ displayOrder: 1, createdAt: -1 })
      .limit(limit)
      .lean();
    return resolveAssets(members, MEMBER_ASSET_MAPPING);
  }

  /**
   * Fetch a single member by ID
   */
  static async getMemberById(id) {
    await connectToDatabase();
    const member = await Member.findById(id).populate("district").lean();
    return resolveAssets(member, MEMBER_ASSET_MAPPING);
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
    const member = new Member(data);
    await member.save();
    return member.toObject();
  }

  /**
   * Update an existing member
   */
  static async updateMember(id, data) {
    await connectToDatabase();
    if (data.isChairperson === true) {
      await Member.updateMany({ _id: { $ne: id } }, { isChairperson: false });
    }
    const updatedMember = await Member.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedMember) {
      throw new Error("Member not found");
    }

    return updatedMember;
  }

  /**
   * Delete a member
   */
  static async deleteMember(id) {
    await connectToDatabase();
    const deletedMember = await Member.findByIdAndDelete(id);
    
    if (!deletedMember) {
      throw new Error("Member not found");
    }
    
    return true;
  }
}
