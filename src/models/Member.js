import mongoose from "mongoose";

const LocalizedStringSchema = new mongoose.Schema(
  {
    en: { type: String, trim: true, default: "" },
    np: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const MemberSchema = new mongoose.Schema(
  {
    name: {
      type: LocalizedStringSchema,
      required: true,
    },
    position: {
      type: LocalizedStringSchema,
      required: true,
    },
    biography: {
      type: LocalizedStringSchema,
    },
    profilePhotoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Storage",
      default: null,
    },
    coverPhotoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Storage",
      default: null,
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
    facebook: {
      type: String,
      trim: true,
    },
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
      default: null,
    },
    province: {
      type: String,
      default: "Gandaki",
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
    isFeaturedOnHome: {
      type: Boolean,
      default: false,
    },
    showPhonePublic: {
      type: Boolean,
      default: false,
    },
    showEmailPublic: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    seo: {
      title: LocalizedStringSchema,
      description: LocalizedStringSchema,
    },
  },
  {
    timestamps: true,
  }
);

const Member = mongoose.models.Member || mongoose.model("Member", MemberSchema);

export default Member;
