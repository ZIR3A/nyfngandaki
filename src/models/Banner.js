import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true },
      np: { type: String, required: true },
    },
    subtitle: {
      en: { type: String, required: true },
      np: { type: String, required: true },
    },
    description: {
      en: { type: String },
      np: { type: String },
    },
    imageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Storage",
    },
    primaryButtonText: {
      en: { type: String },
      np: { type: String },
    },
    primaryButtonLink: {
      type: String,
    },
    secondaryButtonText: {
      en: { type: String },
      np: { type: String },
    },
    secondaryButtonLink: {
      type: String,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Prevent mongoose from compiling the model multiple times in development
const Banner = mongoose.models.Banner || mongoose.model("Banner", BannerSchema);

export default Banner;
