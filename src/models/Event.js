import mongoose from "mongoose";

const LocalizedStringSchema = new mongoose.Schema(
  {
    en: { type: String, trim: true, default: "" },
    np: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: LocalizedStringSchema,
      required: true,
    },
    description: {
      type: LocalizedStringSchema,
    },
    venue: {
      type: LocalizedStringSchema,
    },
    organizer: {
      type: LocalizedStringSchema,
    },
    date: {
      type: Date,
      required: true,
    },
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
      default: null,
    },
    coverImage: {
      type: String,
      default: null,
    },
    galleryImages: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"],
      default: "Upcoming",
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
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

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

export default Event;
