"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, Play } from "lucide-react";

export default function EventGallery({ images = [], videos = [], locale }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Combine all media items for a unified gallery experience
  const mediaItems = [...videos.map(v => ({...v, mediaType: 'video'})), ...images.map(i => ({...i, mediaType: 'image'}))];

  if (mediaItems.length === 0) return null;

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaItems.map((item, index) => {
          const title = locale === "np" && item.title?.np ? item.title.np : item.title?.en;
          const isVideo = item.mediaType === 'video';
          
          return (
            <div 
              key={`media-${index}`} 
              role="button"
              tabIndex={0}
              className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900"
              onClick={() => openLightbox(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(index);
                }
              }}
            >
              {isVideo ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                    <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                  </div>
                  <span className="text-white/70 text-sm mt-3 font-medium">Video</span>
                </div>
              ) : (
                <Image 
                  src={item.url} 
                  alt={title || "Event Gallery Image"} 
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
              )}
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                {!isVideo && <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Overlay */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center opacity-100 animate-in fade-in duration-200"
        >
          {/* Background Layer separated to fix iOS Safari iframe touch bug */}
          <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl -z-10" />
          
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl h-full py-12 md:py-8 px-0 md:px-8">
            {mediaItems.length > 1 && (
              <button 
                onClick={prevImage}
                className="hidden md:block shrink-0 z-50 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors mr-6"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}

            <div className="w-full md:flex-1 relative h-[65vh] md:h-[80vh] flex items-center justify-center">
              {mediaItems[currentIndex].mediaType === 'video' ? (
                <div className="w-full h-full relative overflow-hidden bg-black md:rounded-lg md:shadow-2xl">
                  {/* Normal iframe height to show Google Drive controls on all screens */}
                  <iframe 
                    src={`${mediaItems[currentIndex].url?.replace('/view', '/preview')}${mediaItems[currentIndex].url?.includes('?') ? '&' : '?'}autoplay=1&controls=0&?background=0`} 
                    className="absolute top-0 left-0 w-full h-full border-0 bg-black pointer-events-auto" 
                    allow="autoplay; fullscreen;"
                    allowFullScreen={false}
                  />
                </div>
              ) : (
                <Image 
                  src={mediaItems[currentIndex].url} 
                  alt="Gallery Preview" 
                  fill
                  sizes="100vw"
                  className="object-contain px-4 md:px-0" 
                />
              )}
            </div>

            {mediaItems.length > 1 && (
              <button 
                onClick={nextImage}
                className="hidden md:block shrink-0 z-50 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors ml-6"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}

            {/* Mobile Navigation controls below media */}
            {mediaItems.length > 1 && (
               <div className="flex md:hidden items-center justify-center gap-8 mt-8">
                 <button onClick={prevImage} className="p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                 </button>
                 <span className="text-white/80 font-medium text-lg">
                    {currentIndex + 1} / {mediaItems.length}
                 </span>
                 <button onClick={nextImage} className="p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors">
                    <ChevronRight className="w-6 h-6" />
                 </button>
               </div>
            )}
          </div>

          {/* Desktop counter */}
          <div className="hidden md:block absolute bottom-6 left-0 w-full text-center text-white/80 font-medium">
            {currentIndex + 1} / {mediaItems.length}
          </div>
        </div>
      )}
    </>
  );
}
