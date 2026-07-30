'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';

export default function ProgramCard({ program, locale = 'en', index }) {
  const title = program.title?.[locale];
  const description = program.description?.[locale];
  const ctaLabel = program.ctaLabel?.[locale] || (locale === 'np' ? 'à¤¥à¤ª à¤œà¤¾à¤¨à¥à¤¨à¥à¤¹à¥‹à¤¸à¥' : 'Learn More');
  
  if (!title) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative h-[420px] md:h-[480px] w-full min-w-[280px] md:min-w-0 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 snap-center"
    >
      {/* Background Image */}
      {program.coverImage?.url ? (
        <Image
          src={program.coverImage.url}
          alt={program.coverImage.alt || title}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800" />
      )}

      {/* Dark Overlay Gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Badges (Top Left) */}
      <div className="absolute top-6 left-6 flex flex-wrap gap-2">
        {program.status && (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${program.status === 'ongoing' ? 'bg-green-500/80 text-white' : 'bg-white/20 text-white'}`}>
            {program.status.toUpperCase()}
          </span>
        )}
        {program.category && (
          <span className="px-3 py-1 bg-primary-blue/90 text-white rounded-full text-xs font-semibold backdrop-blur-md">
            {program.category}
          </span>
        )}
      </div>

      {/* Content (Bottom) */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col justify-end text-white">
        
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-300 mb-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          {program.duration && (
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {program.duration}</span>
          )}
          {program.location && (
            <span className="flex items-center gap-1.5"><MapPin size={14} /> {program.location}</span>
          )}
        </div>

        <h3 className="text-2xl font-bold mb-2 leading-tight">
          {title}
        </h3>
        
        {description && (
          <p className="text-gray-300 text-sm line-clamp-2 mb-4">
            {description}
          </p>
        )}

        {/* CTA Link (Visual only for now, can be linked to detail page later) */}
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-primary-red transition-colors">
          {ctaLabel} <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}
