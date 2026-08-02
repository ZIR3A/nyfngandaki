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

  if (galleryImages.length > 0 || videos.length > 0) {
    scrollSections.push({ id: "gallery", labelEn: "Gallery", labelNp: "ग्यालरी" });
  }

  const isNepali = locale === "np";
  const title = isNepali && event.title?.np ? event.title.np : event.title?.en;
  const description = isNepali && event.description?.np ? event.description.np : event.description?.en;
  const summary = isNepali && event.summary?.np ? event.summary.np : event.summary?.en;

  // We need a clean object for client components (removing Mongoose properties)
  const safeEvent = JSON.parse(JSON.stringify(event));
  const safeRelatedEvents = JSON.parse(JSON.stringify(relatedEvents));

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0A0F1C]">
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
            {(galleryImages.length > 0 || videos.length > 0) && (
              <section id="gallery" className="scroll-mt-[150px]">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8">
                  {isNepali ? "ग्यालरी" : "Media Gallery"}
                </h2>
                <div className="space-y-12">
                  {videos.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {videos.map((vid, idx) => (
                        <div key={idx} className="aspect-video rounded-2xl overflow-hidden bg-slate-900">
                          <iframe 
                            src={vid.url} 
                            className="w-full h-full border-0" 
                            allowFullScreen
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {galleryImages.length > 0 && (
                    <EventGallery images={galleryImages} locale={locale} />
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
