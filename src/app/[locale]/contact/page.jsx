import { getDictionary } from "@/localization/dictionaries";
import { SiteSettingService } from "@/services/SiteSettingService";
import InternalPageHero from "@/components/shared/InternalPageHero";
import { ContactForm } from "@/features/contact/components/public/ContactForm";
import { ContactInformation } from "@/features/contact/components/public/ContactInformation";
import { ContactIntro } from "@/features/contact/components/public/ContactIntro";
import { OfficeLocation } from "@/features/contact/components/public/OfficeLocation";
import { ContactClosingCTA } from "@/features/contact/components/public/ContactClosingCTA";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: `${dict.contact.title} | NYFN Gandaki`,
    description: dict.contact.subtitle,
  };
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const settings = await SiteSettingService.getSettings();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <InternalPageHero 
        title={dict.contact.intro.heading}
        subtitle={dict.contact.intro.description}
        label={dict.contact.intro.eyebrow}
        breadcrumbItems={[
          { label: dict.navigation.home, href: `/${locale}` },
          { label: dict.contact.title }
        ]}
        isNepali={locale === "np"}
      />

      <ContactIntro dict={dict} settings={settings} locale={locale} />

      <div className="container mx-auto px-4 py-4 md:py-8 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 md:p-8">
            <div className="mb-8">
              <div className="text-xs font-extrabold text-primary-red uppercase tracking-widest mb-3">
                {dict.contact.form.eyebrow}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                {dict.contact.form.heading}
              </h2>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
                {dict.contact.form.description}
              </p>
            </div>
            <ContactForm dict={dict} />
          </div>

          {/* Right Column: Information & Map */}
          <div className="lg:col-span-5 space-y-8">
            <ContactInformation dict={dict} settings={settings} locale={locale} />
          </div>
        </div>

        {/* Dedicated Office Location Section */}
        <div className="mt-12 md:mt-24">
          <OfficeLocation dict={dict} settings={settings} locale={locale} />
        </div>

        {/* Closing CTA */}
        <ContactClosingCTA dict={dict} settings={settings} />
      </div>
    </div>
  );
}
