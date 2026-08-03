import mongoose from "mongoose";

const ChapterSchema = new mongoose.Schema(
  {
    constitutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BidhanConstitution",
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
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    description: {
      en: { type: String, trim: true },
      np: { type: String, trim: true },
    },
    icon: { type: String }, // e.g. lucide icon name
    
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

if (mongoose.models.BidhanChapter) {
  delete mongoose.models.BidhanChapter;
}

export default mongoose.model("BidhanChapter", ChapterSchema);
