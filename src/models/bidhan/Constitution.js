import mongoose from "mongoose";

const ConstitutionSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true, trim: true },
      np: { type: String, required: true, trim: true },
    },
    description: {
      en: { type: String, trim: true },
      np: { type: String, trim: true },
    },
    introduction: {
      en: { type: String, trim: true },
      np: { type: String, trim: true },
    },
    currentVersion: {
      type: String,
      required: true,
      trim: true,
    },
    publishDate: { type: Date },
    effectiveDate: { type: Date, required: true },
    
    // Status can be Draft, Published, Archived
    status: {
      type: String,
      enum: ["Draft", "Published", "Archived"],
      default: "Draft",
      index: true,
    },
    
    visibility: {
      type: String,
      enum: ["Public", "Private", "Internal"],
      default: "Public",
    },
    
    isFeatured: { type: Boolean, default: false },
    defaultLanguage: { type: String, enum: ["en", "np"], default: "np" },
    
    // Audit fields
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    
    // Soft Delete
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

// Indexes
ConstitutionSchema.index({ "title.en": "text", "title.np": "text" });

if (mongoose.models.BidhanConstitution) {
  delete mongoose.models.BidhanConstitution;
}

export default mongoose.model("BidhanConstitution", ConstitutionSchema);
