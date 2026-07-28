import { GoogleDriveProvider } from "../providers/google-drive.provider";
import StorageModel from "../models/storage.model";
import { resolveCanonicalFolder } from "../helpers/folder.helper";
import { generateSecureFilename } from "../helpers/filename.helper";
import connectToDatabase from "@/lib/mongodb";

/**
 * Storage Service V3
 *
 * Central coordinator for all file storage operations.
 * Separates Google Drive concerns from business logic.
 * 
 * Consumers (API routes, Server Actions) only interact with this service.
 * No module ever calls Google Drive directly.
 */
export class StorageService {
  constructor() {
    this.provider = new GoogleDriveProvider();
  }

  // ─────────────────────────────────────────────────────────────
  // CONNECTION MANAGEMENT
  // ─────────────────────────────────────────────────────────────

  /**
   * Returns the current Google Drive connection status.
   * Safe to call without authentication — used for status pages.
   */
  async getStatus() {
    return this.provider.getConnectionStatus();
  }

  /**
   * Generates the Google OAuth URL for the Super Admin to authorize.
   */
  generateOAuthUrl() {
    return this.provider.generateAuthUrl();
  }

  /**
   * Handles the OAuth callback: exchanges the code, saves encrypted tokens.
   * 
   * @param {string} code - Authorization code from Google
   * @param {string} userId - Super Admin user ID
   */
  async connectOAuth(code, userId) {
    return this.provider.handleOAuthCallback(code, userId);
  }

  /**
   * Disconnects Google Drive by clearing all tokens.
   */
  async disconnectOAuth() {
    return this.provider.disconnect();
  }

  /**
   * Tests the connection with a real upload/delete cycle.
   */
  async testConnection() {
    return this.provider.testConnection();
  }

  // ─────────────────────────────────────────────────────────────
  // FILE OPERATIONS
  // ─────────────────────────────────────────────────────────────

  /**
   * Uploads a file, saves metadata to MongoDB, and returns the storage record.
   * 
   * @param {Object} params
   * @param {Buffer} params.fileBuffer
   * @param {string} params.originalName
   * @param {string} params.mimeType
   * @param {number} params.size
   * @param {string} params.module - Business module e.g. "members"
   * @param {string} params.logicalFolder - Folder hint e.g. "members", "events"
   * @param {string} [params.entityId]
   * @param {string} [params.userId]
   * @returns {{ success: boolean, message: string, data?: Object }}
   */
  async uploadFile({ fileBuffer, originalName, mimeType, size, module, logicalFolder, entityId, userId }) {
    try {
      await connectToDatabase();

      const canonicalFolder = resolveCanonicalFolder(logicalFolder || module);
      const secureFilename = generateSecureFilename(module, canonicalFolder, originalName);

      let providerResult;
      try {
        providerResult = await this.provider.upload(
          fileBuffer,
          secureFilename,
          mimeType,
          canonicalFolder
        );
      } catch (uploadError) {
        return {
          success: false,
          message: uploadError.message,
          errors: [uploadError.message],
        };
      }

      try {
        const storageRecord = await StorageModel.create({
          originalName,
          storedName: secureFilename,
          mimeType: providerResult.mimeType,
          extension: secureFilename.split(".").pop(),
          size: providerResult.size,
          provider: "google-drive",
          providerFileId: providerResult.providerFileId,
          providerFolderId: providerResult.providerFolderId,
          folder: canonicalFolder,
          publicUrl: providerResult.publicUrl,
          module: module || canonicalFolder,
          entityId: entityId || null,
          uploadedBy: userId || null,
        });

        return {
          success: true,
          message: "File uploaded successfully.",
          data: storageRecord,
        };
      } catch (dbError) {
        // Rollback: delete from Google Drive if MongoDB save fails
        console.error("MongoDB save failed, rolling back Drive upload...", dbError);
        try {
          await this.provider.delete(providerResult.providerFileId);
        } catch (rollbackError) {
          console.error("CRITICAL: Failed to rollback orphaned Drive file:", providerResult.providerFileId);
        }
        throw new Error("Failed to save file metadata to database.");
      }
    } catch (error) {
      console.error("StorageService.uploadFile error:", error);
      return {
        success: false,
        message: error.message || "Failed to upload file.",
        errors: [error.message],
      };
    }
  }

  /**
   * Replaces an existing file in Drive and updates its metadata.
   */
  async replaceFile(storageId, { fileBuffer, mimeType }) {
    try {
      await connectToDatabase();

      const storageRecord = await StorageModel.findById(storageId);
      if (!storageRecord) {
        return { success: false, message: "File metadata not found." };
      }

      const providerResult = await this.provider.replace(
        storageRecord.providerFileId,
        fileBuffer,
        mimeType
      );

      storageRecord.size = providerResult.size;
      storageRecord.mimeType = providerResult.mimeType;
      await storageRecord.save();

      return {
        success: true,
        message: "File replaced successfully.",
        data: storageRecord,
      };
    } catch (error) {
      console.error("StorageService.replaceFile error:", error);
      return { success: false, message: error.message || "Failed to replace file." };
    }
  }

  /**
   * Deletes a file from Google Drive and removes its metadata from MongoDB.
   */
  async deleteFile(storageId) {
    try {
      await connectToDatabase();

      const storageRecord = await StorageModel.findById(storageId);
      if (!storageRecord) {
        return { success: false, message: "File metadata not found." };
      }

      await this.provider.delete(storageRecord.providerFileId);
      await StorageModel.deleteOne({ _id: storageId });

      return {
        success: true,
        message: "File deleted successfully.",
        data: { id: storageId },
      };
    } catch (error) {
      console.error("StorageService.deleteFile error:", error);
      return { success: false, message: error.message || "Failed to delete file." };
    }
  }

  /**
   * Returns a paginated list of storage assets for the Media Library.
   */
  async listFiles({ page = 1, limit = 24, module, search, mimeCategory } = {}) {
    try {
      await connectToDatabase();

      const query = { deletedAt: null };
      if (module && module !== "all") query.module = module;
      if (search) {
        query.$or = [
          { originalName: { $regex: search, $options: "i" } },
          { tags: { $in: [new RegExp(search, "i")] } },
        ];
      }
      if (mimeCategory === "images") query.mimeType = { $regex: "^image/" };
      if (mimeCategory === "documents") query.mimeType = { $not: /^image\// };

      const total = await StorageModel.countDocuments(query);
      const assets = await StorageModel.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

      return {
        success: true,
        data: {
          assets,
          pagination: { total, page, limit, pages: Math.ceil(total / limit) },
        },
      };
    } catch (error) {
      console.error("StorageService.listFiles error:", error);
      return { success: false, message: "Failed to list files." };
    }
  }
}
