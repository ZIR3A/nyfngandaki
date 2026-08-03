import BidhanArticle from "@/models/bidhan/Article";

export const ArticleService = {
  /**
   * Get all articles for a specific chapter.
   */
  async getArticlesByChapter(chapterId, query = {}) {
    const filter = { chapterId, isDeleted: false, ...query };
    return await BidhanArticle.find(filter).sort({ order: 1 }).lean();
  },

  /**
   * Get single article by ID.
   */
  async getArticleById(id) {
    return await BidhanArticle.findOne({ _id: id, isDeleted: false }).lean();
  },

  /**
   * Create a new article.
   */
  async createArticle(data, userId) {
    const article = new BidhanArticle({
      ...data,
      createdBy: userId,
      updatedBy: userId,
    });
    return await article.save();
  },

  /**
   * Update an existing article.
   */
  async updateArticle(id, data, userId) {
    return await BidhanArticle.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { ...data, updatedBy: userId },
      { new: true, runValidators: true }
    );
  },

  /**
   * Move an article to a different chapter and update order.
   */
  async moveArticle(id, newChapterId, newOrder, userId) {
    return await BidhanArticle.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { chapterId: newChapterId, order: newOrder, updatedBy: userId },
      { new: true }
    );
  },

  /**
   * Bulk reorder articles.
   */
  async reorderArticles(updates, userId) {
    const bulkOps = updates.map((update) => ({
      updateOne: {
        filter: { _id: update.id, isDeleted: false },
        update: { $set: { order: update.order, updatedBy: userId } },
      },
    }));
    return await BidhanArticle.bulkWrite(bulkOps);
  },

  /**
   * Soft delete an article.
   */
  async softDeleteArticle(id, userId) {
    return await BidhanArticle.findOneAndUpdate(
      { _id: id },
      { isDeleted: true, deletedAt: new Date(), updatedBy: userId },
      { new: true }
    );
  }
};
