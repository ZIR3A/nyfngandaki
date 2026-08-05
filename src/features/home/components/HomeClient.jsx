"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { useLanguage } from "@/localization/LanguageContext";
import { en } from "@/localization/dictionaries/en";
import { np } from "@/localization/dictionaries/np";

// Import all the new modular homepage sections
import HeroSection from "./HeroSection";
import OrganizationOverview from "./OrganizationOverview";
import LeadershipMessagesSection from "./LeadershipMessagesSection";

import OrganizationStructure from "@/components/shared/OrganizationStructure";
import FeaturedLeadership from "./FeaturedLeadership";
import InteractiveDistrictMap from "./InteractiveDistrictMap";
import ActivitiesSection from "./ActivitiesSection";
import EventsSection from "./EventsSection";
import ResourcesSection from "./ResourcesSection";
import CTASection from "./CTASection";

// Narrative spacer to bridge sections in the storytelling flow
const NarrativeSpacer = ({ text, highlight }) => (
  <div className="w-full relative bg-slate-50 dark:bg-[#0A0F1C] py-16 md:py-28 flex justify-center items-center px-6 overflow-hidden group">
    <div className="absolute inset-0 z-0 opacity-15 dark:opacity-10 pointer-events-none overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full min-w-[400px] md:min-w-[500px] h-[400px] md:h-[500px]">
        <Image 
          src="/mpa.png" 
          alt="Gandaki Province Map Background" 
          fill
          className="object-contain object-center group-hover:scale-105 transition-transform duration-700 ease-out" 
        />
      </div>
    </div>
    
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-4xl text-center relative z-10"
    >
      <h3 className="text-2xl md:text-4xl font-light text-slate-800 dark:text-slate-300 leading-relaxed italic drop-shadow-sm">
        &ldquo;{text} <span className="font-bold text-[#153E90] dark:text-blue-400">{highlight}</span>&rdquo;
      </h3>
    </motion.div>
  </div>
);

export default function HomeClient({ 
  locale, 
  settings,
  chairperson,
  featuredMembers, 
  events, 
  activities,
  resources,
  districts,
  banners,
  leadershipMessages
}) {
  const { language } = useLanguage();
  const dictionary = language === 'np' ? np : en;
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0A0F1C] overflow-hidden relative">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#D81E27] z-50 origin-left"
        style={{ scaleX }}
      />

      {/* 1. Immersive Hero Experience */}
      <HeroSection dictionary={dictionary} settings={settings} banners={banners} />

      <NarrativeSpacer 
        text={language === 'en' ? "Our journey begins with a clear mission:" : "हाम्रो यात्रा एउटा स्पष्ट लक्ष्यबाट सुरु हुन्छ:"}
        highlight={language === 'en' ? "Empowering Youth for National Development." : "राष्ट्रिय विकासका लागि युवा सशक्तीकरण।"}
      />

      {/* 2. Organization Overview */}
      <div className="relative">
        <OrganizationOverview dictionary={dictionary} settings={settings} />
      </div>

      <NarrativeSpacer 
        text={language === 'en' ? "Guided by strong leadership, we build a" : "सशक्त नेतृत्वको मार्गदर्शनमा, हामी निर्माण गर्छौं"}
        highlight={language === 'en' ? "resilient and organized network." : "एक बलियो र संगठित सञ्जाल।"}
      />

      {/* Leadership Messages Preview (Replaces Chairperson Section) */}
      <LeadershipMessagesSection dictionary={dictionary} messages={leadershipMessages} />

      {/* 4. Organization Structure */}
      <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <OrganizationStructure dictionary={dictionary} />
      </div>

      {/* 5. Featured Leadership */}
      <FeaturedLeadership dictionary={dictionary} featuredMembers={featuredMembers} />

      <NarrativeSpacer 
        text={language === 'en' ? "Our impact stretches across every corner of" : "हाम्रो प्रभाव गण्डकी प्रदेशको हरेक कुनामा"}
        highlight={language === 'en' ? "Gandaki Province." : "फैलिएको छ।"}
      />

      {/* 6. Interactive District Map */}
      <InteractiveDistrictMap dictionary={dictionary} settings={settings} districts={districts} />

      <NarrativeSpacer 
        text={language === 'en' ? "Turning vision into reality through" : "निरन्तर कार्य र सामुदायिक सेवा मार्फत"}
        highlight={language === 'en' ? "continuous action and community service." : "दृष्टिकोणलाई यथार्थमा बदल्दै।"}
      />

      {/* 7. Social Impact Activities */}
      <ActivitiesSection dictionary={dictionary} activities={activities} />

      {/* 8. Upcoming Events */}
      <EventsSection dictionary={dictionary} events={events} />

      {/* 9. Official Resources */}
      <ResourcesSection dictionary={dictionary} resources={resources} />

      {/* 10. Call to Action */}
      <CTASection dictionary={dictionary} settings={settings} />
    </div>
  );
}
