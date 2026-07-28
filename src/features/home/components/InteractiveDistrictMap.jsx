"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, Building, ArrowRight, MousePointerClick } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import GandakiMap from "@/components/maps/GandakiMap";
import { useLanguage } from "@/localization/LanguageContext";

export default function InteractiveDistrictMap({ dictionary, districts = [] }) {
  const { language } = useLanguage();
  
  const [mounted, setMounted] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  useEffect(() => {
    setMounted(true);
    // Auto-select first district if available, otherwise fallback to Kaski
    if (districts.length > 0) {
      setSelectedDistrict(districts[0]);
    } else {
      setSelectedDistrict({
        _id: "KASKI",
        slug: "kaski",
        name: { en: "Kaski", np: "कास्की" },
        status: "Inactive",
        isFallback: true
      });
    }
  }, [districts]);

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0A0F1C] transition-colors relative overflow-hidden">
      
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
          
          {/* Left: Interactive Map (65%) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-[65%] bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-3xl p-4 lg:p-4 relative flex flex-col min-h-[550px] shadow-sm overflow-hidden"
          >
            {/* Instruction badge */}
            <div className="absolute top-6 left-6 z-10 flex items-center gap-2 px-3 py-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-full text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm border border-slate-100 dark:border-slate-700">
              <MousePointerClick className="w-4 h-4" />
              {language === 'en' ? 'Click on a district' : 'जिल्लामा क्लिक गर्नुहोस्'}
            </div>

            {mounted && (
              <div className="w-full h-full absolute inset-0 pt-16 pb-4 px-4 rounded-[inherit]">
                <GandakiMap 
                  interactive={true} 
                  showTooltip={true} 
                  selectedDistrict={selectedDistrict} 
                  onDistrictClick={(dist) => setSelectedDistrict(dist)} 
                  language={language}
                  districts={districts}
                />
              </div>
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
                  className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col h-full shadow-lg min-h-[550px]"
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
    </section>
  );
}
