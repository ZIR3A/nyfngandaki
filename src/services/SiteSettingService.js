import { DatabaseService } from "./DatabaseService";
import SiteSetting from "../models/SiteSetting";

export class SiteSettingService {
  static async getSettings() {
    try {
      await DatabaseService.connect();
      // We assume there's only one settings document
      let settings = await SiteSetting.findOne().lean();
      
      if (!settings) {
        // Create default if none exists
        settings = await SiteSetting.create({});
        settings = settings.toObject();
      }
      
      return settings;
    } catch (error) {
      console.error("Error fetching site settings:", error);
      throw error;
    }
  }

  static async updateSettings(data) {
    try {
      await DatabaseService.connect();
      
      let settings = await SiteSetting.findOne();
      if (!settings) {
        settings = new SiteSetting(data);
      } else {
        Object.assign(settings, data);
      }
      
      const savedSettings = await settings.save();
      return savedSettings.toObject();
    } catch (error) {
      console.error("Error updating site settings:", error);
      throw error;
    }
  }
}
