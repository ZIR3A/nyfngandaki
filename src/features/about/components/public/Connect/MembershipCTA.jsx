'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function MembershipCTA({ cta, locale = 'en' }) {
  if (!cta || !cta.heading?.[locale]) return null;

  const heading = cta.heading[locale];
  const description = cta.description?.[locale];
  const primaryButtonLabel = cta.buttonLabel?.[locale];
  const primaryButtonLink = cta.buttonLink;
  const secondaryButtonLabel = cta.secondaryButtonLabel?.[locale];
  const secondaryButtonLink = cta.secondaryButtonLink;

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 mb-20 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative w-full rounded-[2.5rem] overflow-hidden shadow-2xl"
      >
        {/* Background Image or Fallback Gradient */}
        {cta.backgroundUrl ? (
          <Image
            src={cta.backgroundUrl}
            alt="Membership CTA Background"
            fill
            className="object-cover"
            sizes="(max-width: 1440px) 100vw, 1440px"
          />
        ) : (
          <div className="absolute inset-0 bg-slate-900" />
        )}

        {/* Deep Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/95 via-primary-blue/80 to-primary-blue/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Content */}
        <div className="relative z-10 px-8 py-16 md:py-16 lg:py-24 md:px-16 lg:px-24 max-w-4xl">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {heading}
          </h2>
          
          {description && (
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl leading-relaxed">
              {description}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Link 
              href={primaryButtonLink}
              className="group flex items-center gap-2 bg-primary-red hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg shadow-primary-red/30 hover:shadow-xl hover:shadow-primary-red/40"
            >
              <span>{primaryButtonLabel}</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href={secondaryButtonLink}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold py-4 px-8 rounded-full transition-all duration-300 border border-white/20"
            >
              <span>{secondaryButtonLabel}</span>
            </Link>
          </div>
        </div>

        {/* Decorative Graphic Element */}
        <div className="absolute -right-20 -bottom-20 w-[400px] h-[400px] border-[40px] border-white/5 rounded-full pointer-events-none" />
        <div className="absolute -right-10 -bottom-10 w-[300px] h-[300px] border-[40px] border-white/10 rounded-full pointer-events-none" />
      </motion.div>
    </div>
  );
}
