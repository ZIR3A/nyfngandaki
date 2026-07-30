'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AchievementCard from './AchievementCard';
import SectionHeading from '../Strategy/Shared/SectionHeading';

export default function AchievementGrid({ achievements, locale = 'en' }) {
  if (!achievements || achievements.length === 0) return null;

  const isNp = locale === 'np';
  const label = isNp ? 'à¤¹à¤¾à¤®à¥à¤°à¤¾ à¤‰à¤ªà¤²à¤¬à¥à¤§à¤¿à¤¹à¤°à¥‚' : 'Our Achievements';
  const heading = isNp ? 'à¤¹à¤¾à¤®à¥€à¤²à¥‡ à¤ªà¥à¤°à¤¾à¤ªà¥à¤¤ à¤—à¤°à¥‡à¤•à¤¾ à¤®à¥à¤–à¥à¤¯ à¤¸à¤«à¤²à¤¤à¤¾à¤¹à¤°à¥‚' : 'Milestones of Excellence';

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 mb-32 relative">
      <div className="mb-16">
        <SectionHeading label={label} heading={heading} centered={false} />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-y-8"
      >
        {achievements.map((achievement, index) => (
          <AchievementCard 
            key={achievement._id || index} 
            achievement={achievement} 
            locale={locale} 
            index={index} 
          />
        ))}
      </motion.div>
    </div>
  );
}
