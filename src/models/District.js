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
    shortDescription: {
      type: LocalizedStringSchema,
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
    stats: {
      totalMembers: { type: Number, default: 0 },
      activeMembers: { type: Number, default: 0 },
      officeBearers: { type: Number, default: 0 },
      committeeMembers: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

if (mongoose.models.District) {
  delete mongoose.models.District;
}
const District = mongoose.model("District", DistrictSchema);

export default District;
