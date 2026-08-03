import mongoose from "mongoose";

const AmendmentSchema = new mongoose.Schema(
  {
    constitutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BidhanConstitution",
      required: true,
      index: true,
    },
    versionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BidhanVersion",
      required: true,
      index: true,
    },
    number: { type: String, required: true },
    title: {
      en: { type: String, required: true, trim: true },
      np: { type: String, required: true, trim: true },
    },
    description: {
      en: { type: String, trim: true },
      np: { type: String, trim: true },
    },
    date: { type: Date, required: true },
    
    // Many-to-Many Relationships
    affectedChapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "BidhanChapter" }],
    affectedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: "BidhanArticle" }],
    supportingDocuments: [{ type: mongoose.Schema.Types.ObjectId, ref: "BidhanDocument" }],
    
    status: {
      type: String,
      enum: ["Draft", "Published", "Archived"],
      default: "Draft",
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    
    // Soft Delete
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

if (mongoose.models.BidhanAmendment) {
  delete mongoose.models.BidhanAmendment;
}

export default mongoose.model("BidhanAmendment", AmendmentSchema);
