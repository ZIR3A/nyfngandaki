'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroButtons({ ctaData, locale = 'en' }) {
  if (!ctaData) return null;

  const isNp = locale === 'np';
  
  // Use CMS data if available, fallback to defaults
  const primaryText = ctaData.title?.[locale];
  const primaryLink = ctaData.link;
  
  const secondaryText = ctaData.secondaryTitle?.[locale];
  const secondaryLink = ctaData.secondaryLink;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.1 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      className="flex flex-wrap items-center gap-4 mt-8"
    >
      <Link 
        href={primaryLink}
        className="group relative px-8 py-3.5 bg-primary-red hover:bg-red-700 text-white rounded-lg font-semibold shadow-lg shadow-red-500/30 transition-all focus:ring-4 focus:ring-red-500/50 outline-none overflow-hidden"
      >
        <span className="relative z-10">{primaryText}</span>
        <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left ease-out duration-300" />
      </Link>

      <Link 
        href={secondaryLink}
        className="px-8 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-lg font-semibold transition-all focus:ring-4 focus:ring-white/30 outline-none"
      >
        {secondaryText}
      </Link>
    </motion.div>
  );
}
