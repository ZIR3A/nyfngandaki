import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import EventStatusBadge from "./EventStatusBadge";

export default function FeaturedEventCard({ event, locale = "en" }) {
  if (!event) return null;

  const isNepali = locale === "np";
  const title = isNepali && event.title?.np ? event.title.np : event.title?.en;
  const description = isNepali && event.description?.np ? event.description.np : event.description?.en;
  const venueName = isNepali && event.venue?.name?.np ? event.venue.name.np : event.venue?.name?.en;
  
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = event.startDate 
    ? new Date(event.startDate).toLocaleDateString(isNepali ? 'ne-NP' : 'en-US', dateOptions)
    : "TBA";

  return (
    <div className="group relative bg-white dark:bg-[#0A0F1C] rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl border border-slate-200 dark:border-slate-800 transition-all duration-500 flex flex-col lg:flex-row min-h-[400px]">
      
      {/* Image Side */}
      <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        {event.coverImage ? (
          <Image 
            src={event.coverImage} 
            alt={title || "Featured Event"} 
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out" 
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
            <span className="text-slate-400 font-medium">No Image Available</span>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-6 left-6 z-10">
          <EventStatusBadge status={event.status} />
        </div>
      </div>

      {/* Content Side */}
      <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center relative">
        <div className="absolute top-0 right-0 p-8 text-9xl font-black text-slate-50 dark:text-slate-900/50 -z-10 select-none">
          {new Date(event.startDate).getDate().toString().padStart(2, '0')}
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-[#1546B0] dark:text-blue-400" />
            </div>
            <span>{formattedDate}</span>
          </div>
          {venueName && (
             <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                 <MapPin className="w-4 h-4 text-[#1546B0] dark:text-blue-400" />
               </div>
               <span>{venueName}</span>
             </div>
          )}
        </div>

        <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
          {title}
        </h2>
        
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 line-clamp-3 leading-relaxed">
          {description}
        </p>
        
        <div className="mt-auto pt-4 flex items-center gap-4">
          <Link 
            href={`/${locale}/events/${event.slug}`}
            className="inline-flex items-center justify-center px-8 py-4 bg-[#1546B0] text-white rounded-xl font-bold shadow-md hover:bg-blue-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            {isNepali ? "थप विवरण हेर्नुहोस्" : "Explore Event"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
