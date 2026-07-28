import crypto from 'crypto';

/**
 * Generates a secure and unique filename.
 * Pattern: module_type_date_random.ext
 * Example: members_profile_20260728_a81f2.webp
 */
export const generateSecureFilename = (module, logicalFolder, originalName) => {
  // Extract extension safely
  const parts = originalName.split('.');
  const ext = parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
  
  // Extract type from logicalFolder (e.g. "members/profile" -> "profile")
  const type = logicalFolder ? logicalFolder.split('/').pop() : 'file';
  
  // Generate date string YYYYMMDD
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
  
  // Generate random 5-character hex string
  const randomStr = crypto.randomBytes(3).toString('hex').substring(0, 5);
  
  // Clean module string
  const cleanModule = module ? module.replace(/[^a-z0-9]/gi, '').toLowerCase() : 'unknown';
  
  return `${cleanModule}_${type}_${dateStr}_${randomStr}${ext ? '.' + ext : ''}`;
};
