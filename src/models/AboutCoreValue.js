import mongoose from 'mongoose';

const aboutCoreValueSchema = new mongoose.Schema(
  {
    provinceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Province', required: true },
    title: {
      en: { type: String, required: true },
      np: { type: String, required: true },
    },
    description: {
      en: String,
      np: String,
    },
    iconId: { type: mongoose.Schema.Types.ObjectId, ref: 'Storage' },
    displayOrder: { type: Number, default: 0 },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

aboutCoreValueSchema.index({ provinceId: 1, displayOrder: 1 });

const AboutCoreValue = mongoose.models.AboutCoreValue || mongoose.model('AboutCoreValue', aboutCoreValueSchema);

export default AboutCoreValue;
