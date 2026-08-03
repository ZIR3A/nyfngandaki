import mongoose from "mongoose";

const VersionSchema = new mongoose.Schema(
  {
    constitutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BidhanConstitution",
      required: true,
      index: true,
    },
    versionNumber: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      en: { type: String, required: true, trim: true },
      np: { type: String, required: true, trim: true },
    },
    description: {
      en: { type: String, trim: true },
      np: { type: String, trim: true },
    },
    releaseDate: { type: Date, required: true },
    effectiveDate: { type: Date },
    
    status: {
      type: String,
      enum: ["Draft", "Published", "Archived"],
      default: "Draft",
    },
    isCurrent: { type: Boolean, default: false },
    
    previousVersion: { type: mongoose.Schema.Types.ObjectId, ref: "BidhanVersion" },
    nextVersion: { type: mongoose.Schema.Types.ObjectId, ref: "BidhanVersion" },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    
    // Soft Delete
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

if (mongoose.models.BidhanVersion) {
  delete mongoose.models.BidhanVersion;
}

export default mongoose.model("BidhanVersion", VersionSchema);
