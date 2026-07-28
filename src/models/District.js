import mongoose from "mongoose";

const LocalizedStringSchema = new mongoose.Schema(
  {
    en: { type: String, trim: true, default: "" },
    np: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const DistrictSchema = new mongoose.Schema(
  {
    name: {
      type: LocalizedStringSchema,
      required: true,
    },
    description: {
      type: LocalizedStringSchema,
    },
    coverImageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Storage",
      default: null,
    },
    officeImageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Storage",
      default: null,
    },
    officeAddress: {
      type: LocalizedStringSchema,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const District = mongoose.models.District || mongoose.model("District", DistrictSchema);

export default District;
