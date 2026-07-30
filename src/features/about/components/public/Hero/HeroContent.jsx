'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function HeroContent({ heroData, orgData, locale = 'en' }) {
  const isNp = locale === 'np';
  
  // Map data from CMS API
  const title = heroData?.title?.[locale] || (isNp ? 'à¤°à¤¾à¤·à¥à¤Ÿà¥à¤°à¤¿à¤¯ à¤¯à¥à¤µà¤¾ à¤¸à¤‚à¤˜ à¤¨à¥‡à¤ªà¤¾à¤²' : 'National Youth Federation Nepal');
  const subtitle = heroData?.subtitle?.[locale] || (isNp ? 'à¤—à¤£à¥à¤¡à¤•à¥€ à¤ªà¥à¤°à¤¦à¥‡à¤¶ à¤•à¤®à¤¿à¤Ÿà¥€' : 'Gandaki Province Committee');
  const description = orgData?.whoWeAre?.[locale] || 
    (isNp ? 
      'à¤¯à¥à¤µà¤¾à¤¹à¤°à¥à¤•à¥‹ à¤¹à¤•, à¤¹à¤¿à¤¤ à¤° à¤…à¤§à¤¿à¤•à¤¾à¤°à¤•à¥‹ à¤¸à¥à¤¨à¤¿à¤¶à¥à¤šà¤¿à¤¤à¤¤à¤¾ à¤—à¤°à¥à¤¦à¥ˆ à¤¸à¤®à¥ƒà¤¦à¥à¤§ à¤°à¤¾à¤·à¥à¤Ÿà¥à¤° à¤¨à¤¿à¤°à¥à¤®à¤¾à¤£à¤®à¤¾ à¤¸à¤®à¤°à¥à¤ªà¤¿à¤¤ à¤à¤• à¤…à¤—à¥à¤°à¤£à¥€ à¤¯à¥à¤µà¤¾ à¤¸à¤‚à¤—à¤ à¤¨à¥¤' : 
      'A leading youth organization dedicated to ensuring the rights and welfare of the youth while building a prosperous nation.');

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
  };

  return (
    <div className="max-w-[700px]">
      <motion.h2 
        variants={itemVariants}
        className="text-lg md:text-xl font-semibold text-red-400 mb-2 md:mb-4 tracking-wide uppercase"
      >
        {subtitle}
      </motion.h2>
      
      <motion.h1 
        variants={itemVariants}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
      >
        {title}
      </motion.h1>
      
      <motion.p 
        variants={itemVariants}
        className="text-lg md:text-xl text-white/80 leading-relaxed max-w-[650px]"
      >
        {description}
      </motion.p>
    </div>
  );
}
