import mongoose from 'mongoose';

const AboutFAQSchema = new mongoose.Schema({
  provinceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Province',
    required: false
  },
  question: {
    en: { type: String, required: true },
    np: { type: String, required: false }
  },
  answer: {
    en: { type: String, required: true },
    np: { type: String, required: false }
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE'],
    default: 'ACTIVE'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

export default mongoose.models.AboutFAQ || mongoose.model('AboutFAQ', AboutFAQSchema);
