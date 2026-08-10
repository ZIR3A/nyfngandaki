import mongoose from 'mongoose';

const NoticeAttachmentSchema = new mongoose.Schema({
  type: { type: String, enum: ['image', 'video', 'pdf'], required: true },
  storageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Storage' },
  externalUrl: { type: String },
  displayOrder: { type: Number, default: 0 }
});

const NoticeSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true, trim: true },
      np: { type: String, required: true, trim: true },
    },
    summary: {
      en: { type: String, trim: true },
      np: { type: String, trim: true },
    },
    content: {
      en: { type: String },
      np: { type: String },
    },
    type: { 
      type: String, 
      enum: ['text', 'image', 'pdf', 'video', 'mixed'],
      required: true,
      default: 'text'
    },
    priority: {
      type: String,
      enum: ['critical', 'high', 'normal', 'low'],
      default: 'normal'
    },
    status: {
      type: String,
      enum: ['draft', 'scheduled', 'published', 'expired', 'archived'],
      default: 'draft'
    },
    
    // Popup configuration
    popupEnabled: { type: Boolean, default: false },
    displayFrequency: {
      type: String,
      enum: ['once', 'session', 'daily', 'always'],
      default: 'once'
    },
    popupDelay: { type: Number, default: 2 }, // seconds
    
    // Dates
    startDate: { type: Date },
    endDate: { type: Date },
    publishedAt: { type: Date },
    
    // Media / Attachments
    attachments: [NoticeAttachmentSchema],
    
    // Audit / Soft delete
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

// Indexes
NoticeSchema.index({ status: 1 });
NoticeSchema.index({ startDate: 1 });
NoticeSchema.index({ endDate: 1 });
NoticeSchema.index({ popupEnabled: 1 });
NoticeSchema.index({ priority: 1 });
NoticeSchema.index({ publishedAt: -1 });

// Prevent model overwrite in development
if (mongoose.models.Notice) {
  delete mongoose.models.Notice;
}
const Notice = mongoose.model('Notice', NoticeSchema);

export default Notice;
