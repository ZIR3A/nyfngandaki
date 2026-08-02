import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import EventStatusBadge from "../EventStatusBadge";

export default function EventDetailHero({ event, locale }) {
  const isNepali = locale === "np";
  const title = isNepali && event.title?.np ? event.title.np : event.title?.en;

  return (
    <div className="relative w-full bg-slate-900 pt-28 pb-16 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {event.coverImage ? (
          <>
            <Image 
              src={event.coverImage} 
              alt={title || "Event Cover"} 
              fill
              className="object-cover object-center" 
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C]/90 via-[#0A0F1C]/50 to-[#0A0F1C]/20" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1546B0]/20 to-[#0A0F1C]" />
        )}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end">
        
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-300 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Link href={`/${locale}`} className="hover:text-white transition-colors">
            {isNepali ? "गृहपृष्ठ" : "Home"}
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-500" />
          <Link href={`/${locale}/events`} className="hover:text-white transition-colors">
            {isNepali ? "कार्यक्रमहरू" : "Events"}
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-500" />
          <span className="text-white truncate max-w-[200px] sm:max-w-xs">{title}</span>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-3 mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <EventStatusBadge status={event.status} />
          
          {event.category && (
            <div 
              className="px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm border"
              style={{ 
                backgroundColor: `${event.category.color}30`, 
                color: event.category.color,
                borderColor: `${event.category.color}50` 
              }}
            >
              {isNepali && event.category.name?.np ? event.category.name.np : event.category.name?.en}
            </div>
          )}

          {event.isFeatured && (
            <div className="px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/50 backdrop-blur-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              {isNepali ? "विशेष कार्यक्रम" : "Featured"}
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight mb-8 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          {title}
        </h1>
        
      </div>
    </div>
  );
}
