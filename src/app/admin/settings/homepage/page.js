import { HomepageSettingsForm } from "@/features/settings/components/HomepageSettingsForm";
import { SiteSettingService } from "@/services/SiteSettingService";

export const metadata = {
  title: "Homepage Settings | NYFN Admin",
};

export default async function AdminHomepageSettingsPage() {
  const settings = await SiteSettingService.getSettings();

  // Convert ObjectId to string for client component serialization
  if (settings) {
    if (settings._id) settings._id = settings._id.toString();
    if (settings.chairpersonImageId) settings.chairpersonImageId = settings.chairpersonImageId.toString();
    if (settings.heroImageId) settings.heroImageId = settings.heroImageId.toString();
    if (settings.logoId) settings.logoId = settings.logoId.toString();
  }

  return (
    <div>
      <HomepageSettingsForm initialData={settings} />
    </div>
  );
}
