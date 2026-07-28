/**
 * Abstract Storage Provider
 * 
 * Defines the contract that all storage providers must implement.
 * Business modules interact with this interface, ensuring provider independence.
 */
export class StorageProvider {
  /**
   * Uploads a file to the storage provider
   * @param {Buffer} fileBuffer - The binary file data
   * @param {string} filename - The generated unique filename
   * @param {string} mimeType - The file MIME type
   * @param {string} folderId - The provider-specific folder ID
   * @returns {Promise<Object>} { providerFileId, providerFolderId, publicUrl, size, mimeType }
   */
  async upload(fileBuffer, filename, mimeType, folderId) {
    throw new Error("Method 'upload()' must be implemented.");
  }

  /**
   * Replaces an existing file in the storage provider
   * @param {string} providerFileId - The provider's file ID
   * @param {Buffer} fileBuffer - The new binary file data
   * @param {string} mimeType - The new file MIME type
   * @returns {Promise<Object>} { providerFileId, providerFolderId, publicUrl, size, mimeType }
   */
  async replace(providerFileId, fileBuffer, mimeType) {
    throw new Error("Method 'replace()' must be implemented.");
  }

  /**
   * Deletes a file from the storage provider
   * @param {string} providerFileId - The provider's file ID
   * @returns {Promise<boolean>} Success status
   */
  async delete(providerFileId) {
    throw new Error("Method 'delete()' must be implemented.");
  }

  async move(providerFileId, newFolderId) {
    throw new Error("Method 'move()' must be implemented.");
  }

  async copy(providerFileId, destinationFolderId) {
    throw new Error("Method 'copy()' must be implemented.");
  }

  async rename(providerFileId, newName) {
    throw new Error("Method 'rename()' must be implemented.");
  }

  async find(providerFileId) {
    throw new Error("Method 'find()' must be implemented.");
  }

  async get(providerFileId) {
    throw new Error("Method 'get()' must be implemented.");
  }

  async list(folderId) {
    throw new Error("Method 'list()' must be implemented.");
  }

  async makePublic(providerFileId) {
    throw new Error("Method 'makePublic()' must be implemented.");
  }

  async getPublicUrl(providerFileId) {
    throw new Error("Method 'getPublicUrl()' must be implemented.");
  }
}
