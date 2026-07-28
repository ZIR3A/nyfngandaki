"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, FileText, Users, MapPin, Activity } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/localization/LanguageContext";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import React, { useCallback, useEffect, useState } from "react";

export default function HeroSection({ dictionary, settings, banners = [] }) {
  const { language } = useLanguage();
  const dict = dictionary.home.hero;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 6000, stopOnInteraction: true })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Fallback banners if none provided
  const activeBanners = banners && banners.length > 0 ? banners : [
    {
      _id: "default-1",
      image: settings?.banner || "/placeholder-banner.jpg",
      title: {
        en: "Youth Leadership",
        np: "युवा नेतृत्व"
      },
      subtitle: {
        en: "Building the Future",
        np: "भविष्यको निर्माण"
      },
      description: {
        en: "Working for democracy, social justice, and economic prosperity.",
        np: "लोकतन्त्र, सामाजिक न्याय र आर्थिक समृद्धिका लागि काम गर्दै।"
      },
      primaryButtonText: { en: "About Us", np: "हाम्रो बारे" },
      primaryButtonLink: "/about",
      secondaryButtonText: { en: "Our Vision", np: "हाम्रो दृष्टिकोण" },
      secondaryButtonLink: "/about#vision",
    }
  ];

  // Dynamic stats
  let stats = [];
  if (settings?.stats && settings.stats.length > 0) {
    stats = settings.stats.map(s => ({
      value: s.value,
      label: s.label?.[language] || "",
      icon: <Activity className="w-6 h-6 text-blue-600" />
    }));
  } else {
    stats = [
      { value: "2,540+", label: language === 'en' ? "Active Members" : "सक्रिय सदस्यहरू", sublabel: language === 'en' ? "Province Wide" : "गण्डकी प्रदेशभर", icon: <Users className="w-8 h-8 text-blue-600" /> },
      { value: "85+", label: language === 'en' ? "Committees" : "समितिहरू", sublabel: language === 'en' ? "District & Local" : "जिल्ला र स्थानीय तह", icon: <MapPin className="w-8 h-8 text-blue-600" /> },
      { value: "230+", label: language === 'en' ? "Programs Hosted" : "आयोजित कार्यक्रमहरू", sublabel: language === 'en' ? "Youth Development" : "युवा विकास", icon: <Activity className="w-8 h-8 text-blue-600" /> },
      { value: "120+", label: language === 'en' ? "Documents" : "कागजातहरू", sublabel: language === 'en' ? "Guidelines & Policies" : "दिशानिर्देश र नीतिहरू", icon: <FileText className="w-8 h-8 text-blue-600" /> },
    ];
  }

  return (
    <section className="relative w-full flex flex-col bg-[#F8FAFC]">
      {/* Top Banner Slider Area */}
      <div className="relative w-full h-[45vh] md:h-[50vh] lg:h-[55vh] bg-[#102C69] overflow-hidden">
        
        {/* Background Images Slider */}
        <div className="absolute inset-0 z-0" ref={emblaRef}>
          <div className="flex h-full touch-pan-y">
            {activeBanners.map((banner) => (
              <div key={banner._id} className="relative flex-[0_0_100%] h-full">
                <Image 
                  src={banner.imageUrl || banner.image || "/placeholder-banner.jpg"} 
                  alt={banner.title?.[language] || "Banner Image"}
                  fill 
                  className="object-cover"
                  priority
                />
              </div>
            ))}
          </div>
        </div>

        {/* Fixed Gradient Overlay OVER images but UNDER text */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10 pointer-events-none"></div>

        {/* Active Banner Content (Static Position, Fades on change) */}
        <div className="absolute inset-0 flex items-center z-20 pointer-events-none">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full">
            <motion.div 
              key={selectedIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl text-white pointer-events-auto"
            >
              {activeBanners[selectedIndex] && (
                <>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-2">
                    {activeBanners[selectedIndex].title?.[language]}
                  </h2>
                  {activeBanners[selectedIndex].subtitle?.[language] && (
                    <h3 className="text-2xl md:text-3xl font-bold text-amber-400 mb-6">
                      {activeBanners[selectedIndex].subtitle?.[language]}
                    </h3>
                  )}
                  {activeBanners[selectedIndex].description?.[language] && (
                    <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
                      {activeBanners[selectedIndex].description?.[language]}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4">
                    {activeBanners[selectedIndex].primaryButtonText?.[language] && (
                      <Link href={activeBanners[selectedIndex].primaryButtonLink || "/about"} className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-3.5 bg-white text-[#153E90] hover:bg-gray-100 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl group">
                        {activeBanners[selectedIndex].primaryButtonText?.[language]}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}
                    
                    {activeBanners[selectedIndex].secondaryButtonText?.[language] && (
                      <Link href={activeBanners[selectedIndex].secondaryButtonLink || "/about"} className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-3.5 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-full font-bold transition-all duration-300">
                        {activeBanners[selectedIndex].secondaryButtonText?.[language]}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>

        {/* Carousel Controls */}
        {activeBanners.length > 1 && (
          <>
            <button 
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-all z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={scrollNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-all z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
              {activeBanners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === selectedIndex ? "w-6 h-2 bg-[#D81E27]" : "w-2 h-2 bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Welcome & Stats Section (Visible on first screen) */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-6">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 md:p-6 flex flex-col xl:flex-row gap-6 items-center">
          
          {/* Welcome Text Left */}
          <div className="w-full xl:w-1/3 space-y-2 text-center xl:text-left">
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 leading-tight">
              {language === 'en' ? (
                <>Welcome to <span className="text-[#153E90]">NYFN Gandaki</span></>
              ) : (
                <>रा.यु.संघ. – <span className="text-[#153E90]">गण्डकीमा स्वागत छ</span></>
              )}
            </h2>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed max-w-lg mx-auto xl:mx-0">
              {language === 'en' 
                ? "National Youth Federation Nepal (NYFN) Gandaki is committed to building responsible, disciplined, and patriotic youth."
                : "राष्ट्रिय युवा संघ नेपाल (रा.यु.संघ.) गण्डकी जिम्मेवार, अनुशासित र देशभक्त युवा निर्माण गर्न प्रतिबद्ध छ।"}
            </p>
            <div className="flex flex-wrap items-center justify-center xl:justify-start gap-2 pt-1">
              <Link href="/about" className="inline-flex items-center justify-center px-4 py-2 bg-[#153E90] hover:bg-blue-800 text-white rounded-full text-xs font-semibold transition-all shadow-md group">
                {language === 'en' ? "About Us" : "हाम्रो बारे"}
                <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/about#vision" className="inline-flex items-center justify-center px-4 py-2 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-700 rounded-full text-xs font-semibold transition-all">
                {language === 'en' ? "Our Vision" : "हाम्रो दृष्टिकोण"}
                <ArrowRight className="ml-1.5 w-3.5 h-3.5 text-gray-400" />
              </Link>
            </div>
          </div>

          {/* Stats Cards Right */}
          <div className="w-full xl:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.4 }}
                className="bg-slate-50 rounded-xl p-3 md:p-4 flex flex-col items-center text-center border border-slate-100 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="bg-white p-2 rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform duration-300">
                  {/* Clone the icon and reduce its size */}
                  {React.cloneElement(stat.icon, { className: "w-5 h-5 text-blue-600" })}
                </div>
                <h4 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-0.5">{stat.value}</h4>
                <p className="text-xs md:text-sm font-bold text-gray-600 mb-0">{stat.label}</p>
                {stat.sublabel && (
                  <p className="text-[10px] md:text-xs text-gray-400 font-medium">{stat.sublabel}</p>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
