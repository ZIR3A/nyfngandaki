import { z } from "zod";

const LocalizedStringSchema = z.object({
  en: z.string().optional(),
  np: z.string().optional(),
});

export const EventSchema = z.object({
  title: LocalizedStringSchema.refine((data) => data.en || data.np, {
    message: "Title is required in at least one language",
  }),
  description: LocalizedStringSchema.optional(),
  venue: LocalizedStringSchema.optional(),
  organizer: LocalizedStringSchema.optional(),
  date: z.coerce.date({ required_error: "Date is required" }),
  district: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid District ID").optional().or(z.literal("")),
  coverImage: z.string().url("Invalid image URL").optional().or(z.literal("")),
  galleryImages: z.array(z.string().url("Invalid image URL")).optional().default([]),
  status: z.enum(["Upcoming", "Ongoing", "Completed", "Cancelled"]).optional().default("Upcoming"),
  slug: z.string().min(1, "Slug is required"),
  featured: z.boolean().optional().default(false),
  seo: z.object({
    title: LocalizedStringSchema.optional(),
    description: LocalizedStringSchema.optional(),
  }).optional(),
});
