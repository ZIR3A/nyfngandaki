import { z } from "zod";

const LocalizedStringSchema = z.object({
  en: z.string().optional(),
  np: z.string().optional(),
});

export const DistrictSchema = z.object({
  name: LocalizedStringSchema.refine((data) => data.en || data.np, {
    message: "Name is required in at least one language",
  }),
  description: LocalizedStringSchema.optional(),
  coverImage: z.string().url("Invalid image URL").optional().or(z.literal("")),
  officeAddress: LocalizedStringSchema.optional(),
  phone: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  displayOrder: z.number().int().optional().default(0),
  status: z.enum(["Active", "Inactive"]).optional().default("Active"),
  slug: z.string().min(1, "Slug is required"),
});
