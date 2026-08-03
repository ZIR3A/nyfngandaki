import BidhanVersion from "@/models/bidhan/Version";

export const VersionService = {
  /**
   * Get all versions for a constitution.
   */
  async getVersionsByConstitution(constitutionId, query = {}) {
    const filter = { constitutionId, isDeleted: false, ...query };
    return await BidhanVersion.find(filter).sort({ releaseDate: -1 }).lean();
  },

  /**
   * Create a new version.
   */
  async createVersion(data, userId) {
    const version = new BidhanVersion({
      ...data,
      createdBy: userId,
      updatedBy: userId,
    });
    return await version.save();
  },

  /**
   * Update an existing version.
   */
  async updateVersion(id, data, userId) {
    return await BidhanVersion.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { ...data, updatedBy: userId },
      { new: true, runValidators: true }
    );
  },

  /**
   * Soft delete a version.
   */
  async softDeleteVersion(id, userId) {
    return await BidhanVersion.findOneAndUpdate(
      { _id: id },
      { isDeleted: true, deletedAt: new Date(), updatedBy: userId },
      { new: true }
    );
  },

  /**
   * Make a version the current active version.
   */
  async makeVersionCurrent(versionId, constitutionId, userId) {
    // Set all versions for this constitution to isCurrent: false
    await BidhanVersion.updateMany(
      { constitutionId },
      { isCurrent: false, updatedBy: userId }
    );
    
    // Set the selected version to isCurrent: true
    const updatedVersion = await BidhanVersion.findOneAndUpdate(
      { _id: versionId },
      { isCurrent: true, status: "Published", updatedBy: userId },
      { new: true }
    );

    // Also update the parent Constitution's currentVersion
    if (updatedVersion) {
      const BidhanConstitution = (await import("@/models/bidhan/Constitution")).default;
      await BidhanConstitution.findOneAndUpdate(
        { _id: constitutionId },
        { currentVersion: updatedVersion.versionNumber, updatedBy: userId }
      );
    }

    return updatedVersion;
  }
};
