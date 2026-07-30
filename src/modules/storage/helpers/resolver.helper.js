import StorageModel from "../models/storage.model";

/**
 * Resolves Storage IDs to public URLs for a given object or array of objects.
 * 
 * @param {Object|Array} data - The data object(s) containing Storage IDs
 * @param {Array<Object>} fieldMappings - Array of mappings, e.g., [{ idField: 'profilePhotoId', urlField: 'profilePhoto' }]
 * @returns {Object|Array} - The modified data with resolved URLs
 */
export async function resolveAssets(data, fieldMappings) {
  if (!data) return data;

  const isArray = Array.isArray(data);
  const items = isArray ? data : [data];
  
  if (items.length === 0) return data;

  // Collect all storage IDs that need resolving
  const storageIds = new Set();
  items.forEach(item => {
    fieldMappings.forEach(mapping => {
      const idData = item[mapping.idField];
      if (Array.isArray(idData)) {
        idData.forEach(id => {
          if (id) storageIds.add(id.toString());
        });
      } else if (idData) {
        storageIds.add(idData.toString());
      }
    });
  });

  if (storageIds.size === 0) return data;

  // Fetch all corresponding storage records at once
  const storageRecords = await StorageModel.find({ 
    _id: { $in: Array.from(storageIds) },
    deletedAt: null 
  }).lean();

  // Create a fast lookup map
  const storageMap = {};
  storageRecords.forEach(record => {
    let url = record.publicUrl;
    if (url && url.includes('drive.google.com/uc')) {
      const match = url.match(/[?&]id=([^&]+)/);
      if (match && match[1]) {
        url = `https://lh3.googleusercontent.com/d/${match[1]}`;
      }
    }
    storageMap[record._id.toString()] = url;
  });

  // Inject URLs back into the items
  items.forEach(item => {
    fieldMappings.forEach(mapping => {
      const idData = item[mapping.idField];
      if (Array.isArray(idData)) {
        item[mapping.urlField] = idData.map(id => storageMap[id.toString()] || null).filter(Boolean);
      } else if (idData && storageMap[idData.toString()]) {
        item[mapping.urlField] = storageMap[idData.toString()];
      } else {
        item[mapping.urlField] = null; // Default if not found
      }
    });
  });

  return isArray ? items : items[0];
}
