"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/localization/LanguageContext";

export default function MissionVisionValues({ dictionary, settings }) {
  const { language } = useLanguage();
  const dict = dictionary.home.mission;

  // Use dynamic settings if available, fallback to dictionary
  const missionText = settings?.mission?.[language] || dict.missionText;
  const visionText = settings?.vision?.[language] || dict.visionText;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1440px] relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#D81E27] font-bold tracking-wider uppercase text-sm mb-4 block">
            {dict.label}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#111827] mb-6">
            {dict.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          
          {/* Mission Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative bg-[#F8FAFC] rounded-[32px] p-10 lg:p-14 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-2xl font-bold text-[#153E90] mb-6 flex items-center">
                <span className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mr-4 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                {dict.missionTitle}
              </h3>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8 flex-grow">
                {missionText}
              </p>
              
              <ul className="space-y-4 mb-8">
                 {[1, 2, 3].map(i => (
                    <li key={i} className="flex items-start">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-3 mt-1 shrink-0">✓</span>
                      <span className="text-gray-700">Strategic objective placeholder {i}</span>
                    </li>
                 ))}
              </ul>
              
              <Link href="/about#mission" className="inline-flex items-center font-bold text-[#153E90] hover:text-[#D81E27] transition-colors mt-auto">
                Read Full Mission <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative bg-[#153E90] rounded-[32px] p-10 lg:p-14 overflow-hidden text-white"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-500"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mr-4 text-blue-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </span>
                {dict.visionTitle}
              </h3>
              
              <p className="text-lg text-blue-100 leading-relaxed mb-8 flex-grow">
                {visionText}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <div className="text-2xl font-bold mb-1 text-white">2030</div>
                    <div className="text-sm text-blue-200">Vision Target</div>
                 </div>
                 <div className="bg-[#D81E27]/20 rounded-2xl p-4 border border-[#D81E27]/30">
                    <div className="text-2xl font-bold mb-1 text-white">100%</div>
                    <div className="text-sm text-red-200">Youth Engagement</div>
                 </div>
              </div>
              
              <Link href="/about#vision" className="inline-flex items-center font-bold text-white hover:text-blue-200 transition-colors mt-auto">
                Read Full Vision <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
