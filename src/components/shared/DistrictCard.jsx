"use client";

import { useLanguage } from "@/localization/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Map, Users, LayoutTemplate } from "lucide-react";
import Link from "next/link";

export function DistrictCard({ district }) {
  const { language } = useLanguage();

  return (
    <Card className="overflow-hidden bg-surface hover:shadow-md transition-all duration-300 group border hover:border-primary">
      {/* Banner */}
      <div className="w-full h-32 bg-muted relative flex items-center justify-center text-muted-foreground">
        {district.imageUrl ? (
          <img src={district.imageUrl} alt={district.name} className="w-full h-full object-cover" />
        ) : (
          <Map className="w-10 h-10 opacity-30" />
        )}
        {/* Red Overlay Line */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <CardContent className="p-5">
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
          {district.name}
        </h3>
        
        <div className="flex flex-col space-y-2 mb-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="w-4 h-4 mr-2 text-primary" />
            <span>{district.memberCount || 0} Members</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <LayoutTemplate className="w-4 h-4 mr-2 text-primary" />
            <span>{district.committeeCount || 0} Committees</span>
          </div>
        </div>

        <Link href={`/${language}/districts/${district.slug || "#"}`} className="w-full">
          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            Explore District
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
