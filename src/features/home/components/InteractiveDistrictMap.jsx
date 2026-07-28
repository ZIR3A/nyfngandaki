"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, Building, ArrowRight, MousePointerClick } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useLanguage } from "@/localization/LanguageContext";
import { useTheme } from "next-themes";

export default function InteractiveDistrictMap({ dictionary, districts = [] }) {
  const { language } = useLanguage();
  const { theme, systemTheme } = useTheme();
  
  const [mounted, setMounted] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    // Auto-select first district if available, otherwise fallback to Kaski
    if (districts.length > 0) {
      setSelectedDistrict(districts[0]);
    } else {
      setSelectedDistrict({
        _id: "KASKI",
        slug: "kaski",
        name: { en: "Kaski", np: "Kaski" },
        status: "Inactive",
        isFallback: true
      });
    }
  }, [districts]);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  // Map settings
  const geoUrl = "/gandaki-districts.geojson";
  
  const handleMouseMove = (e) => {
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  // Find DB district by geo properties or return a fallback
  const getDbDistrict = (geoName) => {
    const found = districts.find(d => 
      d.name?.en?.toLowerCase() === geoName.toLowerCase() ||
      d.slug?.toLowerCase() === geoName.toLowerCase()
    );
    if (found) return found;

    // Fallback if DB doesn't have the district yet
    const formattedName = geoName.charAt(0).toUpperCase() + geoName.slice(1).toLowerCase();
    return {
      _id: geoName,
      slug: geoName.toLowerCase(),
      name: { en: formattedName, np: formattedName },
      status: "Inactive",
      isFallback: true
    };
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0A0F1C] transition-colors relative overflow-hidden" onMouseMove={handleMouseMove}>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-[1440px] relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold text-sm mb-6"
          >
            <MapPin className="w-4 h-4" />
            {dictionary.home?.districts?.badge || (language === 'en' ? "PROVINCIAL PRESENCE" : "प्रदेश उपस्थिति")}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold mb-6 text-slate-900 dark:text-white"
          >
            {dictionary.home?.districts?.title || (language === 'en' ? "Explore Gandaki Province" : "गण्डकी प्रदेश अन्वेषण गर्नुहोस्")}
          </motion.h2>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          
          {/* Left: SVG Map (65%) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-[65%] bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-3xl p-4 lg:p-8 relative flex items-center justify-center min-h-[500px] shadow-sm"
          >
            {/* Instruction badge */}
            <div className="absolute top-6 left-6 z-10 flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-medium text-slate-600 dark:text-slate-400">
              <MousePointerClick className="w-4 h-4" />
              {language === 'en' ? 'Click on a district' : 'जिल्लामा क्लिक गर्नुहोस्'}
            </div>

            {mounted && (
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 15000,
                  center: [83.9, 28.5] // Roughly center of Gandaki
                }}
                className="w-full h-full max-h-[600px] outline-none drop-shadow-sm"
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const geoName = geo.properties.DISTRICT || geo.properties.id;
                      const dbDistrict = getDbDistrict(geoName);
                      const isSelected = selectedDistrict?._id === dbDistrict?._id && dbDistrict != null;
                      
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onClick={() => {
                            if (dbDistrict) setSelectedDistrict(dbDistrict);
                          }}
                          onMouseEnter={() => setHoveredDistrict(dbDistrict || { name: { en: geoName } })}
                          onMouseLeave={() => setHoveredDistrict(null)}
                          className="outline-none cursor-pointer transition-all duration-300"
                          style={{
                            default: {
                              fill: isSelected 
                                ? (isDark ? "#2563EB" : "#3B82F6") // Selected Fill
                                : (isDark ? "#1F2937" : "#F1F5F9"), // Default Fill
                              stroke: isSelected 
                                ? "#EF4444" // Secondary Red Outline when selected
                                : (isDark ? "#374151" : "#CBD5E1"), // Default Stroke
                              strokeWidth: isSelected ? 2 : 1,
                              outline: "none",
                            },
                            hover: {
                              fill: isSelected 
                                ? (isDark ? "#2563EB" : "#3B82F6") 
                                : (isDark ? "#1D4ED8" : "#93C5FD"), // Hover Fill (Primary Blue)
                              stroke: isSelected ? "#EF4444" : (isDark ? "#60A5FA" : "#2563EB"),
                              strokeWidth: 2,
                              outline: "none",
                            },
                            pressed: {
                              fill: "#1D4ED8",
                              outline: "none",
                            },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>
            )}
          </motion.div>

          {/* Right: Information Panel (35%) */}
          <div className="w-full lg:w-[35%] flex flex-col">
            <AnimatePresence mode="wait">
              {selectedDistrict ? (
                <motion.div
                  key={selectedDistrict._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col h-full shadow-lg"
                >
                  <div className="mb-6">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
                      {selectedDistrict.name?.[language] || selectedDistrict.name?.en}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
                      <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>{language === 'en' ? 'Gandaki Province, Nepal' : 'गण्डकी प्रदेश, नेपाल'}</span>
                    </div>
                  </div>

                  {selectedDistrict.coverImage && (
                    <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6 bg-slate-100 dark:bg-slate-800">
                      <Image 
                        src={selectedDistrict.coverImage} 
                        alt="District cover" 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 text-center">
                      <Users className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {/* Mock data for now as member counts might come from aggregation */}
                        {Math.floor(Math.random() * 500) + 100}
                      </div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                        {language === 'en' ? 'Members' : 'सदस्यहरू'}
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 text-center">
                      <Building className="w-6 h-6 text-red-500 dark:text-red-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {selectedDistrict.status === 'Active' ? '1' : '0'}
                      </div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                        {language === 'en' ? 'Committee' : 'कमिटी'}
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                    <Link 
                      href={`/districts/${selectedDistrict.slug}`} 
                      className="flex items-center justify-center w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors group"
                    >
                      {language === 'en' ? 'Explore District' : 'जिल्ला अन्वेषण गर्नुहोस्'}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white/50 dark:bg-[#111827]/50 border border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-8 flex flex-col items-center justify-center h-full text-center min-h-[400px]">
                  <MousePointerClick className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
                  <p className="text-slate-500 dark:text-slate-400 font-medium">
                    {language === 'en' 
                      ? 'Select a district on the map to view details.' 
                      : 'विवरण हेर्न नक्सामा जिल्ला चयन गर्नुहोस्।'}
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Floating Tooltip */}
      <AnimatePresence>
        {hoveredDistrict && mounted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="fixed z-50 pointer-events-none bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-xl rounded-xl p-4 min-w-[160px]"
            style={{ 
              left: tooltipPos.x + 20, 
              top: tooltipPos.y + 20 
            }}
          >
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">
              {hoveredDistrict.name?.[language] || hoveredDistrict.name?.en}
            </h4>
            {hoveredDistrict._id ? (
              <div className="flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                {language === 'en' ? 'Active Committee' : 'सक्रिय कमिटी'}
              </div>
            ) : (
              <div className="text-xs text-slate-500">
                {language === 'en' ? 'Data unavailable' : 'डाटा उपलब्ध छैन'}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
