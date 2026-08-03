import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    constitutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BidhanConstitution",
      required: true,
      index: true,
    },
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BidhanChapter",
      required: true,
      index: true,
    },
    number: {
      type: Number,
      required: true,
    },
    title: {
      en: { type: String, required: true, trim: true },
      np: { type: String, required: true, trim: true },
    },
    content: {
      // Storing structured rich editor content (HTML or JSON block format)
      en: { type: mongoose.Schema.Types.Mixed, required: true },
      np: { type: mongoose.Schema.Types.Mixed, required: true },
    },
    summary: {
      en: { type: String, trim: true },
      np: { type: String, trim: true },
    },
    readingTime: { type: Number }, // in minutes
    order: {
      type: Number,
      default: 0,
    },
    isFeatured: { type: Boolean, default: false },
    
    status: {
      type: String,
      enum: ["Draft", "Published", "Archived"],
      default: "Draft",
    },
    
    visibility: {
      type: String,
      enum: ["Public", "Private", "Internal"],
      default: "Public",
    },
    
    seoSlug: { type: String, trim: true },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    
    // Soft Delete
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

// Indexes for search
ArticleSchema.index({ "title.en": "text", "title.np": "text" });

if (mongoose.models.BidhanArticle) {
  delete mongoose.models.BidhanArticle;
}

export default mongoose.model("BidhanArticle", ArticleSchema);
