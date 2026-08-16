import HomeClient from "@/features/home/components/HomeClient";
import { MemberService } from "@/services/MemberService";

export const dynamic = "force-dynamic";
import { SiteSettingService } from "@/services/SiteSettingService";
import { ActivityService } from "@/services/ActivityService";
import { eventService } from "@/features/events/services/eventService";
import { ResourceService } from "@/services/ResourceService";
import { DistrictService } from "@/services/DistrictService";
import { BannerService } from "@/services/BannerService";
import { LeadershipMessageService } from "@/services/LeadershipMessageService";

export async function generateMetadata({ params }) {
  const { locale = "en" } = await params;
  
  return {
    title: locale === "np" 
      ? "राष्ट्रिय युवा संघ नेपाल | गण्डकी प्रदेश" 
      : "NYFN Gandaki | National Youth Federation Nepal – Gandaki Province",
    description: locale === "np"
      ? "राष्ट्रिय युवा संघ नेपाल (NYFN) गण्डकी प्रदेशको आधिकारिक वेबसाइट। यहाँ हाम्रा गतिविधिहरू, कार्यक्रमहरू, र सदस्यहरूको जानकारी पाउनुहोस्।"
      : "Official Website of National Youth Federation Nepal (NYFN) Gandaki Province. Discover our activities, events, and members.",
    alternates: {
      canonical: `https://nyfngandaki.org/${locale}`,
      languages: {
        en: "https://nyfngandaki.org/en",
        ne: "https://nyfngandaki.org/np",
        "x-default": "https://nyfngandaki.org/en",
      },
    },
    openGraph: {
      title: locale === "np" ? "राष्ट्रिय युवा संघ नेपाल | गण्डकी प्रदेश" : "NYFN Gandaki | National Youth Federation Nepal",
      description: locale === "np" ? "राष्ट्रिय युवा संघ नेपाल (NYFN) गण्डकी प्रदेशको आधिकारिक वेबसाइट" : "Official Website of National Youth Federation Nepal (NYFN) Gandaki Province",
      url: `https://nyfngandaki.org/${locale}`,
      type: "website",
      siteName: "NYFN Gandaki",
      locale: locale === "np" ? "ne_NP" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: locale === "np" ? "राष्ट्रिय युवा संघ नेपाल | गण्डकी प्रदेश" : "NYFN Gandaki | National Youth Federation Nepal",
      description: locale === "np" ? "राष्ट्रिय युवा संघ नेपाल (NYFN) गण्डकी प्रदेशको आधिकारिक वेबसाइट" : "Official Website of National Youth Federation Nepal (NYFN) Gandaki Province",
    }
  };
}

export default async function Home({ params }) {
  // Extract locale from params or default to 'en'
  const { locale = "en" } = await params;
  
  let featuredMembers = [];
  let settings = null;
  let chairperson = null;
  let activities = [];
  let events = [];
  let resources = [];
  let districts = [];
  let banners = [];
  let leadershipMessages = [];

  try {
    const rawMembers = await MemberService.getFeaturedMembers(6);
    featuredMembers = JSON.parse(JSON.stringify(rawMembers));

    const rawChairperson = await MemberService.getChairperson();
    if (rawChairperson) {
      chairperson = JSON.parse(JSON.stringify(rawChairperson));
    }

    const rawSettings = await SiteSettingService.getSettings();
    if (rawSettings) {
      settings = JSON.parse(JSON.stringify(rawSettings));
    }

    const rawActivities = await ActivityService.getFeaturedActivities(3);
    activities = JSON.parse(JSON.stringify(rawActivities));

    const rawEvents = await eventService.getEvents({ limit: 4, sort: '-startDate' });
    events = JSON.parse(JSON.stringify(rawEvents.events));

    const rawResources = await ResourceService.getFeaturedResources(4);
    resources = JSON.parse(JSON.stringify(rawResources));

    const rawDistricts = await DistrictService.getAll();
    districts = JSON.parse(JSON.stringify(rawDistricts));

    const rawBanners = await BannerService.getActive();
    banners = JSON.parse(JSON.stringify(rawBanners));

    const rawLeadershipMessages = await LeadershipMessageService.getHomepageMessages();
    leadershipMessages = JSON.parse(JSON.stringify(rawLeadershipMessages));

  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://nyfngandaki.org/#website",
      "url": `https://nyfngandaki.org/${locale}`,
      "name": locale === "np" ? "राष्ट्रिय युवा संघ नेपाल | गण्डकी प्रदेश" : "NYFN Gandaki | National Youth Federation Nepal",
      "inLanguage": locale === "np" ? "ne" : "en"
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://nyfngandaki.org/#organization",
      "name": "National Youth Federation Nepal (NYFN) Gandaki",
      "alternateName": "NYFN Gandaki",
      "url": "https://nyfngandaki.org",
      "logo": "https://nyfngandaki.org/logo.png",
      "description": "National Youth Federation Nepal (NYFN) Gandaki Province Committee."
    }
  ];

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient 
        locale={locale} 
        settings={settings}
        chairperson={chairperson}
        featuredMembers={featuredMembers} 
        activities={activities}
        events={events}
        resources={resources}
        districts={districts}
        banners={banners}
        leadershipMessages={leadershipMessages}
      />
    </main>
  );
}
