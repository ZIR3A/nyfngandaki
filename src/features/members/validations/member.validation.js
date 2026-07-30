import { z } from "zod";

const LocalizedStringSchema = z.object({
  en: z.string().min(1, "English value is required").trim(),
  np: z.string().trim().optional(),
});

export const memberValidationSchema = z.object({
  name: LocalizedStringSchema,
  position: LocalizedStringSchema,
  biography: z.object({
    en: z.string().trim().optional(),
    np: z.string().trim().optional(),
  }).optional(),
  photo: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  phone: z.string().trim().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  facebook: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  district: z.string().optional().nullable(),
  province: z.string().default("Gandaki"),
  displayOrder: z.coerce.number().default(0),
  status: z.enum(["Active", "Inactive"]).default("Active"),
  isFeaturedOnHome: z.boolean().default(false),
  showPhonePublic: z.boolean().default(false),
  showEmailPublic: z.boolean().default(false),
  isChairperson: z.boolean().default(false),
});
