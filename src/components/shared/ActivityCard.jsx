"use client";

import { useLanguage } from "@/localization/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import Link from "next/link";

export function ActivityCard({ activity }) {
  const { language } = useLanguage();

  return (
    <Card className="overflow-hidden bg-surface hover:shadow-md transition-all duration-300 group border hover:border-primary flex flex-col h-full">
      {/* Cover Image */}
      <div className="w-full h-48 bg-muted relative overflow-hidden text-muted-foreground">
        {activity.imageUrl ? (
          <img 
            src={activity.imageUrl} 
            alt={activity.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            Image Placeholder
          </div>
        )}
      </div>
      
      <CardContent className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {activity.title}
        </h3>
        
        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2 text-primary shrink-0" />
            <span>{activity.date}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2 text-primary shrink-0" />
            <span className="truncate">{activity.location}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-1">
          {activity.description}
        </p>

        {activity.stats && (
          <div className="flex items-center gap-4 border-t pt-4 mb-4">
            {activity.stats.map((stat, i) => (
              <div key={i} className="flex items-center text-xs font-semibold text-primary">
                <Users className="w-3 h-3 mr-1" />
                {stat}
              </div>
            ))}
          </div>
        )}

        <Link href={`/${language}/activities/${activity.slug || "#"}`} className="w-full">
          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
