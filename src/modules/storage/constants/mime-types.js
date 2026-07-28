/**
 * Allowed MIME types and extensions for the Storage Module
 */

export const ALLOWED_MIME_TYPES = {
  images: [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/svg+xml"
  ],
  documents: [
    "application/pdf"
  ],
  videos: [
    "video/mp4",
    "video/quicktime" // .mov
  ]
};

export const ALLOWED_EXTENSIONS = {
  images: ["jpg", "jpeg", "png", "webp", "svg"],
  documents: ["pdf"],
  videos: ["mp4", "mov"]
};

export const MAX_FILE_SIZES = {
  images: 10 * 1024 * 1024,   // 10 MB
  documents: 25 * 1024 * 1024, // 25 MB
  videos: 200 * 1024 * 1024    // 200 MB
};
