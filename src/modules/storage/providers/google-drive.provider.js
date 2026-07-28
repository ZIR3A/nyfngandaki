import { google } from "googleapis";
import { Readable } from "stream";
import { StorageProvider } from "./storage.provider";
import connectToDatabase from "@/lib/mongodb";
import StorageConfig from "../models/storage-config.model";
import { decrypt, encrypt } from "@/lib/encryption";

/**
 * Google Drive Provider V3
 *
 * Authentication: Reads the encrypted refresh token from MongoDB (StorageConfig).
 * This separates Storage authentication from CRM authentication entirely.
 * 
 * The Super Admin connects the organization's Google Drive once via the CRM.
 * All subsequent uploads from any CRM user use the saved refresh token automatically.
 */
export class GoogleDriveProvider extends StorageProvider {
  constructor() {
    super();
    this._driveClient = null;
    this._oauth2Client = null;
  }

  // ─────────────────────────────────────────────────────────────
  // AUTHENTICATION
  // ─────────────────────────────────────────────────────────────

  /**
   * Returns an authenticated Google Drive client.
   * Reads the encrypted refresh token from MongoDB.
   * Automatically refreshes the access token when expired.
   */
  async authenticate() {
    await connectToDatabase();

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri =
      process.env.GOOGLE_REDIRECT_URI ||
      "http://localhost:3000/api/storage/oauth/callback";

    if (!clientId || !clientSecret) {
      throw new Error(
        "Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in environment variables."
      );
    }

    const config = await StorageConfig.findOne({ provider: "google-drive" });

    if (!config || !config.isConnected || !config.refreshToken) {
      throw new Error(
        "Google Drive is not connected. A Super Admin must connect it via Settings → Storage."
      );
    }

    // Reuse existing oauth2Client if already created this request
    if (!this._oauth2Client) {
      this._oauth2Client = new google.auth.OAuth2(
        clientId,
        clientSecret,
        redirectUri
      );
    }

    const decryptedRefreshToken = decrypt(config.refreshToken);

    // Check if we have a cached, valid access token
    const now = Date.now();
    const fiveMinBuffer = 5 * 60 * 1000;
    const tokenExpiry = config.accessTokenExpiry
      ? new Date(config.accessTokenExpiry).getTime()
      : 0;

    if (config.accessToken && tokenExpiry > now + fiveMinBuffer) {
      // Token is still valid
      this._oauth2Client.setCredentials({
        access_token: decrypt(config.accessToken),
        refresh_token: decryptedRefreshToken,
        expiry_date: tokenExpiry,
      });
    } else {
      // Token expired or missing — refresh it
      this._oauth2Client.setCredentials({
        refresh_token: decryptedRefreshToken,
      });

      try {
        const { credentials } = await this._oauth2Client.refreshAccessToken();
        // Cache the new access token in DB (encrypted)
        await StorageConfig.updateOne(
          { provider: "google-drive" },
          {
            $set: {
              accessToken: encrypt(credentials.access_token),
              accessTokenExpiry: new Date(credentials.expiry_date),
            },
          }
        );
        this._oauth2Client.setCredentials(credentials);
      } catch (err) {
        console.error("Failed to refresh Google Drive access token:", err);
        throw new Error(
          "Google Drive token refresh failed. Please reconnect via Settings → Storage."
        );
      }
    }

    this._driveClient = google.drive({
      version: "v3",
      auth: this._oauth2Client,
    });

    return this._driveClient;
  }

  // ─────────────────────────────────────────────────────────────
  // CONNECTION MANAGEMENT
  // ─────────────────────────────────────────────────────────────

  /**
   * Returns the current connection status from MongoDB.
   */
  async getConnectionStatus() {
    await connectToDatabase();
    const config = await StorageConfig.findOne({ provider: "google-drive" })
      .populate("connectedBy", "name email")
      .lean();

    if (!config) {
      return {
        isConnected: false,
        connectedEmail: null,
        connectedBy: null,
        connectedAt: null,
        lastUploadAt: null,
        lastTestAt: null,
        lastError: null,
        totalUploads: 0,
      };
    }

    return {
      isConnected: config.isConnected,
      connectedEmail: config.connectedEmail,
      connectedBy: config.connectedBy,
      connectedAt: config.connectedAt,
      lastUploadAt: config.lastUploadAt,
      lastTestAt: config.lastTestAt,
      lastError: config.lastError,
      totalUploads: config.totalUploads || 0,
      updatedAt: config.updatedAt,
    };
  }

