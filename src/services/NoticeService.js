import connectToDatabase from "@/lib/mongodb";
import Notice from "@/models/Notice";
import { resolveAssets } from "@/modules/storage/helpers/resolver.helper";

const NOTICE_ASSET_MAPPING = [
  { idField: 'attachments.$.imageId', urlField: 'attachments.$.imageUrl', assetField: 'attachments.$.imageAsset' } 
  // Depending on how media is stored. We might need a custom resolver if attachments is an array of IDs.
  // Assuming url is just a string in MediaSchema as per our schema, we don't strictly need asset resolver unless we use the internal storage module strictly.
];

export class NoticeService {
  /**
   * Get all notices (for admin) with pagination and filters
   */
  static async getAll(query = {}, options = { page: 1, limit: 20 }) {
    await connectToDatabase();
    
    // Support soft deletes
    if (query.isDeleted === undefined) {
      query.isDeleted = false;
    }

    const skip = (options.page - 1) * options.limit;
    
    const [notices, total] = await Promise.all([
      Notice.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(options.limit)
        .populate('attachments.storageId')
        .lean(),
      Notice.countDocuments(query)
    ]);
    
    return {
      notices: JSON.parse(JSON.stringify(notices)),
      total,
      page: options.page,
      pages: Math.ceil(total / options.limit)
    };
  }

  /**
   * Get the active notice (for public homepage)
   * Must be published, popupEnabled=true, and within valid dates
   */
  static async getActiveNotice() {
    await connectToDatabase();
    
    const now = new Date();
    const query = {
      isDeleted: false,
      status: 'published',
      popupEnabled: true,
      $or: [
        { startDate: { $lte: now } },
        { startDate: null },
        { startDate: { $exists: false } }
      ],
      $and: [
        {
          $or: [
            { endDate: { $gte: now } },
            { endDate: null },
            { endDate: { $exists: false } }
          ]
        }
      ]
    };

    // Sort by priority (critical > high > normal > low) then by newest
    // Since priority is a string, we might need to handle sorting in memory or use an aggregation pipeline.
    // To simplify, let's fetch all eligible and sort in memory if needed, or map priority to a number.
    // Given the small number of active notices, fetching and sorting is fine.
    
    const notices = await Notice.find(query)
      .sort({ publishedAt: -1 })
      .populate('attachments.storageId')
      .lean();
    
    if (!notices.length) return null;

    const priorityWeight = {
      critical: 4,
      high: 3,
      normal: 2,
      low: 1
    };

    notices.sort((a, b) => {
      const wA = priorityWeight[a.priority] || 0;
      const wB = priorityWeight[b.priority] || 0;
      if (wA !== wB) return wB - wA; // Higher weight first
      // If same priority, use publishedAt (newest first)
      const dateA = new Date(a.publishedAt || a.createdAt).getTime();
      const dateB = new Date(b.publishedAt || b.createdAt).getTime();
      return dateB - dateA;
    });

    return JSON.parse(JSON.stringify(notices[0]));
  }

  /**
   * Get a single notice by ID
   */
  static async getById(id) {
    await connectToDatabase();
    const notice = await Notice.findOne({ _id: id, isDeleted: false })
      .populate('attachments.storageId')
      .lean();
    if (!notice) return null;
    return JSON.parse(JSON.stringify(notice));
  }

  /**
   * Create a new notice
   */
  static async create(data) {
    await connectToDatabase();
    
    // Set publishedAt if status is published
    if (data.status === 'published' && !data.publishedAt) {
      data.publishedAt = new Date();
    }
    
    const notice = new Notice(data);
    await notice.save();
    return JSON.parse(JSON.stringify(notice.toObject()));
  }

  /**
   * Update an existing notice
   */
  static async update(id, data) {
    await connectToDatabase();
    
    // Handle publishing state
    if (data.status === 'published') {
      const existing = await Notice.findById(id).select('status publishedAt').lean();
      if (existing && existing.status !== 'published' && !data.publishedAt) {
        data.publishedAt = new Date();
      }
    }
    
    const notice = await Notice.findOneAndUpdate(
      { _id: id, isDeleted: false }, 
      data, 
      {
        new: true,
        runValidators: true,
      }
    ).lean();
    
    if (!notice) throw new Error("Notice not found");
    return JSON.parse(JSON.stringify(notice));
  }

  /**
   * Soft Delete a notice
   */
  static async delete(id) {
    await connectToDatabase();
    const notice = await Notice.findByIdAndUpdate(
      id,
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    ).lean();
    
    if (!notice) throw new Error("Notice not found");
    return JSON.parse(JSON.stringify(notice));
  }
}
