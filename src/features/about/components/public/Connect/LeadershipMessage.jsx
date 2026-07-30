'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionLabel from '../WhoWeAre/SectionLabel'; // Reuse elegant label

export default function LeadershipMessage({ leadership, locale = 'en' }) {
  if (!leadership || (!leadership.message?.[locale] && !leadership.photo?.url)) return null;

  const label = leadership.label?.[locale];
  const heading = leadership.heading?.[locale];
  const message = leadership.message?.[locale];
  const name = leadership.name;
  const designation = leadership.designation?.[locale];
  
  return (
    <div id="leadership" className="w-full max-w-[1200px] mx-auto px-6 md:px-12 mb-32">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center lg:items-stretch">
        
        {/* Left: Premium Portrait */}
        <motion.div 
          initial={{ opacity: 0, x: -30, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-5/12 max-w-[400px] lg:max-w-none flex-shrink-0"
        >
          <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-primary-blue/10 border border-gray-100 dark:border-slate-800">
            {leadership.photo?.url ? (
              <Image
                src={leadership.photo.url}
                alt={leadership.photo.alt || name || 'Leadership'}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
              />
            ) : (
              <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800" />
            )}
            
            {/* Inner Gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            
            {/* Floating Name Plate overlay on Mobile/Tablet (hidden on LG where it's in the text) */}
            <div className="absolute bottom-6 left-6 right-6 lg:hidden">
              <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
              <p className="text-white/90 font-medium text-sm uppercase tracking-wider">{designation}</p>
            </div>
          </div>
        </motion.div>

        {/* Right: Editorial Message */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full lg:w-7/12 flex flex-col justify-center"
        >
          {label && (
            <div className="mb-6">
              <SectionLabel label={label} />
            </div>
          )}
          
          {heading && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
              {heading}
            </h2>
          )}
          
          {/* Rich Text Message Simulation */}
          <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300 mb-10 leading-relaxed font-serif">
            {message && message.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>

          {/* Signature Block */}
          <div className="mt-auto border-t border-gray-100 dark:border-slate-800 pt-8 flex items-center justify-between">
            <div className="hidden lg:block">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{name}</h3>
              <p className="text-primary-blue font-medium text-sm uppercase tracking-wider">{designation}</p>
            </div>
            
            {leadership.signature?.url && (
              <div className="relative w-32 h-16 opacity-80 dark:invert">
                <Image
                  src={leadership.signature.url}
                  alt="Signature"
                  fill
                  className="object-contain object-right lg:object-left"
                />
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
