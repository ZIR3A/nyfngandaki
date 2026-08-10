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


    objectives: { type: LocalizedStringSchema },

    aboutImageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Storage",
      default: null,
    },

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
      phones: [
        {
          label: LocalizedStringSchema,
          number: { type: String, trim: true },
          primary: { type: Boolean, default: false }
        }
      ],
      emails: [
        {
          label: LocalizedStringSchema,
          email: { type: String, trim: true },
          primary: { type: Boolean, default: false }
        }
      ],
      address: LocalizedStringSchema,
      website: { type: String, trim: true },
      location: {
        latitude: { type: Number, default: null },
        longitude: { type: Number, default: null }
      }
    },
    socialLinks: {
      facebook: { type: String, trim: true },
      twitter: { type: String, trim: true },
      instagram: { type: String, trim: true },
      youtube: { type: String, trim: true },
      tiktok: { type: String, trim: true },
    },
    officeHours: {
      sunday: { enabled: { type: Boolean, default: true }, open: { type: String, default: "10:00" }, close: { type: String, default: "17:00" } },
      monday: { enabled: { type: Boolean, default: true }, open: { type: String, default: "10:00" }, close: { type: String, default: "17:00" } },
      tuesday: { enabled: { type: Boolean, default: true }, open: { type: String, default: "10:00" }, close: { type: String, default: "17:00" } },
      wednesday: { enabled: { type: Boolean, default: true }, open: { type: String, default: "10:00" }, close: { type: String, default: "17:00" } },
      thursday: { enabled: { type: Boolean, default: true }, open: { type: String, default: "10:00" }, close: { type: String, default: "17:00" } },
      friday: { enabled: { type: Boolean, default: true }, open: { type: String, default: "10:00" }, close: { type: String, default: "17:00" } },
      saturday: { enabled: { type: Boolean, default: false }, open: { type: String, default: "10:00" }, close: { type: String, default: "17:00" } },
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

if (mongoose.models.SiteSetting) {
  delete mongoose.models.SiteSetting;
}
const SiteSetting = mongoose.model("SiteSetting", SiteSettingSchema);

export default SiteSetting;
