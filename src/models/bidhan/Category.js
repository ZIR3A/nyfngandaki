import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
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
    type: {
      type: String,
      enum: ["Document", "Resource", "Amendment", "Other"],
      default: "Document",
    },
    
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    
    // Soft Delete
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

if (mongoose.models.BidhanCategory) {
  delete mongoose.models.BidhanCategory;
}

export default mongoose.model("BidhanCategory", CategorySchema);
