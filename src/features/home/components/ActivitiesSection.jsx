"use client";

import { motion } from "framer-motion";
import { ArrowRight, HeartPulse } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/localization/LanguageContext";

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
             <p className="text-slate-500 dark:text-slate-400 mt-2">{language === 'en' ? 'Social impact activities will appear here once published.' : 'सामाजिक प्रभाव गतिविधिहरू प्रकाशित भएपछि यहाँ देखिनेछन्।'}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.slice(0, 3).map((activity, idx) => (
              <motion.div 
                key={activity._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-[24px] overflow-hidden shadow-[0_10px_35px_rgba(15,45,90,0.05)] hover:shadow-[0_20px_50px_rgba(15,45,90,0.12)] transition-all duration-500 group flex flex-col"
              >
                {/* Image */}
                <div className="relative h-64 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                   {activity.image ? (
                     <Image 
                       src={activity.image} 
                       alt={activity.title[language] || activity.title.en} 
                       fill
                       className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                     />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-500 font-medium">No Image</div>
                   )}
                   <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-[#153E90] dark:text-blue-400 shadow-sm uppercase tracking-wider">
                     {activity.type}
                   </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1 relative">
                   {/* Animated Top Border inside content */}
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#153E90] to-[#D81E27] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-[#153E90] dark:group-hover:text-blue-400 transition-colors">
                     {activity.title[language] || activity.title.en}
                   </h3>
                   
                   {activity.statistics && activity.statistics.value && (
                     <div className="flex items-center space-x-2 text-[#D81E27] dark:text-red-400 font-bold mb-4 bg-red-50 dark:bg-red-900/20 w-fit px-3 py-1 rounded-lg">
                        <span className="text-xl">{activity.statistics.value}</span>
                        <span className="text-sm text-red-800 dark:text-red-300">{activity.statistics.label?.[language] || activity.statistics.label?.en}</span>
                     </div>
                   )}
                   
                   <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-6">
                     {activity.description?.[language] || activity.description?.en}
                   </p>
                   
                   <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                     <Link href={`/activities/${activity._id}`} className="inline-flex items-center text-[#153E90] dark:text-blue-400 font-bold hover:text-[#D81E27] dark:hover:text-red-400 transition-colors group/link">
                        Read More
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                     </Link>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
