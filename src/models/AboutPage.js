import mongoose from 'mongoose';

const aboutPageSchema = new mongoose.Schema(
  {
    provinceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Province', required: true },
    hero: {
      title: { en: String, np: String },
      subtitle: { en: String, np: String },
      imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Storage' }
    },
    organization: {
      imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Storage' },
      whoWeAre: { en: String, np: String },
      vision: { en: String, np: String },
      mission: { en: String, np: String },
      objectives: { en: String, np: String }
    },
    leadership: {
      label: { en: String, np: String },
      heading: { en: String, np: String },
      message: { en: String, np: String },
      name: String,
      designation: { en: String, np: String },
      photo: {
        url: String,
        alt: String
      },
      signature: {
        url: String
      }
    },
    cta: {
      heading: { en: String, np: String },
      description: { en: String, np: String }
    },
    seo: {
      title: { en: String, np: String },
      description: { en: String, np: String },
      keywords: [String],
      ogImageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Storage' },
    },
    documentsConfig: {
      title: { en: String, np: String },
      description: { en: String, np: String },
      transparencyNotice: { en: String, np: String },
    },
    status: { type: String, enum: ['DRAFT', 'PUBLISHED'], default: 'DRAFT' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

aboutPageSchema.index({ provinceId: 1 }, { unique: true, partialFilterExpression: { deletedAt: null } });

// In Next.js dev, hot-reload causes Mongoose to cache the old schema.
// We delete the cached model to always use the latest schema definition.
if (process.env.NODE_ENV !== 'production' && mongoose.models.AboutPage) {
  delete mongoose.models.AboutPage;
}
const AboutPage = mongoose.models.AboutPage || mongoose.model('AboutPage', aboutPageSchema);

export default AboutPage;
