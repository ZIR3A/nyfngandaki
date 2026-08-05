import { auth } from "@/auth";
import { StorageService } from "@/modules/storage/services/storage.service";
import { StorageSettingsPanel } from "@/features/storage/components/StorageSettingsPanel";

export const metadata = {
  title: "Storage Settings | NYFN Admin",
  description: "Manage Google Drive connection and storage configuration.",
};

export default async function StorageSettingsPage() {
  const session = await auth();
  const isSuperAdmin = session?.user?.role === "Super Admin";

  // Pre-fetch status server-side for instant display
  let initialStatus = null;
  try {
    const service = new StorageService();
    const status = await service.getStatus();
    initialStatus = JSON.parse(JSON.stringify(status));
  } catch (e) {
    console.error("Failed to pre-fetch storage status:", e);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Storage Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Configure the organization&apos;s Google Drive connection used for all file uploads.
        </p>
      </div>

      <StorageSettingsPanel isSuperAdmin={isSuperAdmin} initialStatus={initialStatus} />
    </div>
  );
}