  /**
   * Generates the Google OAuth authorization URL.
   */
  generateAuthUrl() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri =
      process.env.GOOGLE_REDIRECT_URI ||
      "http://localhost:3000/api/storage/oauth/callback";

    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri
    );

    return oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
      prompt: "consent", // Always request refresh token
    });
  }

  /**
   * Exchanges the OAuth authorization code for tokens and saves them.
   * Called by the OAuth callback route.
   * 
   * @param {string} code - The authorization code from Google
   * @param {string} userId - The Super Admin's user ID
   */
  async handleOAuthCallback(code, userId) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri =
      process.env.GOOGLE_REDIRECT_URI ||
      "http://localhost:3000/api/storage/oauth/callback";

    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri
    );

    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.refresh_token) {
      throw new Error(
        "Google did not return a refresh token. Please revoke access at myaccount.google.com/permissions and try connecting again."
      );
    }

    // Get the email address of the connected account
    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();
    const connectedEmail = userInfo.data.email;

    await connectToDatabase();
    await StorageConfig.findOneAndUpdate(
      { provider: "google-drive" },
      {
        $set: {
          isConnected: true,
          refreshToken: encrypt(tokens.refresh_token),
          accessToken: tokens.access_token ? encrypt(tokens.access_token) : null,
          accessTokenExpiry: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
          connectedEmail,
          connectedBy: userId,
          connectedAt: new Date(),
          lastError: null,
          folderCache: {}, // Reset folder cache on reconnect
        },
      },
      { upsert: true, new: true }
    );

    return { connectedEmail };
  }

  /**
   * Disconnects Google Drive by clearing all tokens from the DB.
   */
  async disconnect() {
    await connectToDatabase();
    await StorageConfig.findOneAndUpdate(
      { provider: "google-drive" },
      {
        $set: {
          isConnected: false,
          refreshToken: null,
          accessToken: null,
          accessTokenExpiry: null,
          connectedEmail: null,
          connectedBy: null,
          connectedAt: null,
          folderCache: {},
        },
      },
      { upsert: true }
    );
    this._driveClient = null;
    this._oauth2Client = null;
  }

  // ─────────────────────────────────────────────────────────────
  // FOLDER MANAGEMENT
  // ─────────────────────────────────────────────────────────────

  /**
   * Ensures a subfolder exists under the root Drive folder.
   * Creates it if missing, then caches the ID in StorageConfig.
   * 
   * @param {string} folderName - Logical name e.g. "members", "events"
   * @returns {string} The Google Drive folder ID
   */
  async ensureFolder(folderName) {
    await connectToDatabase();
    const config = await StorageConfig.findOne({ provider: "google-drive" });

    // Check the in-DB cache first
    const cached = config?.folderCache?.get?.(folderName);
    if (cached) return cached;

    const rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;
    if (!rootFolderId) {
      throw new Error("GOOGLE_DRIVE_ROOT_FOLDER_ID is not set in environment variables.");
    }

    const drive = await this.authenticate();

    // Search for existing folder with this name
    const searchRes = await drive.files.list({
      q: `name='${folderName}' and '${rootFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: "files(id, name)",
      spaces: "drive",
    });

    let folderId;
    if (searchRes.data.files && searchRes.data.files.length > 0) {
      folderId = searchRes.data.files[0].id;
    } else {
      // Create the folder
      const createRes = await drive.files.create({
        requestBody: {
          name: folderName,
          mimeType: "application/vnd.google-apps.folder",
          parents: [rootFolderId],
        },
        fields: "id",
      });
      folderId = createRes.data.id;

      // Make the folder public so uploaded files inherit access
      await drive.permissions.create({
        fileId: folderId,
        requestBody: { role: "reader", type: "anyone" },
      });
    }

    // Persist to cache
    await StorageConfig.updateOne(
      { provider: "google-drive" },
      { $set: { [`folderCache.${folderName}`]: folderId } }
    );

    return folderId;
  }

  // ─────────────────────────────────────────────────────────────
  // CORE FILE OPERATIONS
  // ─────────────────────────────────────────────────────────────

  /**
   * Uploads a file to Google Drive
   */
  async upload(fileBuffer, filename, mimeType, folderName) {
    const drive = await this.authenticate();
    const folderId = await this.ensureFolder(folderName || "general");

    const stream = new Readable();
    stream.push(fileBuffer);
    stream.push(null);

    try {
      const response = await drive.files.create({
        requestBody: {
          name: filename,
          parents: [folderId],
        },
        media: { mimeType, body: stream },
        fields: "id, name, mimeType, size",
      });

      const fileId = response.data.id;
      await this.makePublic(fileId);
      const publicUrl = this.buildPublicUrl(fileId, response.data.mimeType);

      // Track upload count
      await connectToDatabase();
      await StorageConfig.updateOne(
        { provider: "google-drive" },
        {
          $set: { lastUploadAt: new Date(), lastError: null },
          $inc: { totalUploads: 1 },
        }
      );

      return {
        providerFileId: fileId,
        providerFolderId: folderId,
        publicUrl,
        size: parseInt(response.data.size || "0", 10),
        mimeType: response.data.mimeType,
      };
    } catch (error) {
      // Record the error
      await connectToDatabase();
      await StorageConfig.updateOne(
        { provider: "google-drive" },
        { $set: { lastError: error.message } }
      );
      console.error("Google Drive Upload Error:", error);
      throw new Error("Failed to upload file to Google Drive.");
    }
  }

  /**
   * Replaces the content of an existing file in Google Drive
   */
  async replace(providerFileId, fileBuffer, mimeType) {
    const drive = await this.authenticate();

    const stream = new Readable();
    stream.push(fileBuffer);
    stream.push(null);

    try {
      const response = await drive.files.update({
        fileId: providerFileId,
        media: { mimeType, body: stream },
        fields: "id, mimeType, size",
      });

      return {
        providerFileId: response.data.id,
        size: parseInt(response.data.size || "0", 10),
        mimeType: response.data.mimeType,
      };
    } catch (error) {
      console.error("Google Drive Replace Error:", error);
      throw new Error("Failed to replace file in Google Drive.");
    }
  }

  /**
   * Deletes a file from Google Drive
   */
  async delete(providerFileId) {
    const drive = await this.authenticate();
    try {
      await drive.files.delete({ fileId: providerFileId });
      return true;
    } catch (error) {
      console.error("Google Drive Delete Error:", error);
      throw new Error("Failed to delete file from Google Drive.");
    }
  }

  /**
   * Test the connection by uploading and immediately deleting a tiny test file.
   */
  async testConnection() {
    const testContent = Buffer.from("NYFN Gandaki Storage Test - " + new Date().toISOString());
    const testFilename = `.storage_test_${Date.now()}.txt`;
    const rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;

    const drive = await this.authenticate();

    const stream = new Readable();
    stream.push(testContent);
    stream.push(null);

    const response = await drive.files.create({
      requestBody: {
        name: testFilename,
        parents: [rootFolderId],
      },
      media: { mimeType: "text/plain", body: stream },
      fields: "id",
    });

    const fileId = response.data.id;

    // Clean up
    await drive.files.delete({ fileId });

    await connectToDatabase();
    await StorageConfig.updateOne(
      { provider: "google-drive" },
      { $set: { lastTestAt: new Date(), lastError: null } }
    );

    return { success: true, message: "Test upload and delete successful." };
  }

  // ─────────────────────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────────────────────

  /**
   * Makes a file publicly readable
   */
  async makePublic(fileId) {
    const drive = await this.authenticate();
    try {
      await drive.permissions.create({
        fileId,
        requestBody: { role: "reader", type: "anyone" },
      });
      return true;
    } catch (error) {
      // Non-fatal — parent folder public permission is sufficient
      console.warn("Could not set file-level public permission:", error.message);
      return false;
    }
  }

  /**
   * Builds the appropriate public URL for a Google Drive file.
   * Uses lh3.googleusercontent.com for images (avoids cookie-blocking issues).
   */
  buildPublicUrl(fileId, mimeType = "") {
    if (mimeType.startsWith("image/")) {
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
    return `https://drive.google.com/file/d/${fileId}/view`;
  }

  // Backwards compat alias
  async getPublicUrl(fileId, mimeType) {
    return this.buildPublicUrl(fileId, mimeType);
  }
}
