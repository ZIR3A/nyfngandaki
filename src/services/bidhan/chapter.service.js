import BidhanChapter from "@/models/bidhan/Chapter";
import BidhanArticle from "@/models/bidhan/Article";

export const ChapterService = {
  /**
   * Get all chapters for a specific constitution (sorted by order).
   */
  async getChaptersByConstitution(constitutionId, query = {}) {
    const filter = { constitutionId, isDeleted: false, ...query };
    return await BidhanChapter.find(filter).sort({ order: 1 }).lean();
  },

  /**
   * Create a new chapter.
   */
  async createChapter(data, userId) {
    const chapter = new BidhanChapter({
      ...data,
      createdBy: userId,
      updatedBy: userId,
    });
    return await chapter.save();
  },

  /**
   * Update an existing chapter.
   */
  async updateChapter(id, data, userId) {
    return await BidhanChapter.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { ...data, updatedBy: userId },
      { new: true, runValidators: true }
    );
  },

  /**
   * Bulk reorder chapters.
   */
  async reorderChapters(updates, userId) {
    const bulkOps = updates.map((update) => ({
      updateOne: {
        filter: { _id: update.id, isDeleted: false },
        update: { $set: { order: update.order, updatedBy: userId } },
      },
    }));
    return await BidhanChapter.bulkWrite(bulkOps);
  },

  /**
   * Soft delete a chapter. (Also soft deletes all its articles)
   */
  async softDeleteChapter(id, userId) {
    const deletedChapter = await BidhanChapter.findOneAndUpdate(
      { _id: id },
      { isDeleted: true, deletedAt: new Date(), updatedBy: userId },
      { new: true }
    );
    
    if (deletedChapter) {
      // Soft delete associated articles
      await BidhanArticle.updateMany(
        { chapterId: id, isDeleted: false },
        { isDeleted: true, deletedAt: new Date(), updatedBy: userId }
      );
    }
    
    return deletedChapter;
  }
};
