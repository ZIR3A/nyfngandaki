import { notFound } from "next/navigation";
import { eventService } from "@/features/events/services/eventService";
import { getDictionary } from "@/localization/dictionaries";

import { Calendar, CheckCircle, List } from "lucide-react";

// Components
import InternalPageHero from "@/components/shared/InternalPageHero";
import FeaturedEventCard from "@/features/events/components/public/FeaturedEventCard";
import EventCard from "@/features/events/components/public/EventCard";
import EventControls from "@/features/events/components/public/EventControls";
import LoadMoreEvents from "@/features/events/components/public/LoadMoreEvents";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: locale === "np" ? "कार्यक्रमहरू | NYFN Gandaki" : "Events | NYFN Gandaki",
    description: locale === "np" 
      ? "राष्ट्रिय युवा संघ नेपाल गण्डकी प्रदेशद्वारा आयोजित आगामी र विगतका कार्यक्रमहरू अन्वेषण गर्नुहोस्।" 
      : "Explore upcoming and past events organized by NYFN Gandaki Province.",
    alternates: {
      canonical: `https://nyfngandaki.org/${locale}/events`,
      languages: {
        en: `https://nyfngandaki.org/en/events`,
        ne: `https://nyfngandaki.org/np/events`,
        "x-default": `https://nyfngandaki.org/en/events`,
      },
    },
    openGraph: {
      title: locale === "np" ? "कार्यक्रमहरू | NYFN Gandaki" : "Events | NYFN Gandaki",
      description: locale === "np" 
        ? "राष्ट्रिय युवा संघ नेपाल गण्डकी प्रदेशद्वारा आयोजित आगामी र विगतका कार्यक्रमहरू अन्वेषण गर्नुहोस्।" 
        : "Explore upcoming and past events organized by NYFN Gandaki Province.",
      url: `https://nyfngandaki.org/${locale}/events`,
      type: "website",
      siteName: "NYFN Gandaki",
      locale: locale === "np" ? "ne_NP" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: locale === "np" ? "कार्यक्रमहरू | NYFN Gandaki" : "Events | NYFN Gandaki",
      description: locale === "np" 
        ? "राष्ट्रिय युवा संघ नेपाल गण्डकी प्रदेशद्वारा आयोजित आगामी र विगतका कार्यक्रमहरू अन्वेषण गर्नुहोस्।" 
        : "Explore upcoming and past events organized by NYFN Gandaki Province.",
    }
  };
}

