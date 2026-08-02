'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';
import { GandakiMap } from '@/features/members/components/GandakiMap';

export default function InternalPageHero({ 
  breadcrumbItems = [], 
  label, 
  title, 
  subtitle, 
  statsPills = [],
  isNepali = false,
  children
}) {
  return (
    <section className="relative w-full min-h-[50vh] lg:min-h-[60vh] flex items-center bg-[#f8fafe] dark:bg-[#0A0F1C] overflow-hidden py-16 lg:py-24 z-40 border-b border-blue-900/5">
      
      {/* Mesh Pattern Background (Very faint dotted) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="w-full h-full bg-[radial-gradient(circle,#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(circle,#1e293b_1px,transparent_1px)] [background-size:32px_32px]"></div>
      </div>

      {/* Background Star Watermark */}
      <div className="absolute right-[-10%] lg:right-0 top-1/2 -translate-y-1/2 opacity-[0.03] dark:opacity-5 pointer-events-none">
        <Star className="w-[800px] h-[800px] text-blue-900 fill-blue-900" />
      </div>

      <div className="container max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between h-full gap-12 lg:gap-8">
        
        {/* Left Side: Content & Stats */}
        <div className="flex-1 flex flex-col justify-center w-full lg:max-w-2xl pt-4">
          
          {/* Breadcrumb */}
          {breadcrumbItems.length > 0 && (
            <motion.nav 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-sm text-slate-500 mb-8 font-semibold"
            >
              {breadcrumbItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <ChevronRight className="w-4 h-4 text-slate-400" />}
                  {item.href ? (
                    <Link href={item.href} className="text-primary-blue hover:text-blue-700 transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-slate-700 dark:text-slate-300">{item.label}</span>
                  )}
                </React.Fragment>
              ))}
            </motion.nav>
          )}

          {/* Small Label with Red Line */}
          {label && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-6 text-xs md:text-sm font-extrabold text-primary-red uppercase tracking-widest"
            >
              <div className="w-8 h-[2px] bg-primary-red"></div>
              {label}
            </motion.div>
          )}

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0c1831] dark:text-white tracking-tight mb-6 leading-[1.1] max-w-3xl"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base md:text-[17px] text-slate-600 dark:text-slate-400 max-w-xl font-medium leading-relaxed mb-10"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Stats Pills */}
          {statsPills.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4"
            >
              {statsPills.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-3 shadow-sm">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-${stat.color}-50 dark:bg-${stat.color}-900/30 text-${stat.color}-600 dark:text-${stat.color}-400`}>
                    {stat.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-black text-slate-900 dark:text-white leading-none">
                      {stat.value}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Optional Children (for Search bar) */}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 max-w-xl"
            >
              {children}
            </motion.div>
          )}

        </div>

        {/* Right Side: Map */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:flex w-full lg:w-[45%] h-[400px] xl:h-[500px] items-center justify-center relative mt-12 lg:mt-0 pointer-events-none"
        >
          <div className="w-full h-full relative z-10 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-500">
            <GandakiMap isNepali={isNepali} className="w-[110%] h-[110%] object-contain" selectedDistrict="all" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
