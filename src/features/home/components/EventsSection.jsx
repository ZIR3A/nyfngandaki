"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/localization/LanguageContext";

export default function EventsSection({ dictionary, events = [] }) {
  const dict = dictionary.home.events;
  const { language } = useLanguage();

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1320px] relative z-10">
        
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[#153E90] text-sm font-bold uppercase tracking-[0.2em] mb-4">
            {dict.label}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 max-w-2xl mb-4">
            {dict.heading}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            {dict.subheading}
          </p>
        </div>

        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-blue-50/50 rounded-3xl border border-blue-100">
             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-blue-300">
               <Calendar className="w-10 h-10" />
             </div>
             <h3 className="text-xl font-bold text-gray-900">{language === 'en' ? 'No Upcoming Events' : 'कुनै आगामी कार्यक्रम छैन'}</h3>
             <p className="text-gray-500">{language === 'en' ? 'Check back later for new programs.' : 'नयाँ कार्यक्रमहरूको लागि पछि जाँच गर्नुहोस्।'}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.slice(0, 3).map((event, idx) => (
              <motion.div 
                key={event._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-white border border-gray-100 rounded-[24px] overflow-hidden shadow-[0_10px_35px_rgba(15,45,90,0.04)] hover:shadow-[0_20px_50px_rgba(15,45,90,0.12)] hover:border-blue-200 transition-all duration-500 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                   {event.coverImage ? (
                     <Image 
                       src={event.coverImage} 
                       alt={event.title[language] || event.title.en} 
                       fill
                       className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                     />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium bg-[#102C69]/5">No Image</div>
                   )}
                   
                   {/* Date Badge overlay */}
                   <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl text-center shadow-sm border border-white">
                     <div className="text-xs font-bold text-[#D81E27] uppercase leading-none mb-1">
                        {new Date(event.date).toLocaleDateString(language === 'en' ? 'en-US' : 'ne-NP', { month: 'short' })}
                     </div>
                     <div className="text-2xl font-black text-[#153E90] leading-none">
                        {new Date(event.date).getDate()}
                     </div>
                   </div>

                   {/* Status Badge */}
                   <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider backdrop-blur-sm ${
                     event.status === 'Upcoming' ? 'bg-[#16A34A]/90 text-white' : 
                     event.status === 'Ongoing' ? 'bg-[#EAB308]/90 text-white' : 
                     'bg-gray-800/90 text-white'
                   }`}>
                     {event.status}
                   </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1 relative bg-white">
                   {/* Decorative hover line */}
                   <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-[#153E90] to-[#D81E27] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                   <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-[#153E90] transition-colors line-clamp-2">
                     {event.title[language] || event.title.en}
                   </h3>
                   
                   <div className="space-y-2 mb-6">
                     {event.venue && (
                       <div className="flex items-start text-gray-600 text-sm">
                         <MapPin className="w-4 h-4 mr-2 text-[#153E90] shrink-0 mt-0.5" />
                         <span className="line-clamp-1">{event.venue[language] || event.venue.en}</span>
                       </div>
                     )}
                     <div className="flex items-center text-gray-600 text-sm">
                       <Clock className="w-4 h-4 mr-2 text-[#D81E27] shrink-0" />
                       <span>{new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                     </div>
                   </div>
                   
                   <p className="text-gray-600 line-clamp-3 mb-6 flex-1">
                     {event.description?.[language] || event.description?.en}
                   </p>
                   
                   <div className="mt-auto">
                     <Link href={`/events/${event.slug || event._id}`} className="flex items-center justify-between w-full py-3 px-6 bg-blue-50 text-[#153E90] hover:bg-[#153E90] hover:text-white rounded-xl font-bold transition-colors duration-300 group/btn">
                        View Details
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                     </Link>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
           <Link href="/events" className="inline-flex items-center justify-center px-8 py-3.5 bg-transparent border-2 border-[#153E90] text-[#153E90] hover:bg-[#153E90] hover:text-white rounded-full font-semibold transition-all duration-300 group">
              {dict.button}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>

      </div>
    </section>
  );
}
