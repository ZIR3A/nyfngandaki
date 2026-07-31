"use client";

import React, { useEffect, useState } from "react";
import { useDistrictExplorer } from "../contexts/DistrictExplorerContext";
import { MapPin, Users, Building2, ArrowRight, MousePointerClick } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GandakiMap } from "./GandakiMap";

export function DistrictExplorerSection({ isNepali }) {
  const { selectedDistrictSlug, setSelectedDistrictSlug } = useDistrictExplorer();
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDistricts() {
      try {
        const res = await fetch("/api/public/districts/explorer");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (data.success) {
          setDistricts(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDistricts();
  }, []);

  useEffect(() => {
    // If a district is pre-selected, scroll to this section smoothly after a short delay
    if (selectedDistrictSlug) {
      setTimeout(() => {
        const element = document.getElementById("district-explorer");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
    }
  }, [selectedDistrictSlug]);

  const activeDistrict = districts.find(d => d.slug === selectedDistrictSlug);

  const handleExploreClick = () => {
    // Scroll to the district members section smoothly
    const element = document.getElementById("district-members");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="district-explorer" className="py-24 bg-white dark:bg-gray-950 relative border-b border-gray-100 dark:border-gray-900">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
            {isNepali ? "गण्डकी प्रदेश अन्वेषण गर्नुहोस्" : "Explore Gandaki Province"}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium">
            {isNepali ? "यसको समिति र सदस्यहरू हेर्न जिल्ला चयन गर्नुहोस्।" : "Select a district to view its committee and members."}
          </p>
        </div>

        {/* Main Content Layout - Unified Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Column: Map */}
          <div className="w-full lg:w-[45%] bg-slate-50/50 dark:bg-slate-950/50 relative border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 p-8 min-h-[400px] flex items-center justify-center">
            <div className="absolute top-6 left-6 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300">
              <MousePointerClick className="w-3.5 h-3.5 text-blue-500" />
              {isNepali ? "जिल्लामा क्लिक गर्नुहोस्" : "Click on a district"}
            </div>
            
            <div className="w-full h-full">
              {loading ? (
                <div className="w-full h-full bg-slate-200 dark:bg-slate-800 animate-pulse rounded-2xl" />
              ) : (
                <GandakiMap 
                  isNepali={isNepali} 
                  className="w-full h-full object-contain mt-8 mix-blend-multiply dark:mix-blend-normal" 
                  selectedDistrict={selectedDistrictSlug}
                  onSelect={(slug) => setSelectedDistrictSlug(slug)}
                />
              )}
            </div>
          </div>

          {/* Right Column: Grid list */}
          <div className="w-full lg:w-[55%] p-6 md:p-8 flex flex-col h-full bg-white dark:bg-slate-900">
            <div className="flex items-center justify-end mb-6">
              <div className="inline-flex border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 bg-slate-50 dark:bg-slate-800">
                <button className="px-3 py-1.5 rounded-md bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 text-xs font-bold shadow-sm flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                  Grid
                </button>
                <button className="px-3 py-1.5 rounded-md text-slate-500 dark:text-slate-400 text-xs font-bold hover:text-slate-700 dark:hover:text-slate-200 flex items-center gap-1.5 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                  List
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 overflow-y-auto pr-2 max-h-[450px]">
              {districts.map(district => {
                const isSelected = selectedDistrictSlug === district.slug;
                const name = isNepali ? district.name?.np || district.name?.en : district.name?.en;
                return (
                  <button
                    key={district.slug}
                    onClick={() => setSelectedDistrictSlug(district.slug)}
                    className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                      isSelected 
                        ? "bg-blue-50 border-blue-200 shadow-sm dark:bg-blue-900/20 dark:border-blue-800" 
                        : "bg-white border-slate-100 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600"
                    }`}
                  >
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg shrink-0 ${
                      isSelected ? "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300" : "bg-slate-50 text-slate-400 dark:bg-slate-700"
                    }`}>
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className={`font-bold text-sm ${isSelected ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}>
                        {name}
                      </div>
                      <div className={`text-xs ${isSelected ? "text-slate-600 dark:text-slate-400" : "text-slate-500"}`}>
                        {district.stats?.totalMembers || 0} {isNepali ? "सदस्यहरू" : "Members"}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-auto">
              <button
                onClick={handleExploreClick}
                disabled={!activeDistrict}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  activeDistrict 
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 cursor-pointer" 
                    : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed"
                }`}
              >
                {isNepali ? "जिल्ला छान्नुहोस्" : "Select District"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
