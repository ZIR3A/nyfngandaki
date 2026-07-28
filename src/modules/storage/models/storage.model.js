import mongoose from "mongoose";

/**
 * Storage Model
 * 
 * Tracks metadata for every asset uploaded to Google Drive.
 * Business models (Member, Event, etc.) store the _id of these records,
 * not the raw URLs. The resolver helper converts IDs to URLs at query time.
 */
const storageSchema = new mongoose.Schema(
  {
    originalName: { type: String, required: true },
    storedName: { type: String, required: true, unique: true },
    mimeType: { type: String, required: true },
    extension: { type: String, required: true },
    size: { type: Number, required: true },
    provider: { type: String, required: true, default: "google-drive" },
    providerFileId: { type: String, required: true },
    providerFolderId: { type: String, required: true },
    folder: { type: String, required: true },
    publicUrl: { type: String, required: true },
    thumbnailUrl: { type: String },
    module: { type: String, required: true },
    entityId: { type: mongoose.Schema.Types.ObjectId },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // Media library metadata
    altText: { type: String, default: "" },
    tags: [{ type: String }],
    // Usage tracking
    usageCount: { type: Number, default: 0 },
    isUsed: { type: Boolean, default: false },
    // Soft delete
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// Indexes for faster lookups
storageSchema.index({ module: 1, folder: 1 });
storageSchema.index({ providerFileId: 1 });
storageSchema.index({ deletedAt: 1, createdAt: -1 });
storageSchema.index({ tags: 1 });

const Storage =
  mongoose.models.Storage || mongoose.model("Storage", storageSchema);

export default Storage;
