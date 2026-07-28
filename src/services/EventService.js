import { DatabaseService } from "./DatabaseService";
import Event from "../models/Event";
import mongoose from "mongoose";

export class EventService {
  static async getFeaturedEvents(limit = 3) {
    try {
      await DatabaseService.connect();
      const events = await Event.find({ featured: true })
        .sort({ date: 1 })
        .limit(limit)
        .lean();
      return events;
    } catch (error) {
      console.error("Error fetching featured events:", error);
      throw error;
    }
  }

  static async getAllEvents() {
    try {
      await DatabaseService.connect();
      const events = await Event.find()
        .sort({ date: 1 })
        .lean();
      return events;
    } catch (error) {
      console.error("Error fetching all events:", error);
      throw error;
    }
  }

  static async getEventById(id) {
    try {
      await DatabaseService.connect();
      const event = await Event.findById(id).lean();
      return event;
    } catch (error) {
      console.error(`Error fetching event ${id}:`, error);
      throw error;
    }
  }

  static async createEvent(data) {
    try {
      await DatabaseService.connect();
      // Auto-generate slug if not provided
      if (!data.slug && data.title?.en) {
        data.slug = data.title.en.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
      }
      const newEvent = new Event(data);
      const savedEvent = await newEvent.save();
      return savedEvent.toObject();
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  }

  static async updateEvent(id, data) {
    try {
      await DatabaseService.connect();
      if (!data.slug && data.title?.en) {
        data.slug = data.title.en.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
      }
      const updatedEvent = await Event.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true, runValidators: true }
      ).lean();
      return updatedEvent;
    } catch (error) {
      console.error(`Error updating event ${id}:`, error);
      throw error;
    }
  }

  static async deleteEvent(id) {
    try {
      await DatabaseService.connect();
      const result = await Event.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.error(`Error deleting event ${id}:`, error);
      throw error;
    }
  }
}
