"use client";

import React, { useEffect, useState, useRef } from "react";
import { Users, MapPin, Award, ChevronRight } from "lucide-react";
import { motion, animate, useInView } from "framer-motion";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { GandakiMap } from "./GandakiMap";
import { GlobalMemberSearch } from "./GlobalMemberSearch";

function AnimatedCounter({ value }) {
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !inView) return;
    
    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (val) => {
        node.textContent = Math.round(val).toLocaleString();
      }
    });
    
    return () => controls.stop();
  }, [value, inView]);
  
  return <span ref={nodeRef}>0</span>;
}

export function DirectoryHero({ isNepali }) {
  const { data: json } = useSWR("/api/public/members/statistics", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 300000,
  });

  const stats = json?.data || { totalMembers: 0, totalDistricts: 0, officeBearers: 0 };

  return (
    <section className="relative w-full min-h-[50vh] lg:min-h-[60vh] flex items-center overflow-visible bg-slate-50 dark:bg-[#0A0F1C] border-b border-border/40 py-16 lg:pt-16 lg:pb-24 z-40">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between h-full gap-12 lg:gap-8">
        
        {/* Left Side: Content & Stats */}
        <div className="flex-1 flex flex-col justify-center w-full lg:max-w-2xl pt-10">
          {/* Breadcrumb */}
          <motion.nav 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-slate-500 mb-8 font-medium"
          >
            <Link href={`/${isNepali ? "np" : "en"}`} className="hover:text-blue-600 transition-colors">
              {isNepali ? "गृहपृष्ठ" : "Home"}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 dark:text-white">{isNepali ? "सदस्य निर्देशिका" : "Members Directory"}</span>
          </motion.nav>

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-[1.1]"
          >
            {isNepali ? (
              <>सदस्य<br />निर्देशिका</>
            ) : (
              <>Members<br />Directory</>
            )}
          </motion.h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-xl font-medium leading-relaxed mb-12"
          >
            {isNepali 
              ? "राष्ट्रिय युवा संघ नेपाल गण्डकी प्रदेश अन्तर्गतका प्रदेश समिति तथा सम्पूर्ण जिल्ला समितिहरूको आधिकारिक विवरण।" 
              : "The official directory of the Province Committee and all District Committees under National Youth Federation Nepal, Gandaki Province."}
          </motion.p>

          {/* Pill Statistics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            {/* Districts Pill */}
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full px-5 py-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-slate-900 dark:text-white leading-none">
                  <AnimatedCounter value={stats.totalDistricts || 11} />
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                  {isNepali ? "जिल्लाहरू" : "Districts"}
                </span>
              </div>
            </div>

            {/* Office Bearers Pill */}
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full px-5 py-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-slate-900 dark:text-white leading-none">
                  <AnimatedCounter value={stats.officeBearers || 0} />
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                  {isNepali ? "पदाधिकारीहरू" : "Office Bearers"}
                </span>
              </div>
            </div>

            {/* Active Members Pill */}
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full px-5 py-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-slate-900 dark:text-white leading-none">
                  <AnimatedCounter value={stats.totalMembers || 0} />
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                  {isNepali ? "सक्रिय सदस्यहरू" : "Active Members"}
                </span>
              </div>
            </div>

            {/* Province Committee Pill */}
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full px-5 py-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <Award className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-slate-900 dark:text-white leading-none">
                  <AnimatedCounter value={1} />
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                  {isNepali ? "प्रदेश कमिटी" : "Province Committee"}
                </span>
              </div>
            </div>

          </motion.div>

          {/* Search Bar - Moved inside Hero */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 max-w-xl"
          >
            <GlobalMemberSearch isNepali={isNepali} />
          </motion.div>
        </div>

        {/* Right Side: Map */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:flex w-full lg:w-[50%] h-[500px] items-center justify-center relative mt-12 lg:mt-0"
        >
          {/* Dotted circular background behind map */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="w-[120%] h-[120%] bg-[radial-gradient(circle,#e2e8f0_2px,transparent_2px)] dark:bg-[radial-gradient(circle,#1e293b_2px,transparent_2px)] [background-size:24px_24px] rounded-full opacity-60 mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)" style={{ WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)" }}></div>
          </div>
          
          <div className="w-full h-full relative z-10 flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity duration-500">
            <GandakiMap isNepali={isNepali} className="w-[90%] h-[90%] object-contain" selectedDistrict="all" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
