import { z } from "zod";

const LocalizedStringSchema = z.object({
  en: z.string().optional(),
  np: z.string().optional(),
});

export const MemberSchema = z.object({
  name: LocalizedStringSchema.refine((data) => data.en || data.np, {
    message: "Name is required in at least one language",
  }),
  position: LocalizedStringSchema.refine((data) => data.en || data.np, {
    message: "Position is required in at least one language",
  }),
  biography: LocalizedStringSchema.optional(),
  photo: z.string().url("Invalid photo URL").optional().or(z.literal("")),
  phone: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  facebook: z.string().url("Invalid Facebook URL").optional().or(z.literal("")),
  district: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid District ID").optional().or(z.literal("")),
  province: z.string().optional(),
  displayOrder: z.number().int().optional().default(0),
  status: z.enum(["Active", "Inactive"]).optional().default("Active"),
  slug: z.string().min(1, "Slug is required"),
  seo: z.object({
    title: LocalizedStringSchema.optional(),
    description: LocalizedStringSchema.optional(),
  }).optional(),
});
