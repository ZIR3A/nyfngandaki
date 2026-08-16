import { notFound } from "next/navigation";
import { eventService } from "@/features/events/services/eventService";

import EventDetailHero from "@/features/events/components/public/detail/EventDetailHero";
import EventScrollSpy from "@/features/events/components/public/detail/EventScrollSpy";
import EventGallery from "@/features/events/components/public/detail/EventGallery";
import EventInfoCard from "@/features/events/components/public/detail/EventInfoCard";
import RelatedEvents from "@/features/events/components/public/detail/RelatedEvents";

// Dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  
  try {
    const event = await eventService.getEventBySlug(slug);
    if (!event) return { title: "Event Not Found" };
    
    const title = locale === "np" && event.title?.np ? event.title.np : event.title?.en;
    const description = locale === "np" && event.description?.np ? event.description.np : event.description?.en;
    const summary = locale === "np" && event.summary?.np ? event.summary.np : event.summary?.en;
    
    return {
      title: `${event.seoTitle || title} | NYFN Gandaki Events`,
      description: (summary || description)?.substring(0, 160),
      alternates: {
        canonical: `https://nyfngandaki.org/${locale}/events/${slug}`,
        languages: {
          en: `https://nyfngandaki.org/en/events/${slug}`,
          ne: `https://nyfngandaki.org/np/events/${slug}`,
          "x-default": `https://nyfngandaki.org/en/events/${slug}`,
        },
      },
      openGraph: {
        title: `${event.seoTitle || title} | NYFN Gandaki Events`,
        description: (summary || description)?.substring(0, 160),
        url: `https://nyfngandaki.org/${locale}/events/${slug}`,
        type: "article",
        siteName: "NYFN Gandaki",
        locale: locale === "np" ? "ne_NP" : "en_US",
        images: event.coverImage ? [event.coverImage] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: `${event.seoTitle || title} | NYFN Gandaki Events`,
        description: (summary || description)?.substring(0, 160),
        images: event.coverImage ? [event.coverImage] : [],
      }
    };
  } catch (error) {
    return { title: "Events | NYFN Gandaki" };
  }
}

export default async function EventDetailPage({ params }) {
  const { slug, locale } = await params;
  const validLocales = ["en", "np"];
  
  if (!validLocales.includes(locale)) {
    notFound();
  }

  let event = null;
  let relatedEvents = [];
  try {
    event = await eventService.getEventBySlug(slug);
    if (event) {
      relatedEvents = await eventService.getRelatedEvents(event.category?._id, event._id, 3);
    }
  } catch (error) {
    console.error("Failed to load event:", error);
  }

  if (!event) {
    notFound();
  }

  // Define scroll spy sections dynamically based on available data
  const scrollSections = [
    { id: "overview", labelEn: "Overview", labelNp: "विवरण" },
  ];

  const galleryImages = event.media?.filter(m => m.type === 'image') || [];
  const videos = event.media?.filter(m => m.type === 'video') || [];
  const documents = event.media?.filter(m => m.type === 'document') || [];

  if (galleryImages.length > 0 || videos.length > 0 || documents.length > 0) {
    scrollSections.push({ id: "gallery", labelEn: "Media & Documents", labelNp: "ग्यालरी र कागजात" });
  }

  const isNepali = locale === "np";
  const title = isNepali && event.title?.np ? event.title.np : event.title?.en;
  const description = isNepali && event.description?.np ? event.description.np : event.description?.en;
  const summary = isNepali && event.summary?.np ? event.summary.np : event.summary?.en;

  // We need a clean object for client components (removing Mongoose properties)
  const safeEvent = JSON.parse(JSON.stringify(event));
  const safeRelatedEvents = JSON.parse(JSON.stringify(relatedEvents));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": isNepali ? "गृहपृष्ठ" : "Home",
          "item": `https://nyfngandaki.org/${locale}`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": isNepali ? "कार्यक्रमहरू" : "Events",
          "item": `https://nyfngandaki.org/${locale}/events`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": title,
          "item": `https://nyfngandaki.org/${locale}/events/${slug}`
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": title,
      "description": description,
      "url": `https://nyfngandaki.org/${locale}/events/${slug}`,
      "image": event.coverImage || "https://nyfngandaki.org/logo.png",
      "startDate": event.startDate || new Date().toISOString(),
      "endDate": event.endDate || event.startDate || new Date().toISOString(),
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": event.location || (isNepali ? "गण्डकी प्रदेश" : "Gandaki Province"),
        "address": {
          "@type": "PostalAddress",
          "addressLocality": event.location || (isNepali ? "गण्डकी" : "Gandaki"),
          "addressCountry": "NP"
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": "National Youth Federation Nepal (NYFN) Gandaki",
        "url": "https://nyfngandaki.org"
      }
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0A0F1C]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <EventDetailHero event={safeEvent} locale={locale} />
      
      {/* Sticky Scroll Spy Navigation */}
      <EventScrollSpy sections={scrollSections} locale={locale} />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          
          {/* Main Content Area (Left) */}
          <div className="flex-1 min-w-0 space-y-20">
            
            {/* Overview Section */}
            <section id="overview" className="scroll-mt-[150px]">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8">
                {isNepali ? "कार्यक्रम विवरण" : "Event Overview"}
              </h2>
              
              {summary && (
                <div className="mb-8 text-xl text-slate-700 dark:text-slate-300 font-medium leading-relaxed border-l-4 border-[#1546B0] pl-6 py-2">
                  {summary}
                </div>
              )}
              
              <div className="prose prose-lg dark:prose-invert prose-blue max-w-none text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
                {description}
              </div>
              
              {event.tags && event.tags.length > 0 && (
                <div className="mt-12 flex flex-wrap gap-2">
                  {event.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-sm font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </section>

            {/* Gallery & Video Section */}
            {(galleryImages.length > 0 || videos.length > 0 || documents.length > 0) && (
              <section id="gallery" className="scroll-mt-[150px]">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8">
                  {isNepali ? "मिडिया र कागजातहरू" : "Media & Documents"}
                </h2>
                <div className="space-y-12">
                  {(galleryImages.length > 0 || videos.length > 0) && (
                    <EventGallery images={galleryImages} videos={videos} locale={locale} />
                  )}
                  
                  {documents.length > 0 && (
                    <div className="flex flex-col gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {isNepali ? "डाउनलोडहरू" : "Downloads"}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {documents.map((doc, idx) => (
                          <a 
                            key={idx} 
                            href={doc.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-[#1546B0] hover:shadow-md transition-all group"
                          >
                            <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center shrink-0">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-slate-900 dark:text-white truncate">
                                {locale === "np" && doc.title?.np ? doc.title.np : (doc.title?.en || "Document")}
                              </p>
                              <p className="text-sm text-[#1546B0] font-medium mt-0.5 group-hover:underline">View / Download PDF</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Related Events Section */}
            {safeRelatedEvents.length > 0 && (
              <RelatedEvents events={safeRelatedEvents} locale={locale} />
            )}

          </div>
          
          {/* Sidebar Area (Right) */}
          <div className="w-full lg:w-[400px] shrink-0">
            <EventInfoCard event={safeEvent} locale={locale} />
          </div>

        </div>
      </div>
    </main>
  );
}
