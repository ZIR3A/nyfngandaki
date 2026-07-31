"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Map as MapIcon, Users, Award, AlertCircle } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GandakiMap } from "./GandakiMap";



export function DistrictExplorer({ isNepali, className }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const url = "/api/public/districts/explorer";
  const { data: json, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 300000, // 5 minutes cache
  });

  const districts = json?.data || [];
  const selectedSlug = searchParams.get("district") || "all";

  const handleSelect = (slug) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === selectedSlug || slug === "all") {
      params.delete("district");
    } else {
      params.set("district", slug);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (isLoading) {
    return (
      <div className={cn("flex flex-col gap-3", className)}>
        <div className="h-8 w-32 bg-muted rounded-xl animate-pulse mb-3 hidden lg:block" />
        {/* Mobile skeleton chips */}
        <div className="flex lg:hidden overflow-x-auto gap-3 pb-2 scrollbar-hide">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 w-28 bg-muted rounded-full animate-pulse flex-shrink-0" />
          ))}
        </div>
        {/* Desktop skeleton cards */}
        <div className="hidden lg:flex flex-col gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-[70px] w-full bg-muted rounded-2xl animate-pulse border border-border/30" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 bg-destructive/5 border border-destructive/20 rounded-2xl text-center">
        <AlertCircle className="w-8 h-8 text-destructive/80 mx-auto mb-2" />
        <p className="text-sm font-medium text-destructive">{isNepali ? "जिल्लाहरू लोड गर्न सकिएन" : "Failed to load districts"}</p>
        <Button onClick={() => window.location.reload()} variant="outline" size="sm" className="mt-3 border-destructive/20 text-destructive hover:bg-destructive/10">
          {isNepali ? "फेरि प्रयास गर्नुहोस्" : "Retry"}
        </Button>
      </div>
    );
  }

  if (districts.length === 0) {
    return (
      <div className="p-8 border-2 border-dashed border-border rounded-2xl text-center">
        <MapIcon className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
        <p className="text-sm font-medium text-muted-foreground">{isNepali ? "कुनै जिल्ला उपलब्ध छैन" : "No districts available"}</p>
      </div>
    );
  }

  const allItem = {
    _id: "all",
    slug: "all",
    name: { en: "All Districts", np: "सबै जिल्लाहरू" },
    stats: { 
      members: districts.reduce((acc, curr) => acc + (curr.stats?.members || 0), 0),
      officeBearers: districts.reduce((acc, curr) => acc + (curr.stats?.officeBearers || 0), 0)
    }
  };

  const list = [allItem, ...districts];

  return (
    <div className={cn("w-full flex flex-col", className)}>
      <div className="hidden lg:flex items-center gap-2 mb-4 px-2">
        <MapIcon className="w-5 h-5 text-[#1546B0]" />
        <h3 className="font-bold text-[#111827] text-lg">
          {isNepali ? "जिल्ला अन्वेषण" : "District Explorer"}
        </h3>
      </div>
      
      {/* Mobile: Horizontal scroll chips */}
      <div className="flex lg:hidden overflow-x-auto gap-2.5 pb-2 scrollbar-hide -mx-2 px-2 snap-x">
        {list.map((d) => {
          const isSelected = selectedSlug === d.slug;
          return (
            <button
              key={d._id}
              onClick={() => handleSelect(d.slug)}
              className={cn(
                "snap-start flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer",
                isSelected 
                  ? "bg-[#1546B0] text-white shadow-md" 
                  : "bg-white border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {isNepali ? d.name.np : d.name.en}
            </button>
          );
        })}
      </div>

      {/* Desktop: Sidebar Vertical Cards */}
      <div className="hidden lg:flex flex-col gap-2 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
        {list.map((d) => {
          const isSelected = selectedSlug === d.slug;
          const members = d.stats?.members || 0;
          const officeBearers = d.stats?.officeBearers || 0;
          const isAll = d._id === "all";

          return (
            <div
              key={d._id}
              onClick={() => handleSelect(d.slug)}
              className={cn(
                "group relative w-full p-3 rounded-2xl cursor-pointer transition-all duration-200 border flex items-center gap-4",
                isSelected 
                  ? "bg-[#1546B0]/5 border-[#1546B0]/20 shadow-sm" 
                  : "bg-white dark:bg-card border-transparent hover:border-border hover:bg-muted/30"
              )}
            >
              {isSelected && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#1546B0] rounded-r-full" />
              )}
              
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-lg font-bold border",
                isSelected ? "bg-[#1546B0] text-white border-[#1546B0]" : "bg-muted text-muted-foreground border-border/50",
                !isAll && !isSelected && "bg-white"
              )}>
                {isAll ? <MapIcon className="w-6 h-6" /> : (d.name.en.charAt(0))}
              </div>
              
              <div className="flex flex-col flex-1 min-w-0">
                <span className={cn(
                  "font-bold text-[15px] truncate transition-colors", 
                  isSelected ? "text-[#1546B0]" : "text-foreground group-hover:text-primary"
                )}>
                  {isNepali ? d.name.np : d.name.en}
                </span>
                
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1.5 text-[#4B5563]">
                    <Users className="w-3.5 h-3.5" />
                    <span className="text-xs font-semibold">{members}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#4B5563]">
                    <Award className="w-3.5 h-3.5" />
                    <span className="text-xs font-semibold">{officeBearers}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="hidden lg:flex items-center gap-4 mt-6 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        <div className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5" /> <span>{isNepali ? "सदस्यहरू" : "Members"}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5" /> <span>{isNepali ? "पदाधिकारी" : "Office Bearers"}</span>
        </div>
      </div>
    </div>
  );
}
