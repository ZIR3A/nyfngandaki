"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/localization/LanguageContext";

export default function FeaturedLeadership({ dictionary, featuredMembers = [] }) {
  const dict = dictionary.home.leadership;
  const { language } = useLanguage();

  return (
    <section className="py-24 bg-white dark:bg-[#0A0F1C] relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#153E90 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      
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

        {featuredMembers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
             <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm mb-4 text-slate-400 dark:text-slate-500">
               <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
               </svg>
             </div>
             <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">{dict.emptyTitle}</h3>
             <p className="text-slate-500 dark:text-slate-400">{dict.emptyDesc}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {featuredMembers.slice(0, 10).map((member, idx) => (
              <motion.div 
                key={member._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
              >
                <Link href={`/${language === 'np' ? 'np' : 'en'}/members/${member.slug || member._id}`} className="flex flex-col h-full">
                  {/* Portrait */}
                  <div className="relative h-48 sm:h-56 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                     {member.photo ? (
                        <Image 
                          src={member.photo} 
                          alt={member.name[language] || member.name.en} 
                          fill
                          className="object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <span className="font-medium text-sm">No Photo</span>
                        </div>
                     )}
                     
                     {/* Hover Overlay */}
                     <div className="absolute inset-0 bg-gradient-to-t from-[#153E90]/90 via-[#153E90]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                        <span className="text-white font-bold text-sm flex items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          View Profile <ArrowRight className="ml-1.5 w-4 h-4" />
                        </span>
                     </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 text-center flex-1 flex flex-col items-center justify-center relative">
                    {/* Decorative Red Accent Line */}
                    <div className="w-8 h-1 bg-[#D81E27] mx-auto rounded-full mb-3"></div>

                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1">
                      {member.name[language] || member.name.en}
                    </h3>
                    <p className="text-[#153E90] dark:text-blue-400 text-xs sm:text-sm font-semibold mb-2 line-clamp-1">
                      {member.position?.[language] || member.position?.en}
                    </p>
                    
                    {member.district && (
                      <p className="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-auto pt-2">
                        {member.district.name?.[language] || member.district.name?.en}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
           <Link href="/members" className="inline-flex items-center justify-center px-8 py-3.5 bg-blue-600 hover:bg-[#D81E27] text-white rounded-full font-semibold transition-all duration-300 shadow-[0_10px_35px_rgba(21,62,144,0.3)] hover:-translate-y-0.5 group cursor-pointer">
              {dict.button}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>

      </div>
    </section>
  );
}
