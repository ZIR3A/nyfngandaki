import mongoose from "mongoose";

const LocalizedStringSchema = new mongoose.Schema(
  {
    en: { type: String, trim: true, default: "" },
    np: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const ActivitySchema = new mongoose.Schema(
  {
    title: {
      type: LocalizedStringSchema,
      required: true,
    },
    description: {
      type: LocalizedStringSchema,
    },
    type: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    statistics: {
      value: { type: String },
      label: LocalizedStringSchema,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    visibility: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.models.Activity || mongoose.model("Activity", ActivitySchema);

export default Activity;
