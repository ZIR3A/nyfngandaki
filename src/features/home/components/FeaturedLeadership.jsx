"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/localization/LanguageContext";
import { MemberCard } from "@/features/members/components/MemberCard";

export default function FeaturedLeadership({ dictionary, featuredMembers = [] }) {
  const dict = dictionary.home.leadership;
  const { language } = useLanguage();
  const isNepali = language === 'np';

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
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {featuredMembers.slice(0, 10).map((member, idx) => (
              <motion.div 
                key={member._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col w-[calc(50%-8px)] sm:w-[calc(33.333%-11px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] xl:w-[calc(20%-20px)]"
              >
                <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col h-full justify-center">
                   <MemberCard member={member} isNepali={isNepali} hideActions={true} noShadow={true} />
                </div>
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
