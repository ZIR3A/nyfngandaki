import mongoose from 'mongoose';
import connectToDatabase from '@/lib/mongodb';
import Event from '@/models/Event';
import EventCategory from '@/models/EventCategory';

/**
 * Generate a unique slug for an event based on its title
 */
const generateUniqueSlug = async (titleEn) => {
  let baseSlug = titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  let slug = baseSlug;
  let counter = 1;

  while (await Event.exists({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  return slug;
};

export const eventService = {
  /**
   * Get events with pagination, search, and filtering
   */
  async getEvents({ page = 1, limit = 10, search = '', status = '', category = '' } = {}) {
    await connectToDatabase();
    
    const query = { isDeleted: false };
    
    // Text search
    if (search) {
      query.$text = { $search: search };
    }
    
    // Status filter
    if (status) {
      query.status = status;
    }
    
    // Category filter (support both ObjectIds and slugs)
    if (category) {
      if (mongoose.Types.ObjectId.isValid(category)) {
        query.category = category;
      } else {
        const catDoc = await EventCategory.findOne({ slug: category }).lean();
        if (catDoc) {
          query.category = catDoc._id;
        } else {
          // Force empty result if category slug is invalid
          query.category = null;
        }
      }
    }

    const skip = (page - 1) * limit;
    
    const [events, total] = await Promise.all([
      Event.find(query)
        .populate('category', 'name color slug')
        .populate('district', 'name slug')
        .sort(search ? { score: { $meta: 'textScore' } } : { startDate: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Event.countDocuments(query)
    ]);

    return JSON.parse(JSON.stringify({
      events,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      }
    }));
  },

  /**
   * Get a single event by slug
   */
  async getEventBySlug(slug) {
    await connectToDatabase();
    const event = await Event.findOne({ slug, isDeleted: false })
      .populate('category', 'name color slug')
      .populate('district', 'name slug')
      .lean();
    return event ? JSON.parse(JSON.stringify(event)) : null;
  },

  /**
   * Get a single event by ID
   */
  async getEventById(id) {
    await connectToDatabase();
    const event = await Event.findOne({ _id: id, isDeleted: false })
      .populate('category', 'name color slug')
      .populate('district', 'name slug')
      .lean();
    return event ? JSON.parse(JSON.stringify(event)) : null;
  },

  /**
   * Create a new event
   */
  async createEvent(data) {
    await connectToDatabase();
    
    // Generate slug
    const slug = await generateUniqueSlug(data.title.en);
    
    // Process tags
    let processedTags = [];
    if (typeof data.tags === 'string') {
      processedTags = data.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    } else if (Array.isArray(data.tags)) {
      processedTags = data.tags;
    }
    
    // Process media and cover image
    let formattedMedia = [];
    let coverImage = data.coverImage || null;
    
    if (data.media && Array.isArray(data.media)) {
      formattedMedia = data.media.map(m => ({
        type: m.type || (m.mimeType?.startsWith('video/') ? 'video' : m.mimeType?.includes('pdf') || m.mimeType?.includes('document') ? 'document' : 'image'),
        url: m.url,
        title: {
          en: m.caption?.en || m.originalName || '',
          np: m.caption?.np || m.originalName || ''
        }
      }));
      
      const featured = data.media.find(m => m.isFeatured) || data.media[0];
      if (featured && featured.url) {
        coverImage = featured.url;
      }
    }
    
    const newEvent = new Event({
      ...data,
      tags: processedTags,
      media: formattedMedia,
      coverImage,
      slug,
    });
    
    await newEvent.save();
    return newEvent.toObject();
  },

  /**
   * Update an existing event
   */
  async updateEvent(id, data) {
    await connectToDatabase();
    
    let updateData = { ...data };

    // Process tags
    if (data.tags !== undefined) {
      if (typeof data.tags === 'string') {
        updateData.tags = data.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      } else if (Array.isArray(data.tags)) {
        updateData.tags = data.tags;
      }
    }

    // Process media and cover image if media is provided
    if (data.media && Array.isArray(data.media)) {
      updateData.media = data.media.map(m => ({
        type: m.type || (m.mimeType?.startsWith('video/') ? 'video' : m.mimeType?.includes('pdf') || m.mimeType?.includes('document') ? 'document' : 'image'),
        url: m.url,
        title: {
          en: m.caption?.en || m.originalName || '',
          np: m.caption?.np || m.originalName || ''
        }
      }));
      
      const featured = data.media.find(m => m.isFeatured) || data.media[0];
      if (featured && featured.url) {
        updateData.coverImage = featured.url;
      }
    }
    
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();
    
    if (!updatedEvent) throw new Error('Event not found');
    return updatedEvent;
  },

  /**
   * Soft delete an event
   */
  async softDeleteEvent(id) {
    await connectToDatabase();
    const deletedEvent = await Event.findByIdAndUpdate(
      id,
      { $set: { isDeleted: true, deletedAt: new Date() } },
      { new: true }
    ).lean();
    
    if (!deletedEvent) throw new Error('Event not found');
    return deletedEvent;
  },
  
  /**
   * Get all event categories
   */
  async getCategories() {
    await connectToDatabase();
    return await EventCategory.find({ isActive: true }).sort({ 'name.en': 1 }).lean();
  },

  /**
   * Get related events
   */
  async getRelatedEvents(categoryId, excludeEventId, limit = 3) {
    await connectToDatabase();
    if (!categoryId) return [];
    const events = await Event.find({
      category: categoryId,
      _id: { $ne: excludeEventId },
      isDeleted: false,
      status: { $in: ['Upcoming', 'Ongoing'] }
    })
      .populate('category', 'name color slug')
      .populate('district', 'name slug')
      .sort({ startDate: 1 })
      .limit(limit)
      .lean();
    return JSON.parse(JSON.stringify(events));
  },

  /**
   * Get basic statistics about events
   */
  async getEventStats() {
    await connectToDatabase();
    const [total, upcoming, completed] = await Promise.all([
      Event.countDocuments({ isDeleted: false }),
      Event.countDocuments({ isDeleted: false, status: 'Upcoming' }),
      Event.countDocuments({ isDeleted: false, status: 'Completed' })
    ]);
    return { total, upcoming, completed };
  }
};
