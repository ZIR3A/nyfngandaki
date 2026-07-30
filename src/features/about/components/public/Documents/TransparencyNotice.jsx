'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function TransparencyNotice({ notice, locale = 'en' }) {
  const isNp = locale === 'np';
  const heading = isNp ? 'पारदर्शिता र आधिकारिकता' : 'Transparency & Authenticity';
  const description = typeof notice?.[locale] === 'string' && notice[locale].trim() !== '' 
    ? notice[locale] 
    : (isNp 
      ? 'यहाँ उपलब्ध गराइएका सबै कागजातहरू आधिकारिक हुन् र नवीनतम संस्करणअनुसार अद्यावधिक गरिएका छन्।' 
      : 'All documents provided here are official organizational records, actively maintained and version-controlled for public transparency.');

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 mb-12">
      <div className="flex items-start gap-4 p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl">
        <div className="flex-shrink-0 mt-1">
          <ShieldCheck className="text-primary-blue h-6 w-6" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
            {heading}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
