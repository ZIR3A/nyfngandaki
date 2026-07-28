import { validateStorageFile } from "../validations/storage.validation";

/**
 * Parses and validates a multipart/form-data request in Next.js.
 * Acts as a replacement for Express Multer.
 * 
 * @param {Request} request 
 * @returns {Promise<Object>} { fileBuffer, filename, mimeType, size, module, folder, entityId, errors }
 */
export async function parseUploadRequest(request) {
  try {
    const formData = await request.formData();
    
    const file = formData.get("file");
    const module = formData.get("module");
    const folder = formData.get("folder");
    const entityId = formData.get("entityId");
    
    if (!file || typeof file === "string") {
      return { errors: ["No valid file provided in request."] };
    }

    if (!module || !folder) {
      return { errors: ["Missing required fields: module, folder."] };
    }

    const filename = file.name;
    const mimeType = file.type;
    const size = file.size;

    // Determine category based on logical folder mapping (simplified, defaults to images)
    // You could map this more strictly based on the 'module' or 'folder'
    let category = 'images';
    if (folder.includes('document') || folder.includes('pdf')) category = 'documents';
    if (folder.includes('video')) category = 'videos';

    const validation = validateStorageFile(filename, mimeType, size, category);
    
    if (!validation.isValid) {
      return { errors: validation.errors };
    }

    // Convert Web File API to Node.js Buffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    return {
      fileBuffer,
      filename,
      mimeType,
      size,
      module,
      folder,
      entityId,
      errors: null
    };

  } catch (error) {
    console.error("Parse Upload Request Error:", error);
    return { errors: ["Failed to parse multipart/form-data request."] };
  }
}
