"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { DEFAULT_MAP_CENTER, DEFAULT_ZOOM, MAX_ZOOM, MIN_ZOOM } from "@/lib/maps/mapConstants";
import DistrictLayer from "./DistrictLayer";
import { useTheme } from "next-themes";
import MapControls from "./MapControls";

export default function GandakiMap({
  interactive = true,
  showLegend = false,
  showMarkers = false,
  showTooltip = true,
  selectedDistrict = null,
  onDistrictClick,
  highlightDistrict = null,
  showStatistics = true,
  language = "en",
  districts = [],
}) {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  // Fix for default Leaflet icons missing in Next.js
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  return (
    <div className="w-full h-full relative isolate rounded-3xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 z-0">
      <MapContainer
        center={DEFAULT_MAP_CENTER}
        zoom={DEFAULT_ZOOM}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        scrollWheelZoom={interactive}
        dragging={interactive}
        zoomControl={false} // Custom controls will be added
        attributionControl={false}
        className="w-full h-full min-h-[500px] z-0 bg-slate-50 dark:bg-[#0A0F1C]"
      >
        <TileLayer
          url={
            isDark
              ? "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
              : "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          }
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />

        <DistrictLayer
          selectedDistrict={selectedDistrict}
          onDistrictClick={onDistrictClick}
          showTooltip={showTooltip}
          language={language}
          districts={districts}
          isDark={isDark}
        />

        {interactive && <MapControls />}
      </MapContainer>
    </div>
  );
}
