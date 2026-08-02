import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import EventStatusBadge from "./EventStatusBadge";
import EventCategoryChip from "./EventCategoryChip";

export default function EventCard({ event, locale = "en" }) {
  if (!event) return null;

  const isNepali = locale === "np";
  const title = isNepali && event.title?.np ? event.title.np : event.title?.en;
  const description = isNepali && event.description?.np ? event.description.np : event.description?.en;
  const venueName = isNepali && event.venue?.name?.np ? event.venue.name.np : event.venue?.name?.en;
  
  // Format date
  const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = event.startDate 
    ? new Date(event.startDate).toLocaleDateString(isNepali ? 'ne-NP' : 'en-US', dateOptions)
    : "TBA";

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        {event.coverImage ? (
          <Image 
            src={event.coverImage} 
            alt={title || "Event Image"} 
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-slate-400 dark:text-slate-500 font-medium">No Image</span>
          </div>
        )}
        
        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <EventStatusBadge status={event.status} />
        </div>
        {event.category && (
          <div className="absolute top-4 right-4 z-10">
             <EventCategoryChip category={isNepali && event.category?.name?.np ? event.category.name.np : event.category?.name?.en} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#1546B0] dark:text-blue-400" />
            <span>{formattedDate}</span>
          </div>
          {venueName && (
             <div className="flex items-center gap-1.5 truncate">
               <MapPin className="w-4 h-4 text-[#1546B0] dark:text-blue-400" />
               <span className="truncate">{venueName}</span>
             </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-[#1546B0] dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-2 flex-grow">
          {description}
        </p>
        
        <Link 
          href={`/${locale}/events/${event.slug}`}
          className="inline-flex items-center mt-auto text-[#1546B0] dark:text-blue-400 font-bold hover:text-blue-800 dark:hover:text-blue-300 transition-colors group/link cursor-pointer"
        >
          {isNepali ? "थप विवरण हेर्नुहोस्" : "View Details"}
          <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
