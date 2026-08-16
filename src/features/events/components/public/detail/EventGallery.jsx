"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, Play } from "lucide-react";

export default function EventGallery({ images = [], videos = [], locale }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Combine all media items for a unified gallery experience
  const mediaItems = [...videos.map(v => ({...v, mediaType: 'video'})), ...images.map(i => ({...i, mediaType: 'image'}))];
  
  // Touch state for swipe
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

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

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
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
              className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900"
              onClick={() => openLightbox(index)}
            >
              {isVideo ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900">
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
          className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center opacity-100 animate-in fade-in duration-200"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {mediaItems.length > 1 && (
            <button 
              onClick={prevImage}
              className="absolute left-6 z-50 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors hidden md:block"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          <div className="relative w-full max-w-5xl aspect-video mx-4 flex items-center justify-center">
            {mediaItems[currentIndex].mediaType === 'video' ? (
              <iframe 
                src={mediaItems[currentIndex].url?.replace('/view', '/preview')} 
                className="w-full h-full border-0 rounded-lg shadow-2xl" 
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <Image 
                src={mediaItems[currentIndex].url} 
                alt="Gallery Preview" 
                fill
                sizes="100vw"
                className="object-contain" 
              />
            )}
          </div>

          {mediaItems.length > 1 && (
            <button 
              onClick={nextImage}
              className="absolute right-6 z-50 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors hidden md:block"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          <div className="absolute bottom-6 left-0 w-full text-center text-white/80 font-medium">
            {currentIndex + 1} / {mediaItems.length}
          </div>
        </div>
      )}
    </>
  );
}
