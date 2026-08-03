import BidhanConstitution from "@/models/bidhan/Constitution";

export const ConstitutionService = {
  /**
   * Get the active published constitution.
   */
  async getActiveConstitution() {
    return await BidhanConstitution.findOne({ status: "Published", isDeleted: false })
      .lean();
  },

  /**
   * Get all constitutions (admin).
   */
  async getAllConstitutions(query = {}) {
    const { limit = 10, page = 1, status } = query;
    const filter = { isDeleted: false };
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      BidhanConstitution.find(filter)
        .sort({ effectiveDate: -1 })
        .skip(skip)
        .limit(Number(limit))
        .populate("createdBy", "name email")
        .lean(),
      BidhanConstitution.countDocuments(filter),
    ]);

    return { data, total, page: Number(page), pages: Math.ceil(total / limit) };
  },

  /**
   * Get a constitution by ID.
   */
  async getConstitutionById(id) {
    return await BidhanConstitution.findOne({ _id: id, isDeleted: false }).lean();
  },

  /**
   * Create a new constitution.
   */
  async createConstitution(data, userId) {
    // If setting to published, optionally archive others depending on business rule
    const newConstitution = new BidhanConstitution({
      ...data,
      createdBy: userId,
      updatedBy: userId,
    });
    return await newConstitution.save();
  },

  /**
   * Update an existing constitution.
   */
  async updateConstitution(id, data, userId) {
    return await BidhanConstitution.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { ...data, updatedBy: userId },
      { new: true, runValidators: true }
    );
  },

  /**
   * Soft delete a constitution.
   */
  async softDeleteConstitution(id, userId) {
    return await BidhanConstitution.findOneAndUpdate(
      { _id: id },
      { isDeleted: true, deletedAt: new Date(), updatedBy: userId },
      { new: true }
    );
  }
};
