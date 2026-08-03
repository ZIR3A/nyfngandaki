import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true, trim: true },
      np: { type: String, required: true, trim: true },
    },
    description: {
      en: { type: String, trim: true },
      np: { type: String, trim: true },
    },
    version: { type: String, trim: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BidhanCategory",
      required: true,
      index: true,
    },
    docLanguage: {
      type: String,
      enum: ["en", "np", "both"],
      default: "both",
    },
    
    // Google Drive Integration
    driveFileId: { type: String, required: true },
    driveUrl: { type: String },
    previewImage: { type: String }, // Thumbnail URL
    
    fileType: {
      type: String,
      enum: ["PDF", "DOC", "DOCX", "PPT", "XLS", "ZIP"],
      default: "PDF",
    },
    fileSize: { type: String }, // e.g., "2.4 MB"
    pageCount: { type: Number },
    
    downloadEnabled: { type: Boolean, default: true },
    onlineReadingEnabled: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    
    status: {
      type: String,
      enum: ["Draft", "Published", "Archived"],
      default: "Draft",
    },
    
    publishDate: { type: Date },
    effectiveDate: { type: Date },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    
    // Soft Delete
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

DocumentSchema.index(
  { "title.en": "text", "title.np": "text" },
  { language_override: "dummyLanguage" }
);

if (mongoose.models.BidhanDocument) {
  delete mongoose.models.BidhanDocument;
}

export default mongoose.model("BidhanDocument", DocumentSchema);
