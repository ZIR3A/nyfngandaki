import mongoose from "mongoose";

/**
 * StorageConfig Model
 * 
 * Singleton document that holds the organization's Google Drive OAuth credentials.
 * Only ONE record exists in this collection (provider: "google-drive").
 * 
 * Tokens are encrypted at rest using AES-256-GCM via src/lib/encryption.js.
 * Never expose raw token values to the client.
 */
const storageConfigSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      required: true,
      default: "google-drive",
      unique: true,
    },
    isConnected: {
      type: Boolean,
      default: false,
    },
    // Encrypted OAuth tokens (AES-256-GCM)
    refreshToken: {
      type: String,
      default: null,
    },
    accessToken: {
      type: String,
      default: null,
    },
    accessTokenExpiry: {
      type: Date,
      default: null,
    },
    // Connected account info
    connectedEmail: {
      type: String,
      default: null,
    },
    connectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    connectedAt: {
      type: Date,
      default: null,
    },
    // Drive folder structure cache — avoids repeated Drive API calls
    // Format: { "members": "1AbCdEfG...", "events": "2HiJkLmN..." }
    folderCache: {
      type: Map,
      of: String,
      default: {},
    },
    // Health tracking
    lastUploadAt: {
      type: Date,
      default: null,
    },
    lastTestAt: {
      type: Date,
      default: null,
    },
    lastError: {
      type: String,
      default: null,
    },
    totalUploads: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const StorageConfig =
  mongoose.models.StorageConfig ||
  mongoose.model("StorageConfig", storageConfigSchema);

export default StorageConfig;
