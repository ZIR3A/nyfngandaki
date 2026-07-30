import mongoose from 'mongoose';

const aboutStatisticSchema = new mongoose.Schema(
  {
    provinceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Province', required: true },
    title: {
      en: { type: String, required: true },
      np: { type: String, required: true },
    },
    number: { type: String, required: true },
    suffix: {
      en: String,
      np: String,
    },
    icon: String,
    displayOrder: { type: Number, default: 0 },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

aboutStatisticSchema.index({ provinceId: 1, displayOrder: 1 });

const AboutStatistic = mongoose.models.AboutStatistic || mongoose.model('AboutStatistic', aboutStatisticSchema);

export default AboutStatistic;
