import { PageHeader } from "@/components/shared/PageHeader";
import { EventCard } from "@/components/shared/EventCard";
import { Calendar } from "lucide-react";
import connectToDatabase from "@/lib/mongodb";
import Event from "@/models/Event";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: locale === "np" ? "कार्यक्रमहरू | NYFN Gandaki" : "Events & Programs | NYFN Gandaki",
    description: locale === "np" ? "हाम्रा आगामी अभियानहरू, सम्मेलनहरू र सामुदायिक गतिविधिहरू बारे जान्नुहोस्।" : "Discover our upcoming campaigns, conferences, and community activities.",
  };
}

export default async function EventsPage({ params }) {
  const { locale } = await params;
  const isNepali = locale === "np";

  await connectToDatabase();
  const dbEvents = await Event.find().sort({ date: 1 }).lean();

  const now = new Date();
  
  const formattedEvents = dbEvents.map(e => {
    const eventDate = new Date(e.date);
    const month = eventDate.toLocaleString(locale === 'np' ? 'ne-NP' : 'en-US', { month: 'short' });
    const day = eventDate.getDate();
    
    return {
      id: e.slug || e._id.toString(),
      slug: e.slug,
      title: isNepali && e.title.np ? e.title.np : e.title.en,
      description: isNepali && e.description.np ? e.description.np : e.description.en,
      location: isNepali && e.venue.np ? e.venue.np : e.venue.en,
      dateFull: eventDate.toLocaleDateString(locale === 'np' ? 'ne-NP' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      month,
      day,
      imageUrl: e.coverImage,
      rawDate: eventDate
    };
  });

  const upcomingEvents = formattedEvents.filter(e => e.rawDate >= now);
  const pastEvents = formattedEvents.filter(e => e.rawDate < now).reverse();

  return (
    <main className="min-h-screen bg-background">
      <PageHeader 
        title={isNepali ? "कार्यक्रमहरू" : "Events & Programs"}
        subtitle={isNepali ? "हाम्रा आगामी अभियानहरू, सम्मेलनहरू र सामुदायिक गतिविधिहरू बारे जान्नुहोस्।" : "Discover our upcoming campaigns, conferences, and community activities."}
        breadcrumbItems={[
          { label: isNepali ? "गृहपृष्ठ" : "Home", href: `/${locale}` },
          { label: isNepali ? "कार्यक्रमहरू" : "Events", href: `/${locale}/events`, active: true }
        ]}
      />

      <section className="py-12 lg:py-24 bg-[#F8FAFC] dark:bg-gray-900 transition-colors">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          
          {/* Upcoming Events */}
          <div className="mb-24">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-[#1546B0] animate-pulse"></span>
                {isNepali ? "आगामी कार्यक्रमहरू" : "Upcoming Events"}
              </h2>
            </div>
            
            {upcomingEvents.length === 0 ? (
              <div className="text-center py-20 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-[20px] bg-white dark:bg-gray-800 flex flex-col items-center justify-center">
                <Calendar className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-lg font-bold mb-2 text-gray-700 dark:text-gray-300">
                  {isNepali ? "कुनै आगामी कार्यक्रम छैन" : "No Upcoming Events"}
                </h3>
                <p className="max-w-md">
                  {isNepali ? "हामीसँग अहिले कुनै निर्धारित कार्यक्रमहरू छैनन्। कृपया पछि जाँच गर्नुहोस्।" : "We don't have any scheduled events at the moment. Please check back later."}
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  {isNepali ? "विगतका कार्यक्रमहरू" : "Past Events"}
                </h2>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 opacity-90 hover:opacity-100 transition-opacity duration-300">
                {pastEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}
