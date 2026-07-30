'use client';

import React from 'react';
import Image from 'next/image';

export default function TimelineMedia({ media, title }) {
  if (!media?.url) return null;

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-t-3xl">
      <Image
        src={media.url}
        alt={media.alt || title || 'Timeline Media'}
        fill
        loading="lazy"
        className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}
