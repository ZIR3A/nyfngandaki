import mongoose from "mongoose";

const LocalizedStringSchema = new mongoose.Schema(
  {
    en: { type: String, trim: true, default: "" },
    np: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const SiteSettingSchema = new mongoose.Schema(
  {
    organizationName: { type: LocalizedStringSchema },
    heroTitle: { type: LocalizedStringSchema },
    heroSubtitle: { type: LocalizedStringSchema },
    
    // Chairperson details
    chairpersonName: { type: LocalizedStringSchema },
    chairpersonMessage: { type: LocalizedStringSchema },
    chairpersonImageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Storage",
      default: null,
    },

    mission: { type: LocalizedStringSchema },
    vision: { type: LocalizedStringSchema },
    objectives: { type: LocalizedStringSchema },

    // Statistics
    stats: [
      {
        label: { type: LocalizedStringSchema },
        value: { type: String },
      }
    ],

    // Google Map Integration
    googleMapEmbedUrl: { type: String, default: null },

    // CTA Section
    ctaTitle: { type: LocalizedStringSchema },
    ctaDescription: { type: LocalizedStringSchema },
    ctaButtonLink: { type: String, default: "/contact" },

    footer: { type: LocalizedStringSchema },
    contact: {
      phone: { type: String, trim: true },
      email: { type: String, trim: true },
      address: LocalizedStringSchema,
    },
    socialLinks: {
      facebook: { type: String, trim: true },
      twitter: { type: String, trim: true },
      instagram: { type: String, trim: true },
      youtube: { type: String, trim: true },
    },
    logoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Storage",
      default: null,
    },
    heroImageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Storage",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const SiteSetting = mongoose.models.SiteSetting || mongoose.model("SiteSetting", SiteSettingSchema);

export default SiteSetting;
