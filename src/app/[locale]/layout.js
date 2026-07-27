import { LanguageProvider } from "@/localization/LanguageContext";
import { PublicLayout } from "@/components/layout/PublicLayout";

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  
  return (
    <LanguageProvider initialLocale={locale || "en"}>
      <PublicLayout>
        {children}
      </PublicLayout>
    </LanguageProvider>
  );
}
