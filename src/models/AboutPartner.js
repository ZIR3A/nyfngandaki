import mongoose from 'mongoose';

const AboutPartnerSchema = new mongoose.Schema({
  provinceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Province',
    required: false
  },
  name: {
    en: { type: String, required: true },
    np: { type: String, required: false }
  },
  url: {
    type: String,
    required: false
  },
  logoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
    required: false
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

export default mongoose.models.AboutPartner || mongoose.model('AboutPartner', AboutPartnerSchema);
