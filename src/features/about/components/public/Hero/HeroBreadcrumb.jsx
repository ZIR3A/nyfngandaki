'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function HeroBreadcrumb({ locale = 'en' }) {
  const isNp = locale === 'np';
  const homeText = isNp ? 'à¤—à¥ƒà¤¹à¤ªà¥ƒà¤·à¥à¤ ' : 'Home';
  const aboutText = isNp ? 'à¤¹à¤¾à¤®à¥à¤°à¥‹ à¤¬à¤¾à¤°à¥‡à¤®à¤¾' : 'About Us';

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <motion.nav 
      variants={itemVariants}
      aria-label="Breadcrumb" 
      className="flex items-center text-sm font-medium text-white/80 mb-6"
    >
      <ol className="flex items-center space-x-2">
        <li>
          <Link 
            href={`/${locale}`} 
            className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-1"
          >
            {homeText}
          </Link>
        </li>
        <li>
          <ChevronRight className="w-4 h-4 text-white/60" aria-hidden="true" />
        </li>
        <li>
          <span className="text-white" aria-current="page">
            {aboutText}
          </span>
        </li>
      </ol>
    </motion.nav>
  );
}
