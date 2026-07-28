import { ALLOWED_EXTENSIONS, ALLOWED_MIME_TYPES, MAX_FILE_SIZES } from "../constants/mime-types";

/**
 * Validates a file before upload
 * @param {string} filename 
 * @param {string} mimeType 
 * @param {number} size 
 * @param {string} expectedCategory - 'images', 'documents', or 'videos'
 */
export const validateStorageFile = (filename, mimeType, size, expectedCategory = 'images') => {
  const errors = [];

  // Check category config exists
  if (!ALLOWED_MIME_TYPES[expectedCategory]) {
    errors.push(`Invalid expected file category: ${expectedCategory}`);
    return { isValid: false, errors };
  }

  // Validate Size
  const maxSize = MAX_FILE_SIZES[expectedCategory];
  if (size > maxSize) {
    errors.push(`File exceeds maximum size of ${maxSize / (1024 * 1024)}MB`);
  }

  // Validate Extension
  const parts = filename.split('.');
  const ext = parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
  if (!ALLOWED_EXTENSIONS[expectedCategory].includes(ext)) {
    errors.push(`Invalid file extension: .${ext}. Allowed: ${ALLOWED_EXTENSIONS[expectedCategory].join(', ')}`);
  }

  // Validate MIME Type
  if (!ALLOWED_MIME_TYPES[expectedCategory].includes(mimeType)) {
    errors.push(`Invalid MIME type: ${mimeType}`);
  }

  // Reject executable or dangerous types just in case
  const disallowedExtensions = ['exe', 'bat', 'cmd', 'php', 'js', 'sh', 'dll', 'apk', 'iso'];
  if (disallowedExtensions.includes(ext)) {
    errors.push('Security error: File type is strictly disallowed.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
