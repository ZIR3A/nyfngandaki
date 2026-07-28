import connectToDatabase from "@/lib/mongodb";
import Member from "@/models/Member";

export class MemberService {
  /**
   * Fetch all members with optional filtering
   */
  static async getAllMembers(filters = {}, sort = { displayOrder: 1, createdAt: -1 }) {
    await connectToDatabase();
    return Member.find(filters).populate("district").sort(sort).lean();
  }

  /**
   * Fetch featured members for the homepage
   */
  static async getFeaturedMembers(limit = 6) {
    await connectToDatabase();
    return Member.find({ isFeaturedOnHome: true, status: "Active" })
      .populate("district")
      .sort({ displayOrder: 1, createdAt: -1 })
      .limit(limit)
      .lean();
  }

  /**
   * Fetch a single member by ID
   */
  static async getMemberById(id) {
    await connectToDatabase();
    return Member.findById(id).populate("district").lean();
  }

  /**
   * Create a new member
   */
  static async createMember(data) {
    await connectToDatabase();
    const member = new Member(data);
    await member.save();
    return member.toObject();
  }

  /**
   * Update an existing member
   */
  static async updateMember(id, data) {
    await connectToDatabase();
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
