import { DatabaseService } from "./DatabaseService";
import Resource from "../models/Resource";
import { resolveAssets } from "@/modules/storage/helpers/resolver.helper";

const RESOURCE_ASSET_MAPPING = [
  { idField: 'fileId', urlField: 'fileUrl' },
  { idField: 'thumbnailId', urlField: 'thumbnailUrl' }
];

export class ResourceService {
  static async getFeaturedResources(limit = 4) {
    try {
      await DatabaseService.connect();
      const resources = await Resource.find({ visibility: true })
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean();
      return resolveAssets(resources, RESOURCE_ASSET_MAPPING);
    } catch (error) {
      console.error("Error fetching featured resources:", error);
      throw error;
    }
  }

  static async getAllResources(includeHidden = false) {
    try {
      await DatabaseService.connect();
      const query = includeHidden ? {} : { visibility: true };
      const resources = await Resource.find(query)
        .sort({ createdAt: -1 })
        .lean();
      return resolveAssets(resources, RESOURCE_ASSET_MAPPING);
    } catch (error) {
      console.error("Error fetching all resources:", error);
      throw error;
    }
  }

  static async getResourceById(id) {
    try {
      await DatabaseService.connect();
      const resource = await Resource.findById(id).lean();
      return resolveAssets(resource, RESOURCE_ASSET_MAPPING);
    } catch (error) {
      console.error(`Error fetching resource ${id}:`, error);
      throw error;
    }
  }

  static async createResource(data) {
    try {
      await DatabaseService.connect();
      const newResource = new Resource(data);
      const savedResource = await newResource.save();
      return savedResource.toObject();
    } catch (error) {
      console.error("Error creating resource:", error);
      throw error;
    }
  }

  static async updateResource(id, data) {
    try {
      await DatabaseService.connect();
      const updatedResource = await Resource.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true, runValidators: true }
      ).lean();
      return updatedResource;
    } catch (error) {
      console.error(`Error updating resource ${id}:`, error);
      throw error;
    }
  }

  static async deleteResource(id) {
    try {
      await DatabaseService.connect();
      const result = await Resource.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.error(`Error deleting resource ${id}:`, error);
      throw error;
    }
  }
}
