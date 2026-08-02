import mongoose from 'mongoose';

const EventReportSchema = new mongoose.Schema(
  {
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true, unique: true, index: true },
    
    summary: {
      en: { type: String, required: true },
      np: { type: String, required: true },
    },
    
    attendanceCount: { type: Number, default: 0 },
    
    highlights: {
      en: [{ type: String }],
      np: [{ type: String }],
    },
    
    // Links to report documents or gallery for the report
    reportDocuments: [{
      title: { type: String },
      url: { type: String, required: true }
    }],
    
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    
    // Status of the report
    status: {
      type: String,
      enum: ['Draft', 'Published'],
      default: 'Draft',
    }
  },
  { timestamps: true }
);

// Prevent model overwrite in development
const EventReport = mongoose.models.EventReport || mongoose.model('EventReport', EventReportSchema);

export default EventReport;
