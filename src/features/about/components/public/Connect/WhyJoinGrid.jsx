'use client';

import React from 'react';
import { motion } from 'framer-motion';
import WhyJoinCard from './WhyJoinCard';
import SectionHeading from '../Strategy/Shared/SectionHeading';

export default function WhyJoinGrid({ items, locale = 'en' }) {
  if (!items || items.length === 0) return null;

  const isNp = locale === 'np';
  const label = isNp ? 'à¤¹à¤¾à¤®à¥€à¤¸à¤à¤— à¤œà¥‹à¤¡à¤¿à¤¨à¥à¤¹à¥‹à¤¸à¥' : 'Join The Movement';
  const heading = isNp ? 'à¤•à¤¿à¤¨ NYFN à¤®à¤¾ à¤†à¤¬à¤¦à¥à¤§ à¤¹à¥à¤¨à¥‡?' : 'Why Join NYFN?';

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 mb-32">
      <div className="mb-16 flex flex-col items-center text-center">
        <SectionHeading label={label} heading={heading} centered={true} />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {items.map((item, index) => (
          <WhyJoinCard key={item._id || index} reason={item} locale={locale} />
        ))}
      </motion.div>
    </div>
  );
}
