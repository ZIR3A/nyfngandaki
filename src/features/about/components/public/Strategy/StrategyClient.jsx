'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Target, Compass } from 'lucide-react';
import SectionHeading from './Shared/SectionHeading';
import AboutCoreValues from './CoreValues/AboutCoreValues';
import DecorativeBackground from './Shared/DecorativeBackground';

export default function StrategyClient({ data, locale }) {
  const { organization, objectives, coreValues } = data;
  const isNp = locale === 'np';

  const visionText = organization?.vision?.[locale] || '';
  const missionText = organization?.mission?.[locale] || '';
  const objectivesText = organization?.objectives?.[locale] || '';

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="relative w-full overflow-hidden px-6 md:px-12 z-10">
      <DecorativeBackground />
      
      {/* Merged Vision, Mission & Objectives Section */}
      <div className="w-full max-w-[1200px] mx-auto py-16 lg:py-24">
        <SectionHeading 
          label={isNp ? 'हाम्रो मार्गदर्शन' : 'Our Guiding Strategy'} 
          heading={isNp ? 'दृष्टिकोण, लक्ष्य र उद्देश्यहरू' : 'Vision, Mission & Objectives'} 
          centered={true} 
        />

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
        >
          {/* 1. Vision Card */}
          {!!visionText && (
            <motion.div 
              variants={cardVariants}
              className="bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary-blue mb-6 group-hover:bg-primary-blue group-hover:text-white transition-colors duration-300">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {isNp ? 'हाम्रो दृष्टिकोण' : 'Our Vision'}
              </h3>
              <p className="text-gray-655 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                {visionText}
              </p>
            </motion.div>
          )}

          {/* 2. Mission Card */}
          {!!missionText && (
            <motion.div 
              variants={cardVariants}
              className="bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-primary-red mb-6 group-hover:bg-primary-red group-hover:text-white transition-colors duration-300">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {isNp ? 'हाम्रो लक्ष्य' : 'Our Mission'}
              </h3>
              <p className="text-gray-655 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                {missionText}
              </p>
            </motion.div>
          )}

          {/* 3. Objectives Card */}
          {(!!objectivesText || (objectives && objectives.length > 0)) && (
            <motion.div 
              variants={cardVariants}
              className="bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary-blue mb-6 group-hover:bg-primary-blue group-hover:text-white transition-colors duration-300">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {isNp ? 'हाम्रा उद्देश्यहरू' : 'Our Objectives'}
              </h3>
              {objectivesText ? (
                <p className="text-gray-655 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                  {objectivesText}
                </p>
              ) : (
                <ul className="text-left list-disc pl-5 space-y-2 text-gray-655 dark:text-gray-300 text-sm">
                  {objectives.map((obj, i) => (
                    <li key={i}>{obj.title?.[locale]}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* 4. Core Values Grid */}
      <AboutCoreValues coreValues={coreValues} locale={locale} />
    </div>
  );
}
