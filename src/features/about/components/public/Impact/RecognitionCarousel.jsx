'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function RecognitionCarousel({ recognitions, locale = 'en' }) {
  if (!recognitions || recognitions.length === 0) return null;

  const isNp = locale === 'np';
  const label = isNp ? 'à¤®à¤¾à¤¨à¥à¤¯à¤¤à¤¾ à¤° à¤¸à¤¾à¤à¥‡à¤¦à¤¾à¤°à¥€' : 'Recognitions & Partners';

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 mb-20">
      
      <div className="flex flex-col items-center mb-12">
        <h4 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest text-center">
          {label}
        </h4>
      </div>

      <div className="w-full overflow-hidden relative">
        
        {/* Subtle Fade gradients on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-gray-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-gray-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />

        {/* Marquee Container */}
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 30, // Adjust speed
            ease: "linear",
          }}
          className="flex items-center gap-12 md:gap-20 whitespace-nowrap min-w-max px-12"
        >
          {/* Double the array to ensure seamless infinite looping */}
          {[...recognitions, ...recognitions].map((recognition, index) => {
            const orgName = recognition.organization?.[locale] || recognition.title?.[locale];
            
            return (
              <a 
                key={index}
                href={recognition.url || '#'}
                target={recognition.url ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className={`relative h-16 md:h-20 w-32 md:w-48 flex items-center justify-center opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 ${!recognition.url && 'cursor-default'}`}
                title={orgName}
              >
                {recognition.logo?.url ? (
                  <Image
                    src={recognition.logo.url}
                    alt={recognition.logo.alt || orgName || 'Partner Logo'}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 150px, 200px"
                  />
                ) : (
                  <span className="text-lg font-bold text-gray-500 whitespace-normal text-center">{orgName}</span>
                )}
              </a>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
