import mongoose from 'mongoose';

const aboutTimelineSchema = new mongoose.Schema(
  {
    provinceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Province', required: true },
    year: { type: String, required: true },
    title: {
      en: { type: String, required: true },
      np: { type: String, required: true },
    },
    description: {
      en: String,
      np: String,
    },
    displayOrder: { type: Number, default: 0 },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

aboutTimelineSchema.index({ provinceId: 1, year: -1 });

const AboutTimeline = mongoose.models.AboutTimeline || mongoose.model('AboutTimeline', aboutTimelineSchema);

export default AboutTimeline;
