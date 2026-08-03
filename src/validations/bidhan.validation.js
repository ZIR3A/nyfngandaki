import { z } from "zod";

const LocalizedStringSchema = z.object({
  en: z.string().trim().optional(),
  np: z.string().trim().optional(),
});

// A utility schema that requires at least one language to be provided
const RequiredLocalizedStringSchema = LocalizedStringSchema.refine(
  (data) => data.en || data.np,
  { message: "Field is required in at least one language" }
);

// Constitution Validation
export const ConstitutionSchema = z.object({
  title: RequiredLocalizedStringSchema,
  description: LocalizedStringSchema.optional(),
  introduction: LocalizedStringSchema.optional(),
  currentVersion: z.string().min(1, "Current version is required"),
  publishDate: z.coerce.date().optional(),
  effectiveDate: z.coerce.date({ required_error: "Effective date is required" }),
  status: z.enum(["Draft", "Published", "Archived"]).optional().default("Draft"),
  visibility: z.enum(["Public", "Private", "Internal"]).optional().default("Public"),
  isFeatured: z.boolean().optional().default(false),
  defaultLanguage: z.enum(["en", "np"]).optional().default("np"),
});

// Chapter Validation
export const ChapterSchema = z.object({
  constitutionId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Constitution ID"),
  number: z.number().int().positive("Chapter number must be positive"),
  title: RequiredLocalizedStringSchema,
  slug: z.string().min(1, "Slug is required"),
  order: z.number().int().optional().default(0),
  description: LocalizedStringSchema.optional(),
  icon: z.string().optional(),
  status: z.enum(["Draft", "Published", "Archived"]).optional().default("Draft"),
  visibility: z.enum(["Public", "Private", "Internal"]).optional().default("Public"),
  seoSlug: z.string().optional(),
});

// Article Validation
export const ArticleSchema = z.object({
  constitutionId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Constitution ID"),
  chapterId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Chapter ID"),
  number: z.number().int().positive("Article number must be positive"),
  title: RequiredLocalizedStringSchema,
  content: z.object({
    en: z.any().optional(),
    np: z.any().optional(),
  }).refine((data) => data.en || data.np, { message: "Content is required in at least one language" }),
  summary: LocalizedStringSchema.optional(),
  readingTime: z.number().int().optional(),
  order: z.number().int().optional().default(0),
  isFeatured: z.boolean().optional().default(false),
  status: z.enum(["Draft", "Published", "Archived"]).optional().default("Draft"),
  visibility: z.enum(["Public", "Private", "Internal"]).optional().default("Public"),
  seoSlug: z.string().optional(),
});

// Document Validation
export const DocumentSchema = z.object({
  title: RequiredLocalizedStringSchema,
  description: LocalizedStringSchema.optional(),
  version: z.string().optional(),
  categoryId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Category ID"),
  language: z.enum(["en", "np", "both"]).optional().default("both"),
  driveFileId: z.string().min(1, "Drive File ID is required"),
  driveUrl: z.string().url("Invalid Drive URL").optional().or(z.literal("")),
  previewImage: z.string().url("Invalid Image URL").optional().or(z.literal("")),
  fileType: z.enum(["PDF", "DOC", "DOCX", "PPT", "XLS", "ZIP"]).optional().default("PDF"),
  fileSize: z.string().optional(),
  pageCount: z.number().int().positive().optional(),
  downloadEnabled: z.boolean().optional().default(true),
  onlineReadingEnabled: z.boolean().optional().default(true),
  isFeatured: z.boolean().optional().default(false),
  status: z.enum(["Draft", "Published", "Archived"]).optional().default("Draft"),
  publishDate: z.coerce.date().optional(),
  effectiveDate: z.coerce.date().optional(),
});

// Category Validation
export const CategorySchema = z.object({
  name: RequiredLocalizedStringSchema,
  slug: z.string().min(1, "Slug is required"),
  type: z.enum(["Document", "Resource", "Amendment", "Other"]).optional().default("Document"),
});

// Version Validation
export const VersionSchema = z.object({
  constitutionId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Constitution ID"),
  versionNumber: z.string().min(1, "Version number is required"),
  title: RequiredLocalizedStringSchema,
  description: LocalizedStringSchema.optional(),
  releaseDate: z.coerce.date({ required_error: "Release date is required" }),
  effectiveDate: z.coerce.date().optional(),
  status: z.enum(["Draft", "Published", "Archived"]).optional().default("Draft"),
  isCurrent: z.boolean().optional().default(false),
  previousVersion: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Version ID").optional().or(z.literal("")),
  nextVersion: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Version ID").optional().or(z.literal("")),
});

// Amendment Validation
export const AmendmentSchema = z.object({
  constitutionId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Constitution ID"),
  versionId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Version ID"),
  number: z.string().min(1, "Amendment number is required"),
  title: RequiredLocalizedStringSchema,
  description: LocalizedStringSchema.optional(),
  date: z.coerce.date({ required_error: "Amendment date is required" }),
  affectedChapters: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/)).optional(),
  affectedArticles: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/)).optional(),
  supportingDocuments: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/)).optional(),
  status: z.enum(["Draft", "Published", "Archived"]).optional().default("Draft"),
});
