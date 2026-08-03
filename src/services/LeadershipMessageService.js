import connectToDatabase from "@/lib/mongodb";
import LeadershipMessage from "@/models/LeadershipMessage";
import "@/models/Member";
import "@/models/User";
import { resolveAssets } from "@/modules/storage/helpers/resolver.helper";

const MEMBER_ASSET_MAPPING = [
  { idField: 'profilePhotoId', urlField: 'photo' },
  { idField: 'coverPhotoId', urlField: 'coverPhoto' }
];

export class LeadershipMessageService {
  /**
   * Fetch paginated and filtered leadership messages for CRM
   */
  static async getCrmMessages({
    page = 1,
    limit = 10,
    search = "",
    status,
    homepage_visible,
    about_visible,
    featured,
    sortField = "display_order",
    sortOrder = 1,
  }) {
    await connectToDatabase();
    const query = { deleted_at: null };

    if (status) query.status = status;
    if (homepage_visible !== undefined) query.homepage_visible = homepage_visible === "true";
    if (about_visible !== undefined) query.about_visible = about_visible === "true";
    if (featured !== undefined) query.featured = featured === "true";

    if (search) {
      // Note: Searching across populated fields (Member Name, Position) requires an aggregation pipeline
      // or fetching members first and filtering by member_id.
      // To keep it simple and performant, we'll do a two-step approach or use aggregation.
      // Since member name is localized, it's easier to find matching members first.
      const mongoose = (await import("mongoose")).default;
      const Member = mongoose.model("Member");
      const matchedMembers = await Member.find({
        $or: [
          { "name.en": { $regex: search, $options: "i" } },
          { "name.np": { $regex: search, $options: "i" } }
        ]
      }).select("_id").lean();

      const memberIds = matchedMembers.map(m => m._id);

      query.$or = [
        { short_message_en: { $regex: search, $options: "i" } },
        { short_message_np: { $regex: search, $options: "i" } },
        { member_id: { $in: memberIds } },
      ];
    }

    const sort = {};
    sort[sortField] = sortOrder === "asc" || sortOrder === 1 ? 1 : -1;

    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      LeadershipMessage.find(query)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit))
        .populate({
          path: "member_id",
          populate: [
            { path: "position_id" },
            { path: "district" },
            { path: "committee_id" }
          ]
        })
        .lean(),
      LeadershipMessage.countDocuments(query),
    ]);

    // Resolve member assets for the nested member object
    const resolvedMessages = await Promise.all(messages.map(async (msg) => {
      if (msg.member_id) {
        const resolvedMember = await resolveAssets([msg.member_id], MEMBER_ASSET_MAPPING);
        msg.member_id = resolvedMember[0];
      }
      return msg;
    }));

    return {
      data: resolvedMessages,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Fetch public homepage messages
   */
  static async getHomepageMessages() {
    await connectToDatabase();
    const messages = await LeadershipMessage.find({
      deleted_at: null,
      status: "published",
      homepage_visible: true,
    })
      .sort({ featured: -1, display_order: 1, published_at: -1 })
      .populate({
        path: "member_id",
        populate: [
          { path: "position_id" },
          { path: "district" },
        ]
      })
      .lean();

    const resolvedMessages = await Promise.all(messages.map(async (msg) => {
      if (msg.member_id) {
        const resolvedMember = await resolveAssets([msg.member_id], MEMBER_ASSET_MAPPING);
        msg.member_id = resolvedMember[0];
      }
      return msg;
    }));
    return resolvedMessages;
  }

  /**
   * Fetch public about page messages
   */
  static async getAboutMessages() {
    await connectToDatabase();
    const messages = await LeadershipMessage.find({
      deleted_at: null,
      status: "published",
      about_visible: true,
    })
      .sort({ featured: -1, display_order: 1, published_at: -1 })
      .populate({
        path: "member_id",
        populate: [
          { path: "position_id" },
          { path: "district" },
        ]
      })
      .lean();

    const resolvedMessages = await Promise.all(messages.map(async (msg) => {
      if (msg.member_id) {
        const resolvedMember = await resolveAssets([msg.member_id], MEMBER_ASSET_MAPPING);
        msg.member_id = resolvedMember[0];
      }
      return msg;
    }));
    return resolvedMessages;
  }

  /**
   * Get single message by ID
   */
  static async getMessageById(id) {
    await connectToDatabase();
    const message = await LeadershipMessage.findOne({ _id: id, deleted_at: null })
      .populate({
        path: "member_id",
        populate: [
          { path: "position_id" },
          { path: "district" },
          { path: "committee_id" }
        ]
      })
      .lean();

    if (!message) return null;

    if (message.member_id) {
      const resolvedMember = await resolveAssets([message.member_id], MEMBER_ASSET_MAPPING);
      message.member_id = resolvedMember[0];
    }
    return message;
  }

  /**
   * Create a new message
   */
  static async createMessage(data, userId) {
    await connectToDatabase();
    
    // Check if member already has a message
    if (!data.is_custom_person && data.member_id) {
      const existing = await LeadershipMessage.findOne({ member_id: data.member_id, deleted_at: null });
      if (existing) {
        throw new Error("A leadership message already exists for this member.");
      }
    }

    if (data.status === "published") {
      data.published_at = new Date();
    }

    // Auto increment display order if not provided
    if (data.display_order === undefined) {
      const lastMessage = await LeadershipMessage.findOne().sort({ display_order: -1 });
      data.display_order = lastMessage ? lastMessage.display_order + 1 : 1;
    }

    data.created_by = userId;
    const message = new LeadershipMessage(data);
    await message.save();
    return message.toObject();
  }

  /**
   * Update message
   */
  static async updateMessage(id, data, userId) {
    await connectToDatabase();
    const existing = await LeadershipMessage.findOne({ _id: id, deleted_at: null });
    if (!existing) throw new Error("Message not found.");

    if (data.status === "published" && existing.status !== "published") {
      data.published_at = new Date();
    }

    // Prevent moving message to another member if that member already has a message
    if (!data.is_custom_person && data.member_id) {
       if (!existing.member_id || data.member_id.toString() !== existing.member_id.toString()) {
          const checkMember = await LeadershipMessage.findOne({ member_id: data.member_id, deleted_at: null });
          if (checkMember) throw new Error("A leadership message already exists for this member.");
       }
    }

    data.updated_by = userId;
    const updated = await LeadershipMessage.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    ).lean();
    
    return updated;
  }

  /**
   * Soft delete message
   */
  static async deleteMessage(id, userId) {
    await connectToDatabase();
    const updated = await LeadershipMessage.findByIdAndUpdate(
      id,
      { 
        $set: { 
          deleted_at: new Date(),
          updated_by: userId
        } 
      },
      { new: true }
    );
    if (!updated) throw new Error("Message not found.");
    return true;
  }
}
