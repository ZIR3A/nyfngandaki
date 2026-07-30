import React from 'react';
import Image from 'next/image';

export default function HeroBackground({ media, overlayOpacity = 0.6 }) {
  // Use CMS provided image or a fallback premium placeholder gradient
  const imageUrl = media?.url || null;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden -z-10 bg-slate-900">
      {imageUrl ? (
        <>
          <Image
            src={imageUrl}
            alt={media?.alt || "About NYFN Gandaki"}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={90}
          />
          {/* Overlay to ensure text readability */}
          <div 
            className="absolute inset-0 bg-slate-900" 
            style={{ opacity: overlayOpacity }}
          />
        </>
      ) : (
        /* Fallback premium gradient if no image */
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-red-900" />
      )}
      
      {/* Subtle bottom gradient to blend into the next section smoothly */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50 dark:from-slate-950 to-transparent pointer-events-none" />
    </div>
  );
}
