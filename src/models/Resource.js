import mongoose from "mongoose";

const LocalizedStringSchema = new mongoose.Schema(
  {
    en: { type: String, trim: true, default: "" },
    np: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const ResourceSchema = new mongoose.Schema(
  {
    title: {
      type: LocalizedStringSchema,
      required: true,
    },
    description: {
      type: LocalizedStringSchema,
    },
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Storage",
      required: true,
    },
    thumbnailId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Storage",
      default: null,
    },
    fileSize: {
      type: String,
    },
    category: {
      type: String,
    },
    badges: [{
      type: String,
    }],
    visibility: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

const Resource = mongoose.models.Resource || mongoose.model("Resource", ResourceSchema);

export default Resource;