export default async function EventsPage({ params, searchParams }) {
  const { locale } = await params;
  const validLocales = ["en", "np"];
  
  if (!validLocales.includes(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const resolvedSearchParams = await searchParams;
  
  const search = resolvedSearchParams?.search || "";
  const status = resolvedSearchParams?.status || "";
  const categorySlug = resolvedSearchParams?.category || "";
  
  // We use Promise.all to fetch multiple sections concurrently for max performance
  const [gridData, featuredEventsData, categoriesData, stats] = await Promise.all([
    // 1. Grid Data (Paginated, Filtered)
    eventService.getEvents({
      page: 1,
      limit: 6,
      search,
      status,
      category: categorySlug,
      isPublic: true // Only fetch published events if we add that flag in the future
    }),
    
    // 2. Featured Event (Always try to get the most recent Upcoming/Ongoing event)
    eventService.getEvents({
      page: 1,
      limit: 1,
      status: "Upcoming", 
      // If we had an explicit 'isFeatured' flag we would query it here. 
      // For now we just get the newest upcoming event.
    }),
    
    // 3. Categories for the filter dropdown
    eventService.getCategories(),
    
    // 4. Global Event Stats
    eventService.getEventStats()
  ]);

  const events = JSON.parse(JSON.stringify(gridData.events));
  const pagination = gridData.pagination;
  const featuredEvent = featuredEventsData.events[0] ? JSON.parse(JSON.stringify(featuredEventsData.events[0])) : null;
  const rawCategories = Array.isArray(categoriesData) ? categoriesData : (categoriesData?.categories || []);
  const categories = JSON.parse(JSON.stringify(rawCategories));
  
  const statsPills = [
    {
      value: stats.total,
      label: locale === "np" ? "कुल कार्यक्रम" : "Total Events",
      icon: <List className="w-5 h-5" />,
      color: "blue"
    },
    {
      value: stats.upcoming,
      label: locale === "np" ? "आगामी कार्यक्रम" : "Upcoming Events",
      icon: <Calendar className="w-5 h-5" />,
      color: "amber"
    },
    {
      value: stats.completed,
      label: locale === "np" ? "सम्पन्न कार्यक्रम" : "Completed Events",
      icon: <CheckCircle className="w-5 h-5" />,
      color: "green"
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": locale === "np" ? "गृहपृष्ठ" : "Home",
        "item": `https://nyfngandaki.org/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": locale === "np" ? "कार्यक्रमहरू" : "Events",
        "item": `https://nyfngandaki.org/${locale}/events`
      }
    ]
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0A0F1C]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <InternalPageHero 
        title={locale === "np" ? "हाम्रा कार्यक्रमहरू" : "Our Events"}
        subtitle={locale === "np" 
          ? "राष्ट्रिय युवा संघ नेपाल, गण्डकी प्रदेश कमिटीद्वारा आयोजित कार्यक्रम तथा गतिविधिहरू।" 
          : "Discover upcoming youth summits, community services, and activities across Gandaki Province."}
        breadcrumbItems={[
          { label: locale === "np" ? "गृहपृष्ठ" : "Home", href: `/${locale}` },
          { label: locale === "np" ? "कार्यक्रमहरू" : "Events" }
        ]}
        label={locale === "np" ? "संलग्न र सशक्त" : "ENGAGE & EMPOWER"}
        statsPills={statsPills}
        isNepali={locale === "np"}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-24">
        
        {/* Featured Event Section */}
        {featuredEvent && !search && !status && !categorySlug && (
          <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="mb-8">
              <h2 className="text-sm font-bold tracking-widest text-[#1546B0] dark:text-blue-400 uppercase mb-2">
                {locale === "np" ? "विशेष कार्यक्रम" : "Featured Event"}
              </h2>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                {locale === "np" ? "नछुटाउनुहोस्" : "Don't Miss This"}
              </h3>
            </div>
            <FeaturedEventCard event={featuredEvent} locale={locale} />
          </section>
        )}

        {/* All Events Section */}
        <section id="events-grid">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-[#1546B0] dark:text-blue-400 uppercase mb-2">
                {locale === "np" ? "कार्यक्रम सूची" : "Events Directory"}
              </h2>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                {locale === "np" ? "सबै कार्यक्रमहरू" : "Explore All Events"}
              </h3>
            </div>
            
            {/* Filter Controls */}
            <div className="w-full lg:w-auto">
              <EventControls categories={categories} locale={locale} dictionaries={dict.events?.controls} />
            </div>
          </div>

          {/* Grid */}
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventCard key={event._id} event={event} locale={locale} />
              ))}
              
              {/* Infinite Scroll / Load More Client Component */}
              <LoadMoreEvents 
                initialPage={pagination.page}
                totalPages={pagination.totalPages}
                searchParams={{ search, status, category: categorySlug }}
                locale={locale}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 px-4 text-center bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="w-24 h-24 mb-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <span className="text-4xl">📅</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {locale === "np" ? "कुनै कार्यक्रम भेटिएन" : "No events found"}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md">
                {locale === "np" 
                  ? "तपाईंको खोजीसँग मेल खाने कुनै कार्यक्रमहरू फेला परेनन्। कृपया अर्को फिल्टर प्रयास गर्नुहोस्।" 
                  : "We couldn't find any events matching your current filters. Try adjusting your search criteria."}
              </p>
            </div>
          )}
        </section>



      </div>
    </main>
  );
}
