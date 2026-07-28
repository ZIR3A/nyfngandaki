import { DatabaseService } from "./DatabaseService";
import Activity from "../models/Activity";
import { resolveAssets } from "@/modules/storage/helpers/resolver.helper";

const ACTIVITY_ASSET_MAPPING = [
  { idField: 'imageId', urlField: 'image' }
];

export class ActivityService {
  static async getFeaturedActivities(limit = 3) {
    try {
      await DatabaseService.connect();
      const activities = await Activity.find({ featured: true, visibility: true })
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean();
      return resolveAssets(activities, ACTIVITY_ASSET_MAPPING);
    } catch (error) {
      console.error("Error fetching featured activities:", error);
      throw error;
    }
  }

  static async getAllActivities(includeHidden = false) {
    try {
      await DatabaseService.connect();
      const query = includeHidden ? {} : { visibility: true };
      const activities = await Activity.find(query)
        .sort({ createdAt: -1 })
        .lean();
      return resolveAssets(activities, ACTIVITY_ASSET_MAPPING);
    } catch (error) {
      console.error("Error fetching all activities:", error);
      throw error;
    }
  }

  static async getActivityById(id) {
    try {
      await DatabaseService.connect();
      const activity = await Activity.findById(id).lean();
      return resolveAssets(activity, ACTIVITY_ASSET_MAPPING);
    } catch (error) {
      console.error(`Error fetching activity ${id}:`, error);
      throw error;
    }
  }

  static async createActivity(data) {
    try {
      await DatabaseService.connect();
      const newActivity = new Activity(data);
      const savedActivity = await newActivity.save();
      return savedActivity.toObject();
    } catch (error) {
      console.error("Error creating activity:", error);
      throw error;
    }
  }

  static async updateActivity(id, data) {
    try {
      await DatabaseService.connect();
      const updatedActivity = await Activity.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true, runValidators: true }
      ).lean();
      return updatedActivity;
    } catch (error) {
      console.error(`Error updating activity ${id}:`, error);
      throw error;
    }
  }

  static async deleteActivity(id) {
    try {
      await DatabaseService.connect();
      const result = await Activity.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.error(`Error deleting activity ${id}:`, error);
      throw error;
    }
  }
}
