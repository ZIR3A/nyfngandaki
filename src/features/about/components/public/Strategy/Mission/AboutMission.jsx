'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionHeading from '../Shared/SectionHeading';

export default function AboutMission({ missionData, media, locale = 'en' }) {
  if (!missionData || (!missionData.heading?.[locale] && !missionData.description?.[locale])) {
    return null;
  }


  const isNp = locale === 'np';
  const label = isNp ? 'हाम्रो लक्ष्य' : 'Our Mission';
  const heading = missionData.heading?.[locale];
  const description = missionData.description?.[locale];
  const imageUrl = media?.url || '/images/placeholders/mission-placeholder.jpg';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2, delayChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto py-16 lg:py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Side: Mission Illustration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative w-full aspect-video lg:aspect-square rounded-[2rem] overflow-hidden shadow-2xl order-2 lg:order-1"
        >
          <Image
            src={imageUrl}
            alt={media?.alt || heading || "Mission Illustration"}
            fill
            loading="lazy"
            className="object-cover hover:scale-105 transition-transform duration-1000 ease-out"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        {/* Right Side: Mission Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col justify-center order-1 lg:order-2"
        >
          <SectionHeading label={label} heading={heading} />
          
          <motion.div variants={itemVariants} className="prose prose-lg dark:prose-invert">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {description}
            </p>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
