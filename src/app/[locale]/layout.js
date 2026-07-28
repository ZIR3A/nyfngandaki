import { LanguageProvider } from "@/localization/LanguageContext";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SiteSettingService } from "@/services/SiteSettingService";

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  
  let settings = null;
  try {
    const rawSettings = await SiteSettingService.getSettings();
    if (rawSettings) {
      rawSettings._id = rawSettings._id.toString();
      settings = rawSettings;
    }
  } catch (error) {
    console.error("Error fetching site settings for layout:", error);
  }

  return (
    <LanguageProvider initialLocale={locale || "en"}>
      <PublicLayout settings={settings}>
        {children}
      </PublicLayout>
    </LanguageProvider>
  );
}
