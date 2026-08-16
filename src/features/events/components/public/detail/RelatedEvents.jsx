"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";

export default function RelatedEvents({ events, locale }) {
  if (!events || events.length === 0) return null;
  
  const isNepali = locale === "np";

  return (
    <section className="mt-20 pt-16 border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          {isNepali ? "सम्बन्धित कार्यक्रमहरू" : "Related Events"}
        </h2>
        <Link href={`/${locale}/events`} className="text-[#1546B0] hover:text-blue-700 font-semibold transition-colors">
          {isNepali ? "सबै हेर्नुहोस्" : "View All"}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => {
          const title = isNepali && event.title?.np ? event.title.np : event.title?.en;
          const venue = isNepali && event.venue?.name?.np ? event.venue.name.np : event.venue?.name?.en;
          const startDate = event.startDate ? new Date(event.startDate).toLocaleDateString(isNepali ? 'ne-NP' : 'en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }) : null;

          return (
            <Link key={event._id} href={`/${locale}/events/${event.slug}`} className="group bg-white dark:bg-[#111827] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-[4/3] relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                {event.coverImage ? (
                  <Image 
                    src={event.coverImage}
                    alt={title || "Event Image"}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    No Image Available
                  </div>
                )}
                
                {event.category && (
                  <div className="absolute top-4 left-4">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
                      style={{ backgroundColor: event.category.color + '20', color: event.category.color }}
                    >
                      {isNepali && event.category.name?.np ? event.category.name.np : event.category.name?.en}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-2 mb-4 group-hover:text-[#1546B0] transition-colors">
                  {title}
                </h3>
                
                <div className="space-y-2">
                  {startDate && (
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                      <Calendar className="w-4 h-4 shrink-0 text-[#1546B0]" />
                      <span className="truncate">{startDate}</span>
                    </div>
                  )}
                  {venue && (
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                      <MapPin className="w-4 h-4 shrink-0 text-red-500" />
                      <span className="truncate">{venue}</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
