'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import FloatingBadge from './FloatingBadge';

export default function WhoWeAreImage({ media, badgeData, locale = 'en' }) {
  // We expect `media` to contain `{ url: string, alt: string }` populated from CMS
  const imageUrl = media?.url || '/images/placeholders/who-we-are-placeholder.jpg'; // Fallback if no media attached
  
  const isNp = locale === 'np';
  const defaultBadgeTitle = isNp ? '१५+' : '15+';
  const defaultBadgeSubtitle = isNp ? 'वर्षको अनुभव' : 'Years of Service';

  const badgeTitle = badgeData?.title?.[locale] || defaultBadgeTitle;
  const badgeSubtitle = badgeData?.subtitle?.[locale] || defaultBadgeSubtitle;

  return (
    <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full h-full rounded-3xl overflow-hidden shadow-2xl relative"
      >
        {/* Decorative gradient overlay behind image for subtle blending */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent z-10 pointer-events-none" />

        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={media?.alt || "Organization Story"}
            fill
            loading="lazy"
            className="object-cover object-center transform hover:scale-105 transition-transform duration-1000 ease-out"
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={85}
          />
        ) : (
          <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
            <span className="text-gray-400">Image Placeholder</span>
          </div>
        )}
      </motion.div>

      {/* Floating Badge overlays the image */}
      {/* If CMS has an 'enableBadge' toggle, you'd wrap this in a condition */}
      <FloatingBadge title={badgeTitle} subtitle={badgeSubtitle} />
    </div>
  );
}
