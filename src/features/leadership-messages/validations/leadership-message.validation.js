import { z } from "zod";

const baseSchema = z.object({
  member_id: z.string().nullable().optional(),
  is_custom_person: z.boolean().default(false),
  custom_name_en: z.string().optional(),
  custom_name_np: z.string().optional(),
  custom_position_en: z.string().optional(),
  custom_position_np: z.string().optional(),
  custom_photo: z.string().optional(),
  short_message_en: z
    .string({
      required_error: "Short Message (English) is required.",
    })
    .max(300, "Short Message (English) cannot exceed 300 characters."),
  short_message_np: z
    .string()
    .max(300, "Short Message (Nepali) cannot exceed 300 characters.")
    .optional(),
  full_message_en: z.string({
    required_error: "Full Message (English) is required.",
  }),
  full_message_np: z.string().optional(),
  homepage_visible: z.boolean().default(true).optional(),
  about_visible: z.boolean().default(true).optional(),
  featured: z.boolean().default(false).optional(),
  display_order: z.coerce.number().min(0, "Display order must be a positive integer.").optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft").optional(),
});

export const leadershipMessageSchema = baseSchema.refine(data => {
  if (data.is_custom_person) {
    return !!data.custom_name_en?.trim();
  } else {
    return !!data.member_id;
  }
}, {
  message: "Either a member must be selected or a custom English name must be provided.",
  path: ["member_id"],
});

export const leadershipMessageUpdateSchema = baseSchema.partial();
