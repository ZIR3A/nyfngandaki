import connectToDatabase from "@/lib/mongodb";
import Banner from "@/models/Banner";
import { resolveAssets } from "@/modules/storage/helpers/resolver.helper";

const BANNER_ASSET_MAPPING = [
  { idField: 'imageId', urlField: 'imageUrl', assetField: 'imageAsset' }
];

export class BannerService {
  /**
   * Get all banners (for admin)
   */
  static async getAll() {
    await connectToDatabase();
    const banners = await Banner.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return resolveAssets(JSON.parse(JSON.stringify(banners)), BANNER_ASSET_MAPPING);
  }

  /**
   * Get all active banners (for public homepage)
   */
  static async getActive() {
    await connectToDatabase();
    const banners = await Banner.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();
    return resolveAssets(JSON.parse(JSON.stringify(banners)), BANNER_ASSET_MAPPING);
  }

  /**
   * Get a single banner by ID
   */
  static async getById(id) {
    await connectToDatabase();
    const banner = await Banner.findById(id).lean();
    if (!banner) return null;
    return resolveAssets(JSON.parse(JSON.stringify(banner)), BANNER_ASSET_MAPPING);
  }

  /**
   * Create a new banner
   */
  static async create(data) {
    await connectToDatabase();
    const banner = new Banner(data);
    await banner.save();
    return JSON.parse(JSON.stringify(banner.toObject()));
  }

  /**
   * Update an existing banner
   */
  static async update(id, data) {
    await connectToDatabase();
    const banner = await Banner.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
    if (!banner) throw new Error("Banner not found");
    return JSON.parse(JSON.stringify(banner));
  }

  /**
   * Delete a banner
   */
  static async delete(id) {
    await connectToDatabase();
    const banner = await Banner.findByIdAndDelete(id).lean();
    if (!banner) throw new Error("Banner not found");
    return JSON.parse(JSON.stringify(banner));
  }
}
