/**
 * Google Drive Folder IDs mapping
 * These are logical folders mapped to Google Drive Folder IDs defined in environment variables.
 */

export const FOLDER_IDS = {
  ROOT: process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID,
  
  // Members
  "members/profile": process.env.GOOGLE_DRIVE_MEMBER_PROFILE_FOLDER_ID,
  "members/cover": process.env.GOOGLE_DRIVE_MEMBER_COVER_FOLDER_ID,
  
  // Homepage
  "homepage/hero": process.env.GOOGLE_DRIVE_HERO_FOLDER_ID,
  "homepage/chairman": process.env.GOOGLE_DRIVE_CHAIRMAN_FOLDER_ID,
  
  // Districts
  "districts/cover": process.env.GOOGLE_DRIVE_DISTRICT_FOLDER_ID,
  
  // Events
  "events/banner": process.env.GOOGLE_DRIVE_EVENT_FOLDER_ID,
  "events/images": process.env.GOOGLE_DRIVE_EVENT_FOLDER_ID, // Mapping to same for now
  
  // Organization
  "organization/logo": process.env.GOOGLE_DRIVE_DOCUMENT_FOLDER_ID,
  "organization/documents": process.env.GOOGLE_DRIVE_DOCUMENT_FOLDER_ID,
  
  // Resources
  "resources/pdf": process.env.GOOGLE_DRIVE_RESOURCE_FOLDER_ID,
  "resources/images": process.env.GOOGLE_DRIVE_RESOURCE_FOLDER_ID,
  
  // Default/Temp
  "temp": process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID
};
