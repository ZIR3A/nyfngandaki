import { z } from 'zod';
import { EVENT_STATUS, EVENT_CATEGORIES } from '../constants/event.constants';

// Placeholder validation schema for events
export const eventSchema = z.object({
  title: z.object({
    en: z.string().min(3, 'English title is required'),
    np: z.string().min(3, 'Nepali title is required'),
  }),
  description: z.object({
    en: z.string().min(1, 'English description is required'),
    np: z.string().min(1, 'Nepali description is required'),
  }),
  startDate: z.string().min(1, 'Event start date is required'),
  endDate: z.string().optional(),
  status: z.enum([EVENT_STATUS.UPCOMING, EVENT_STATUS.ONGOING, EVENT_STATUS.COMPLETED, EVENT_STATUS.CANCELLED]),
  category: z.string().min(1, 'Event category is required'),
  summary: z.object({
    en: z.string().optional(),
    np: z.string().optional(),
  }).optional(),
  district: z.string().optional(),
  venue: z.object({
    name: z.object({
      en: z.string().min(1, 'Venue English name is required'),
      np: z.string().min(1, 'Venue Nepali name is required'),
    })
  }),
  duration: z.object({
    en: z.string().optional(),
    np: z.string().optional(),
  }).optional(),
  organizer: z.object({
    en: z.string().optional(),
    np: z.string().optional(),
  }).optional(),
  contact: z.object({
    phone: z.string().optional(),
    email: z.string().optional(),
    website: z.string().optional(),
  }).optional(),
  isFeatured: z.boolean().optional(),
  tags: z.string().optional(), // Using a comma-separated string for form input which is easy, or an array if using a multi-select component. Let's use string for easy form processing.
  media: z.array(
    z.object({
      _id: z.string(),
      url: z.string(),
      originalName: z.string().optional(),
      mimeType: z.string().optional(),
      isFeatured: z.boolean().optional(),
      caption: z.object({
        en: z.string().optional(),
        np: z.string().optional()
      }).optional()
    })
  ).optional(),
});
