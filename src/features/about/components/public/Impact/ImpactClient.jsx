'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../Strategy/Shared/SectionHeading';
import StatisticsGrid from './StatisticsGrid';
import ImpactHighlightGrid from './ImpactHighlightGrid';
import AchievementGrid from './AchievementGrid';
import RecognitionCarousel from './RecognitionCarousel';

export default function ImpactClient({ data, locale = 'en' }) {
  const { statistics, impactHighlights, achievements, recognitions } = data;

  const isNp = locale === 'np';
  const label = isNp ? 'एक नजरमा संस्था' : 'Organization at a Glance';
  const heading = isNp ? 'हाम्रो प्रभाव र सफलताहरू' : 'Our Impact & Scale';
  const description = isNp 
    ? 'हामीले सिर्जना गरेको सकारात्मक प्रभाव र समुदायप्रतिको प्रतिबद्धता।' 
    : 'A snapshot of our scale, achievements, and the positive impact we create in the community.';

  return (
    <div className="w-full relative z-10">
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 px-6"
      >
        <SectionHeading label={label} heading={heading} centered={true} />
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-normal mt-[-1.5rem]">
          {description}
        </p>
      </motion.div>

      {/* 1. Animated Numbers Dashboard */}
      <StatisticsGrid statistics={statistics} locale={locale} />

      {/* 2. Impact Highlight Cards */}
      <ImpactHighlightGrid highlights={impactHighlights} locale={locale} />

      {/* 3. Milestones & Achievements */}
      <AchievementGrid achievements={achievements} locale={locale} />

      {/* 4. Trust & Recognition Marquee */}
      <RecognitionCarousel recognitions={recognitions} locale={locale} />
      
    </div>
  );
}
