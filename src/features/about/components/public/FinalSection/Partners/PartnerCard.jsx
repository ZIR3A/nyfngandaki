'use client';

import React from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

export default function PartnerCard({ partner, locale = 'en' }) {
  const isNp = locale === 'np';
  const name = partner.name?.[locale];
  const description = partner.description?.[locale];
  const logoUrl = partner.logo?.url;
  
  if (!name || !logoUrl) return null;

  return (
    <div className="group relative flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl hover:border-primary-blue/30 dark:hover:border-primary-blue/30 transition-all duration-300 hover:shadow-md hover:shadow-primary-blue/5 h-48 md:h-56">
      
      {/* Grayscale to Color Reveal on Hover */}
      <div className="relative w-3/4 h-3/4 flex items-center justify-center grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
        <Image
          src={logoUrl}
          alt={name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 150px, 200px"
        />
      </div>

      {/* Hover Info Tooltip - Only on desktop */}
      <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none md:pointer-events-auto z-10 text-center">
        <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">{name}</h4>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 mb-3">{description}</p>
        )}
        {partner.website && (
          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-primary-blue hover:text-blue-700 pointer-events-auto"
          >
            {isNp ? 'à¤µà¥‡à¤¬à¤¸à¤¾à¤‡à¤Ÿ à¤­à¥à¤°à¤®à¤£ à¤—à¤°à¥à¤¨à¥à¤¹à¥‹à¤¸à¥' : 'Visit Website'} <ExternalLink size={12} />
          </a>
        )}
      </div>

    </div>
  );
}
