"use client";

import { useLanguage } from "@/localization/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";

export function EventCard({ event }) {
  const { language } = useLanguage();

  return (
    <Card className="overflow-hidden bg-surface hover:shadow-md transition-all duration-300 group border hover:border-primary flex flex-col h-full relative">
      
      {/* Date Badge */}
      <div className="absolute top-4 right-4 z-10 bg-accent text-accent-foreground rounded-lg p-2 text-center shadow-md min-w-[3rem]">
        <div className="text-xs font-semibold uppercase">{event.month}</div>
        <div className="text-xl font-bold leading-none">{event.day}</div>
      </div>

      {/* Cover Image */}
      <div className="w-full h-48 bg-muted relative overflow-hidden text-muted-foreground">
        {event.imageUrl ? (
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            Event Image
          </div>
        )}
      </div>
      
      <CardContent className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 pr-10">
          {event.title}
        </h3>
        
        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarDays className="w-4 h-4 mr-2 text-primary shrink-0" />
            <span>{event.dateFull}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2 text-primary shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-1">
          {event.description}
        </p>

        <Link href={`/${language}/events/${event.slug || "#"}`} className="w-full block">
          <Button className="w-full group-hover:bg-primary-hover transition-colors">
            View Event
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
