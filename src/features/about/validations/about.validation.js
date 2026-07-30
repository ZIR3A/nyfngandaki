import { z } from 'zod';

const bilingualString = z.object({
  en: z.string().min(1, 'English text is required'),
  np: z.string().min(1, 'Nepali text is required'),
});

const bilingualOptionalString = z.object({
  en: z.string().optional(),
  np: z.string().optional(),
});

export const updateAboutPageSchema = z.object({
  hero: z.object({
    title: bilingualString.optional(),
    subtitle: bilingualOptionalString.optional(),
    imageId: z.string().optional(),
  }).optional(),
  organization: z.object({
    whoWeAre: bilingualOptionalString.optional(),
    vision: bilingualOptionalString.optional(),
    mission: bilingualOptionalString.optional(),
  }).optional(),
  leadership: z.object({
    quote: bilingualOptionalString.optional(),
    author: bilingualOptionalString.optional(),
  }).optional(),
  cta: z.object({
    title: bilingualOptionalString.optional(),
    link: z.string().url().optional().or(z.literal('')),
  }).optional(),
  seo: z.object({
    title: bilingualOptionalString.optional(),
    description: bilingualOptionalString.optional(),
    keywords: z.array(z.string()).optional(),
    ogImageId: z.string().optional(),
  }).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
});

export const createCoreValueSchema = z.object({
  title: bilingualString,
  description: bilingualOptionalString.optional(),
  iconId: z.string().optional(),
  displayOrder: z.number().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

export const createObjectiveSchema = z.object({
  title: bilingualString,
  description: bilingualOptionalString.optional(),
  displayOrder: z.number().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

export const createTimelineSchema = z.object({
  year: z.number().int().min(1900).max(2100),
  title: bilingualString,
  description: bilingualOptionalString.optional(),
  displayOrder: z.number().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

export const createActivitySchema = z.object({
  title: bilingualString,
  description: bilingualOptionalString.optional(),
  imageId: z.string().optional(),
  displayOrder: z.number().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

export const createStatisticSchema = z.object({
  title: bilingualString,
  value: z.string().min(1, 'Value is required'),
  iconId: z.string().optional(),
  displayOrder: z.number().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

export const createDocumentSchema = z.object({
  title: bilingualString,
  documentId: z.string().min(1, 'Document is required'),
  displayOrder: z.number().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

export const reorderSchema = z.object({
  items: z.array(z.object({
    id: z.string(),
    displayOrder: z.number(),
  })),
});
