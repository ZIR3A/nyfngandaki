import mongoose from 'mongoose';

const EventRegistrationSchema = new mongoose.Schema(
  {
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true, index: true },
    
    // User details
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    organization: { type: String },
    
    // Status
    status: {
      type: String,
      enum: ['Registered', 'Waitlisted', 'Attended', 'Cancelled'],
      default: 'Registered',
      index: true
    },
    
    // Ticket identification
    ticketId: { type: String, unique: true, sparse: true },
    
    // Tracking
    registeredAt: { type: Date, default: Date.now },
    attendedAt: { type: Date },
    
    // For registered users if they have an account
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    
    notes: { type: String },
  },
  { timestamps: true }
);

// Ensure a user/email can't register twice for the same event
EventRegistrationSchema.index({ event: 1, email: 1 }, { unique: true });

// Prevent model overwrite in development
const EventRegistration = mongoose.models.EventRegistration || mongoose.model('EventRegistration', EventRegistrationSchema);

export default EventRegistration;
