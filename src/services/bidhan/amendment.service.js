import BidhanAmendment from "@/models/bidhan/Amendment";

export const AmendmentService = {
  /**
   * Get all amendments for a constitution.
   */
  async getAmendmentsByConstitution(constitutionId, query = {}) {
    const filter = { constitutionId, isDeleted: false, ...query };
    return await BidhanAmendment.find(filter).sort({ date: -1 }).lean();
  },

  /**
   * Create a new amendment.
   */
  async createAmendment(data, userId) {
    const amendment = new BidhanAmendment({
      ...data,
      createdBy: userId,
      updatedBy: userId,
    });
    return await amendment.save();
  },

  /**
   * Update an existing amendment.
   */
  async updateAmendment(id, data, userId) {
    return await BidhanAmendment.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { ...data, updatedBy: userId },
      { new: true, runValidators: true }
    );
  },

  /**
   * Soft delete an amendment.
   */
  async softDeleteAmendment(id, userId) {
    return await BidhanAmendment.findOneAndUpdate(
      { _id: id },
      { isDeleted: true, deletedAt: new Date(), updatedBy: userId },
      { new: true }
    );
  }
};
