"use client";

import { useEffect, useState } from "react";
import { GeoJSON, useMap } from "react-leaflet";
import { MAP_THEME } from "@/lib/maps/mapConstants";
import ReactDOMServer from "react-dom/server";
import { Users, Building } from "lucide-react";

export default function DistrictLayer({ selectedDistrict, onDistrictClick, showTooltip, language, districts, isDark }) {
  const map = useMap();
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch("/gandaki-districts.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch(console.error);
  }, []);

  const theme = isDark ? MAP_THEME.dark : MAP_THEME.light;

  const getDbDistrict = (geoName) => {
    const found = districts.find(
      (d) =>
        d.name?.en?.toLowerCase() === geoName.toLowerCase() ||
        d.slug?.toLowerCase() === geoName.toLowerCase()
    );
    if (found) return found;

    const formattedName = geoName.charAt(0).toUpperCase() + geoName.slice(1).toLowerCase();
    return {
      _id: geoName,
      slug: geoName.toLowerCase(),
      name: { en: formattedName, np: formattedName },
      status: "Inactive",
      isFallback: true,
    };
  };

  const styleFeature = (feature) => {
    const geoName = feature.properties.DISTRICT || feature.properties.id;
    const dbDistrict = getDbDistrict(geoName);
    const isSelected = selectedDistrict?._id === dbDistrict?._id && dbDistrict != null;

    return {
      fillColor: isSelected ? theme.selectedFill : theme.defaultFill,
      weight: isSelected ? 2 : 1,
      opacity: 1,
      color: isSelected ? theme.selectedStroke : theme.stroke,
      fillOpacity: 1,
      className: "transition-all duration-300 outline-none",
    };
  };

  const onEachFeature = (feature, layer) => {
    const geoName = feature.properties.DISTRICT || feature.properties.id;
    const dbDistrict = getDbDistrict(geoName);

    // Tooltip
    if (showTooltip) {
      const tooltipContent = ReactDOMServer.renderToString(
        <div className="font-sans">
          <div className="font-bold text-slate-900 text-sm mb-1">
            {dbDistrict.name?.[language] || dbDistrict.name?.en}
          </div>
          {dbDistrict._id && !dbDistrict.isFallback ? (
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              {language === "en" ? "Active Committee" : "सक्रिय कमिटी"}
            </div>
          ) : (
            <div className="text-[10px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
              {language === "en" ? "No Committee" : "कमिटी छैन"}
            </div>
          )}
        </div>
      );

      layer.bindTooltip(tooltipContent, {
        sticky: true,
        className: "bg-white border-0 shadow-lg rounded-lg p-2 custom-leaflet-tooltip",
        opacity: 0.95,
      });
    }

    // Events
    layer.on({
      mouseover: (e) => {
        const target = e.target;
        const isSelected = selectedDistrict?._id === dbDistrict?._id && dbDistrict != null;

        target.setStyle({
          fillColor: isSelected ? theme.selectedFill : theme.hoverFill,
          color: isSelected ? theme.selectedStroke : theme.selectedFill,
          weight: 2,
        });
        target.bringToFront();
      },
      mouseout: (e) => {
        const target = e.target;
        // Reset to default style from the main style function
        target.setStyle(styleFeature(target.feature));
      },
      click: (e) => {
        if (onDistrictClick && dbDistrict) {
          onDistrictClick(dbDistrict);
        }
        map.fitBounds(e.target.getBounds(), { padding: [50, 50], maxZoom: 10 });
      },
    });
  };

  if (!geoData) return null;

  return (
    <GeoJSON
      data={geoData}
      style={styleFeature}
      onEachFeature={onEachFeature}
      // Provide a key to force re-render when selected district or theme changes so styles apply immediately
      key={`${selectedDistrict?._id}-${isDark}`}
    />
  );
}
