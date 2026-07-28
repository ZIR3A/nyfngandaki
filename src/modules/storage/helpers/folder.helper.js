/**
 * Folder Helper V3
 *
 * Resolves logical folder names (e.g. "members", "events") to Google Drive folder IDs.
 * Folder IDs are auto-created on first use and cached in the StorageConfig document.
 *
 * This replaces the old env-var-based FOLDER_IDS approach entirely.
 * No more GOOGLE_DRIVE_MEMBER_PROFILE_FOLDER_ID etc. in .env.local.
 */

/**
 * Maps a logical module/folder string to a standardized folder name.
 * All variations collapse to a canonical subfolder name.
 * 
 * @param {string} logicalFolder - Raw folder string from upload request e.g. "members", "temp"
 * @returns {string} Canonical folder name
 */
export function resolveCanonicalFolder(logicalFolder) {
  if (!logicalFolder) return "general";
  const f = logicalFolder.toLowerCase().trim();

  if (f.startsWith("member")) return "members";
  if (f.startsWith("event")) return "events";
  if (f.startsWith("activit")) return "activities";
  if (f.startsWith("district")) return "districts";
  if (f.startsWith("resource")) return "resources";
  if (f.startsWith("homepage") || f.startsWith("home")) return "homepage";
  if (f.startsWith("organization") || f.startsWith("org")) return "organization";
  if (f === "temp" || f === "all") return "temp";

  return f; // Use as-is for unknown folders
}
