import BidhanDocument from "@/models/bidhan/Document";
import "@/models/bidhan/Category";

export const DocumentService = {
  /**
   * Get all official documents (admin) with pagination and filtering.
   */
  async getAllDocuments(query = {}) {
    const { limit = 10, page = 1, categoryId, status, search } = query;
    const filter = { isDeleted: false };
    
    if (categoryId) filter.categoryId = categoryId;
    if (status) filter.status = status;
    if (search) {
      filter.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      BidhanDocument.find(filter)
        .sort(search ? { score: { $meta: "textScore" } } : { createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .populate("categoryId", "name slug")
        .populate("createdBy", "name email")
        .lean(),
      BidhanDocument.countDocuments(filter),
    ]);

    return { data, total, page: Number(page), pages: Math.ceil(total / limit) };
  },

  /**
   * Get public documents (only published, filtered by category if provided).
   */
  async getPublicDocuments(query = {}) {
    return this.getAllDocuments({ ...query, status: "Published" });
  },

  /**
   * Get a single document by ID.
   */
  async getDocumentById(id) {
    return await BidhanDocument.findOne({ _id: id, isDeleted: false })
      .populate("categoryId", "name slug")
      .lean();
  },

  /**
   * Create a new document.
   */
  async createDocument(data, userId) {
    const document = new BidhanDocument({
      ...data,
      createdBy: userId,
      updatedBy: userId,
    });
    return await document.save();
  },

  /**
   * Update an existing document.
   */
  async updateDocument(id, data, userId) {
    return await BidhanDocument.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { ...data, updatedBy: userId },
      { new: true, runValidators: true }
    );
  },

  /**
   * Soft delete a document.
   */
  async softDeleteDocument(id, userId) {
    return await BidhanDocument.findOneAndUpdate(
      { _id: id },
      { isDeleted: true, deletedAt: new Date(), updatedBy: userId },
      { new: true }
    );
  }
};
