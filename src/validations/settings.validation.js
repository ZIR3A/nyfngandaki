import { z } from "zod";

const LocalizedStringSchema = z.object({
  en: z.string().optional(),
  np: z.string().optional(),
});

export const SiteSettingSchema = z.object({
  organizationName: LocalizedStringSchema.optional(),
  heroTitle: LocalizedStringSchema.optional(),
  heroSubtitle: LocalizedStringSchema.optional(),

  objectives: LocalizedStringSchema.optional(),
  footer: LocalizedStringSchema.optional(),
  contact: z.object({
    phone: z.string().optional(),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
    address: LocalizedStringSchema.optional(),
  }).optional(),
  socialLinks: z.object({
    facebook: z.string().url("Invalid URL").optional().or(z.literal("")),
    twitter: z.string().url("Invalid URL").optional().or(z.literal("")),
    instagram: z.string().url("Invalid URL").optional().or(z.literal("")),
    youtube: z.string().url("Invalid URL").optional().or(z.literal("")),
  }).optional(),
  logo: z.string().url("Invalid image URL").optional().or(z.literal("")),
  banner: z.string().url("Invalid image URL").optional().or(z.literal("")),
});
