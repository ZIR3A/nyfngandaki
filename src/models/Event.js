import mongoose from 'mongoose';


// Embedded Schema for Media (Gallery, Videos, Documents)
const MediaSchema = new mongoose.Schema({
  type: { type: String, enum: ['image', 'video', 'document'], required: true },
  url: { type: String, required: true },
  title: {
    en: { type: String },
    np: { type: String },
  },
  size: { type: String }, // E.g., "2.4 MB" for documents
});

const EventSchema = new mongoose.Schema(
  {
    title: {
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
    summary: {
      en: { type: String, trim: true },
      np: { type: String, trim: true },
    },
    description: {
      en: { type: String, required: true },
      np: { type: String, required: true },
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'EventCategory', index: true },
    
    // Status can be Upcoming, Ongoing, Completed, Cancelled
    status: { 
      type: String, 
      enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'],
      default: 'Upcoming',
      index: true
    },
    
    // Dates & Times
    startDate: { type: Date, required: true, index: true },
    endDate: { type: Date },
    time: { type: String }, // e.g. "10:00 AM - 4:00 PM"
    duration: {
      en: { type: String }, // e.g. "3 Days"
      np: { type: String }, // e.g. "३ दिन"
    },
    
    // Location
    district: { type: mongoose.Schema.Types.ObjectId, ref: 'District', index: true },
    venue: {
      name: {
        en: { type: String, required: true },
        np: { type: String, required: true },
      },
      address: {
        en: { type: String },
        np: { type: String },
      },
      mapUrl: { type: String },
    },
    
    organizer: {
      en: { type: String },
      np: { type: String },
    },
    
    contact: {
      phone: { type: String },
      email: { type: String },
      website: { type: String },
    },
    
    isFeatured: { type: Boolean, default: false, index: true },
    tags: [{ type: String, trim: true }],
    
    coverImage: { type: String }, // Main banner image
    
    media: [MediaSchema],
    
    // Soft Delete
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

// Indexes for Text Search
EventSchema.index({
  'title.en': 'text',
  'title.np': 'text',
  'description.en': 'text',
  'description.np': 'text',
});

// Prevent model overwrite in development
if (mongoose.models.Event) {
  delete mongoose.models.Event;
}
const Event = mongoose.model('Event', EventSchema);

export default Event;
