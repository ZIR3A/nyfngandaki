import mongoose from 'mongoose';

const aboutDocumentSchema = new mongoose.Schema(
  {
    provinceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Province', required: true },
    title: {
      en: { type: String, required: true },
      np: { type: String, required: true },
    },
    documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Storage', required: true },
    displayOrder: { type: Number, default: 0 },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

aboutDocumentSchema.index({ provinceId: 1, displayOrder: 1 });

const AboutDocument = mongoose.models.AboutDocument || mongoose.model('AboutDocument', aboutDocumentSchema);

export default AboutDocument;
