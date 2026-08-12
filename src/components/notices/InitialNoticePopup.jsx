"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/localization/LanguageContext";
import Image from "next/image";

export function InitialNoticePopup() {
  const [notices, setNotices] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchAndCheckNotice = async () => {
      try {
        const res = await fetch("/api/public/notices/active");
        if (!res.ok) return;
        const result = await res.json();
        
        if (result.success && result.data && Array.isArray(result.data)) {
          // Filter to only notices that should show according to display rules
          const noticesToShow = result.data.filter(checkDisplayRules);
          
          if (noticesToShow.length > 0) {
            setNotices(noticesToShow);
            
            // Apply delay for the first notice
            const firstNotice = noticesToShow[0];
            const delayMs = (firstNotice.popupDelay || 2) * 1000;
            setTimeout(() => {
              setIsOpen(true);
            }, delayMs);
          }
        }
      } catch (error) {
        // Fail silently so we don't break the public UI
        console.error("Notice fetch error:", error);
      }
    };

    fetchAndCheckNotice();
  }, []);

  const checkDisplayRules = (activeNotice) => {
    const { id, displayFrequency } = activeNotice;
    const storageKey = `nyfn_notice_${id}`;
    
    try {
      if (displayFrequency === "once") {
        const hasSeen = localStorage.getItem(storageKey);
        return !hasSeen;
      } 
      else if (displayFrequency === "session") {
        const hasSeen = sessionStorage.getItem(storageKey);
        return !hasSeen;
      } 
      else if (displayFrequency === "daily") {
        const lastSeen = localStorage.getItem(storageKey);
        if (!lastSeen) return true;
        
        const lastDate = new Date(parseInt(lastSeen, 10));
        const today = new Date();
        return lastDate.toDateString() !== today.toDateString();
      } 
      else if (displayFrequency === "always") {
        return true;
      }
    } catch (e) {
      // If storage access fails (e.g., incognito restrictions), default to showing
      return true;
    }
    
    return true; // fallback
  };

  const handleClose = () => {
    setIsOpen(false);
    const notice = notices[currentIndex];
    if (!notice) return;
    
    const { id, displayFrequency } = notice;
    const storageKey = `nyfn_notice_${id}`;
    
    try {
      if (displayFrequency === "once") {
        localStorage.setItem(storageKey, "true");
      } 
      else if (displayFrequency === "session") {
        sessionStorage.setItem(storageKey, "true");
      } 
      else if (displayFrequency === "daily") {
        localStorage.setItem(storageKey, Date.now().toString());
      }
    } catch (e) {
      console.error("Failed to save notice state", e);
    }

    // Check if there are more notices to show
    if (currentIndex < notices.length - 1) {
      const nextNotice = notices[currentIndex + 1];
      const delayMs = (nextNotice.popupDelay || 0) * 1000;
      
      // Give a small default delay for smooth transition between popups
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setIsOpen(true);
      }, delayMs > 0 ? delayMs : 400); 
    }
  };

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, notices, currentIndex]);

  const notice = notices[currentIndex];
  if (!isOpen || !notice) return null;

  // Render content based on localized language, fallback to EN
  const t = (field) => notice[field]?.[language] || notice[field]?.en || "";

  const renderMedia = () => {
    if (!notice.attachments || notice.attachments.length === 0) return null;
    
    // Sort attachments by displayOrder
    const sortedAttachments = [...notice.attachments].sort((a, b) => a.displayOrder - b.displayOrder);

    return (
      <div className="space-y-4 mb-4">
        {sortedAttachments.map((media, index) => {
          if (media.type === "image" && media.storageId?.publicUrl) {
            return (
              <div key={index} className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden group bg-slate-100 dark:bg-slate-800">
                <Image 
                  src={media.storageId.publicUrl} 
                  alt={t('title')} 
                  fill
                  className="object-contain object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            );
          }
          if (media.type === "pdf" && media.storageId?.publicUrl) {
            return (
              <div key={index} className="w-full bg-slate-50 dark:bg-slate-800 rounded-lg p-4 flex items-center justify-between border border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded text-red-600 dark:text-red-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate max-w-[200px]">
                      {media.storageId.originalName || "Document.pdf"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {media.storageId.size ? `${(media.storageId.size / 1024 / 1024).toFixed(2)} MB` : 'PDF Document'}
                    </p>
                  </div>
                </div>
                <a 
                  href={media.storageId.publicUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-semibold bg-[#1546B0] text-white rounded hover:bg-blue-700 transition-colors"
                >
                  View PDF
                </a>
              </div>
            );
          }
          if (media.type === "video") {
            const url = media.storageId?.publicUrl || media.externalUrl;
            if (url) {
              const isYoutube = url.includes("youtube.com") || url.includes("youtu.be");
              if (isYoutube) {
                // Extract video ID for embed
                let videoId = "";
                if (url.includes("youtube.com/watch?v=")) videoId = url.split("v=")[1].split("&")[0];
                else if (url.includes("youtu.be/")) videoId = url.split("youtu.be/")[1].split("?")[0];
                
                return (
                  <div key={index} className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <iframe 
                      src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                      className="absolute inset-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
                    <video controls className="w-full h-full object-contain">
                      <source src={url} />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                );
              }
            }
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="notice-title"
    >
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={handleClose} />
      
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] transform transition-all animate-in fade-in zoom-in-95 duration-300"
      >
        {/* Header / Banner area depending on type */}
        <div className={`
          flex justify-between items-start p-4 border-b border-slate-100 dark:border-slate-800
          ${notice.priority === 'critical' ? 'bg-red-50 dark:bg-red-900/20' : ''}
        `}>
          <div>
            <h2 id="notice-title" className="text-xl font-bold text-slate-900 dark:text-white">
              {t('title')}
            </h2>
          </div>
          
          <button 
            onClick={handleClose}
            className="p-2 -mr-2 -mt-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close Notice"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto custom-scrollbar">
          {renderMedia()}
          
          {t('summary') && (
            <p className="font-medium text-slate-700 dark:text-slate-300 mb-4 text-sm md:text-base">
              {t('summary')}
            </p>
          )}
          
          {t('content') && (
            <div 
              className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-slate-600 dark:text-slate-400"
              dangerouslySetInnerHTML={{ __html: t('content') }}
            />
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end">
          <button 
            onClick={handleClose}
            className="px-6 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
