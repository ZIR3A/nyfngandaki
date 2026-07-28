import { DatabaseService } from "./DatabaseService";
import SiteSetting from "../models/SiteSetting";
import { resolveAssets } from "@/modules/storage/helpers/resolver.helper";

const SETTING_ASSET_MAPPING = [
  { idField: 'chairpersonImageId', urlField: 'chairpersonImage' },
  { idField: 'logoId', urlField: 'logo' },
  { idField: 'heroImageId', urlField: 'banner' },
  { idField: 'aboutImageId', urlField: 'aboutImage' }
];

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
      
      return resolveAssets(settings, SETTING_ASSET_MAPPING);
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
