"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/localization/LanguageContext";

import EventCard from "@/features/events/components/public/EventCard";

export default function EventsSection({ dictionary, events = [] }) {
  const dict = dictionary.home.events;
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

        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-blue-50/50 dark:bg-slate-900/50 rounded-3xl border border-blue-100 dark:border-slate-800">
             <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm mb-4 text-blue-300 dark:text-blue-500">
               <Calendar className="w-10 h-10" />
             </div>
             <h3 className="text-xl font-bold text-gray-900 dark:text-white">{language === 'en' ? 'No Upcoming Events' : 'कुनै आगामी कार्यक्रम छैन'}</h3>
             <p className="text-gray-500 dark:text-gray-400">{language === 'en' ? 'Check back later for new programs.' : 'नयाँ कार्यक्रमहरूको लागि पछि जाँच गर्नुहोस्।'}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {events.map((event, idx) => (
              <motion.div 
                key={event._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <EventCard event={event} locale={language} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
           <Link href="/events" className="inline-flex items-center justify-center px-8 py-3.5 bg-transparent border-2 border-[#153E90] dark:border-blue-400 text-[#153E90] dark:text-blue-400 hover:bg-[#153E90] dark:hover:bg-blue-400 hover:text-white dark:hover:text-[#0A0F1C] rounded-full font-semibold transition-all duration-300 group">
              {dict.button}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>

      </div>
    </section>
  );
}
