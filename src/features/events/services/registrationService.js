import connectToDatabase from '@/lib/mongodb';
import Event from '@/models/Event';
import EventRegistration from '@/models/EventRegistration';

export const registrationService = {
  /**
   * Register for an event. Handles capacity and waitlist logic automatically.
   */
  async registerForEvent(eventId, userData) {
    await connectToDatabase();
    
    const event = await Event.findById(eventId);
    if (!event) throw new Error("Event not found");
    if (!event.isRegistrationOpen) throw new Error("Registration is closed for this event");

    // Check for existing registration
    const existing = await EventRegistration.findOne({ event: eventId, email: userData.email });
    if (existing) throw new Error("A registration with this email already exists for this event");

    // Capacity Logic
    let status = 'Registered';
    if (event.capacity && event.capacity > 0) {
      const currentRegistrations = await EventRegistration.countDocuments({ 
        event: eventId, 
        status: { $in: ['Registered', 'Attended'] } 
      });
      
      if (currentRegistrations >= event.capacity) {
        status = 'Waitlisted';
      }
    }

    // Generate unique Ticket ID
    const ticketId = `NYFN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    const registration = await EventRegistration.create({
      event: eventId,
      ...userData,
      status,
      ticketId,
    });

    return JSON.parse(JSON.stringify(registration));
  },

  /**
   * Admin: Get registrations for an event
   */
  async getEventRegistrations(eventId, { page = 1, limit = 20, status = '' } = {}) {
    await connectToDatabase();
    
    const query = { event: eventId };
    if (status) query.status = status;

    const skip = (page - 1) * limit;

    const [registrations, total] = await Promise.all([
      EventRegistration.find(query)
        .sort({ registeredAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      EventRegistration.countDocuments(query)
    ]);

    return {
      registrations: JSON.parse(JSON.stringify(registrations)),
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + registrations.length < total
      }
    };
  },

  /**
   * Admin: Update registration status (e.g. mark Attended, manual override from Waitlist)
   */
  async updateRegistrationStatus(registrationId, newStatus) {
    await connectToDatabase();
    const update = { status: newStatus };
    if (newStatus === 'Attended') {
      update.attendedAt = new Date();
    }
    
    const registration = await EventRegistration.findByIdAndUpdate(
      registrationId,
      update,
      { new: true }
    );
    return JSON.parse(JSON.stringify(registration));
  },

  /**
   * User: Cancel their own registration
   */
  async cancelRegistration(ticketId) {
    await connectToDatabase();
    const registration = await EventRegistration.findOneAndUpdate(
      { ticketId },
      { status: 'Cancelled' },
      { new: true }
    );
    
    // Auto-promote waitlisted users if capacity opens up? 
    // That could be an advanced feature. For now, manual admin promotion is safer.
    
    return JSON.parse(JSON.stringify(registration));
  }
};
