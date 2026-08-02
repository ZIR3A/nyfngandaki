import mongoose from 'mongoose';

const EventCategorySchema = new mongoose.Schema(
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
    description: {
      en: { type: String },
      np: { type: String },
    },
    color: { type: String, default: '#1546B0' }, // For UI chips/badges
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Prevent model overwrite in development
const EventCategory = mongoose.models.EventCategory || mongoose.model('EventCategory', EventCategorySchema);

export default EventCategory;
