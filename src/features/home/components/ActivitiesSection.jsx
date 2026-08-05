"use client";

import { motion } from "framer-motion";
import { ArrowRight, HeartPulse } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/localization/LanguageContext";

import EventCard from "@/features/events/components/public/EventCard";

export default function ActivitiesSection({ dictionary, activities = [] }) {
  const dict = dictionary.home.activities;
  const { language } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1320px] relative z-10">
        
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[#153E90] dark:text-blue-400 text-sm font-bold uppercase tracking-[0.2em] mb-4">
            {dict.label}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 dark:text-white max-w-2xl mb-4">
            {dict.heading}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
            {dict.subheading}
          </p>
        </div>

        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 shadow-sm">
             <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400 dark:text-slate-500">
                <HeartPulse className="w-10 h-10" />
             </div>
             <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">{language === 'en' ? 'No Recent Activities' : 'कुनै पछिल्लो गतिविधि छैन'}</h3>
             <p className="text-slate-500 dark:text-slate-400 mt-2">{language === 'en' ? 'Social impact activities and events will appear here.' : 'सामाजिक प्रभाव गतिविधिहरू र कार्यक्रमहरू यहाँ देखिनेछन्।'}</p>
          </div>
        ) : (
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-6 px-6 md:-mx-12 md:px-12 lg:-mx-20 lg:px-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {activities.slice(0, 8).map((activity, idx) => (
              <motion.div 
                key={activity._id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="snap-center flex-shrink-0 w-[85vw] md:w-[420px] lg:w-[480px] h-auto flex flex-col"
              >
                <div className="h-full w-full">
                  <EventCard event={activity} locale={language} />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
           <Link href="/events" className="inline-flex items-center justify-center px-8 py-3.5 bg-transparent border-2 border-[#153E90] dark:border-blue-400 text-[#153E90] dark:text-blue-400 hover:bg-[#153E90] dark:hover:bg-blue-400 hover:text-white dark:hover:text-[#0A0F1C] rounded-full font-semibold transition-all duration-300 group cursor-pointer">
              {language === 'en' ? 'View All Events & Activities' : 'सबै कार्यक्रमहरू र गतिविधिहरू हेर्नुहोस्'}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>

      </div>
    </section>
  );
}
