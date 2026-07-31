"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import * as d3 from "d3-geo";
import { Map, Users, AlertCircle } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { cn } from "@/lib/utils";

export function GandakiMap({ isNepali, className, showLabels = false, selectedDistrict, onSelect }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSelected = searchParams.get("district") || "all";
  const selectedSlug = selectedDistrict !== undefined ? selectedDistrict : urlSelected;
  
  const [hoveredNode, setHoveredNode] = useState(null);
  const containerRef = useRef(null);

  const url = "/api/public/districts/explorer";
  const { data: statsJson, error: statsError, isLoading: statsLoading } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 300000,
  });

  const { data: geoJson, error: geoError, isLoading: geoLoading } = useSWR("/gandaki-districts.geojson", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 3600000, // cache geojson for 1 hour
  });

  const loading = statsLoading || geoLoading;
  const error = statsError || geoError || (statsJson && !statsJson.success);

  const geoData = geoJson;
  
  const districtStats = useMemo(() => {
    const statsMap = {};
    if (statsJson && statsJson.success) {
      statsJson.data.forEach(d => {
        statsMap[d.slug] = d;
      });
    }
    return statsMap;
  }, [statsJson]);

  // Compute D3 paths only when geoData changes
  const mapPaths = useMemo(() => {
    if (!geoData) return [];
    
    // Define an internal coordinate system; SVG viewBox will handle responsive scaling
    const width = 800;
    const height = 600;

    const projection = d3.geoMercator().fitSize([width, height], geoData);
    const pathGenerator = d3.geoPath().projection(projection);

    return geoData.features.map(feature => {
      const slug = feature.properties.DISTRICT.toLowerCase();
      
      // Calculate centroid for label placement
      let centroid = [0, 0];
      try {
        centroid = pathGenerator.centroid(feature);
      } catch (e) {
        // Fallback if centroid fails
      }
      
      return {
        slug,
        d: pathGenerator(feature),
        centroid,
        feature
      };
    });
  }, [geoData]);

  const handleSelect = (slug) => {
    if (onSelect) {
      onSelect(slug === selectedSlug ? null : slug);
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    if (slug === selectedSlug || slug === "all") {
      params.delete("district");
    } else {
      params.set("district", slug);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (loading) {
    return (
      <div className={cn("w-full aspect-[4/3] bg-muted animate-pulse rounded-[2rem]", className)} />
    );
  }

  if (error || !geoData) {
    return (
      <div className={cn("w-full aspect-[4/3] bg-destructive/5 border border-destructive/20 rounded-[2rem] flex flex-col items-center justify-center p-6 text-center text-destructive", className)}>
        <AlertCircle className="w-8 h-8 mb-2 opacity-80" />
        <p className="font-semibold">{isNepali ? "नक्सा लोड गर्न सकिएन" : "Failed to load interactive map"}</p>
      </div>
    );
  }

  return (
    <div 
      className={cn("w-full h-full relative group", className)}
      ref={containerRef}
    >
      <svg 
        viewBox="0 0 800 600" 
        className="w-full h-full drop-shadow-sm outline-none"
        preserveAspectRatio="xMidYMid meet"
        role="application"
        aria-label="Interactive Map of Gandaki Province"
      >
        <g strokeLinejoin="round" strokeLinecap="round">
          {mapPaths.map(({ slug, d, centroid }) => {
            const isSelected = selectedSlug === slug;
            const isHovered = hoveredNode?.slug === slug;
            const stats = districtStats[slug];
            const nameNp = stats?.name?.np || slug.charAt(0).toUpperCase() + slug.slice(1);
            const nameEn = stats?.name?.en || slug.charAt(0).toUpperCase() + slug.slice(1);
            const displayName = isNepali ? nameNp : nameEn;
            
            // Adjust fill colors to be more like a soft blue map, darker on hover/select
            const baseFill = "fill-[#D1E0F5]";
            const hoverFill = "fill-[#9CBFF0]";
            const selectedFill = "fill-[#1546B0]";
            
            return (
              <g key={slug}>
                <path
                  d={d}
                  tabIndex={0}
                  role="button"
                  aria-label={displayName}
                  onClick={() => handleSelect(slug)}
                  onMouseEnter={(e) => setHoveredNode({ slug, x: e.clientX, y: e.clientY })}
                  onMouseMove={(e) => setHoveredNode({ slug, x: e.clientX, y: e.clientY })}
                  onMouseLeave={() => setHoveredNode(null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelect(slug);
                    }
                  }}
                  className={cn(
                    "cursor-pointer transition-all duration-300 outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isSelected 
                      ? `${selectedFill} stroke-primary-foreground stroke-[2px] drop-shadow-md z-10` 
                      : `${isHovered ? hoverFill : baseFill} stroke-white stroke-[1.5px]`
                  )}
                  style={{
                    transformOrigin: 'center',
                    transform: isHovered && !isSelected ? 'scale(1.01)' : 'scale(1)',
                  }}
                />
                
                {showLabels && !isNaN(centroid[0]) && !isNaN(centroid[1]) && (
                  <text
                    x={centroid[0]}
                    y={centroid[1]}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    className={cn(
                      "text-[12px] font-bold pointer-events-none transition-colors duration-300",
                      isSelected ? "fill-white" : "fill-[#1E293B]"
                    )}
                  >
                    {displayName}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Floating Tooltip */}
      {hoveredNode && !showLabels && (
        <div 
          className="fixed z-50 pointer-events-none bg-popover border border-border/80 shadow-xl rounded-xl p-3 flex flex-col gap-1 min-w-[140px] animate-in fade-in zoom-in-95 duration-200"
          style={{
            left: hoveredNode.x + 16,
            top: hoveredNode.y + 16,
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <h4 className="font-extrabold text-popover-foreground text-sm uppercase tracking-wider">
              {isNepali 
                ? districtStats[hoveredNode.slug]?.name?.np || hoveredNode.slug
                : districtStats[hoveredNode.slug]?.name?.en || hoveredNode.slug}
            </h4>
          </div>
          
          <div className="flex items-center gap-1.5 text-xs font-semibold text-primary mt-1">
            <Users className="w-3.5 h-3.5" />
            <span>
              {districtStats[hoveredNode.slug]?.stats?.totalMembers || 0} {isNepali ? "सदस्यहरू" : "Members"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
