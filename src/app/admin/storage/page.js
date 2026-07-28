import { StorageService } from "@/modules/storage/services/storage.service";
import { MediaLibraryPageClient } from "@/features/storage/components/MediaLibraryPageClient";

export const metadata = {
  title: "Media Library | NYFN Admin",
  description: "Browse, search, and manage all uploaded assets.",
};

export default async function MediaLibraryPage({ searchParams }) {
  const sp = await searchParams;
  const page = parseInt(sp?.page || "1", 10);
  const module = sp?.module || "all";
  const search = sp?.search || "";
  const mimeCategory = sp?.type || "";

  let initialData = { assets: [], pagination: { total: 0, page: 1, limit: 24, pages: 0 } };

  try {
    const service = new StorageService();
    // Check connection first
    const status = await service.getStatus();
    if (status.isConnected) {
      const result = await service.listFiles({ page, module, search, mimeCategory, limit: 24 });
      if (result.success) initialData = result.data;
    }
  } catch (e) {
    console.error("Media Library load error:", e);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Media Library</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          All uploaded assets across the organization. Reuse existing files to avoid duplicates.
        </p>
      </div>
      <MediaLibraryPageClient initialData={initialData} />
    </div>
  );
}
