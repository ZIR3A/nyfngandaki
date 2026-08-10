import { ContactSettingsForm } from "@/features/settings/components/ContactSettingsForm";
import { SiteSettingService } from "@/services/SiteSettingService";

export const metadata = {
  title: "Contact Settings | NYFN Admin",
};

export default async function AdminContactSettingsPage() {
  const settings = await SiteSettingService.getSettings();

  // Convert ObjectId to string for client component serialization
  if (settings) {
    if (settings._id) settings._id = settings._id.toString();
    if (settings.heroImageId) settings.heroImageId = settings.heroImageId.toString();
    if (settings.logoId) settings.logoId = settings.logoId.toString();
    if (settings.aboutImageId) settings.aboutImageId = settings.aboutImageId.toString();
  }

  return (
    <div>
      <ContactSettingsForm initialData={settings} />
    </div>
  );
}
