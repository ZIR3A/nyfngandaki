"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/localization/LanguageContext";

export default function OrganizationOverview({ dictionary, settings }) {
  const { language } = useLanguage();
  const dict = dictionary.home.overview;

  const features = [
    language === 'en' ? "Youth Leadership" : "युवा नेतृत्व",
    language === 'en' ? "Community Service" : "सामुदायिक सेवा",
    language === 'en' ? "National Development" : "राष्ट्रिय विकास",
    language === 'en' ? "Volunteer Network" : "स्वयंसेवक नेटवर्क"
  ];

  return (
    <section className="py-16 md:py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1320px]">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] md:aspect-[4/3] lg:aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(15,45,90,0.12)]">
               {settings?.aboutImage ? (
                 <div className="w-full h-full relative overflow-hidden group">
                   <Image 
                     src={settings.aboutImage} 
                     alt={dict.heading || "About Organization"} 
                     fill
                     className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out" 
                   />
                 </div>
               ) : (
                 <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                   <span className="text-slate-400 font-medium">Editorial Image (CMS Editable)</span>
                 </div>
               )}
            </div>
            
            {/* Decorative background blob */}
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-100 rounded-full blur-[80px] -z-10"></div>
          </motion.div>

          {/* Right: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col space-y-8 order-1 lg:order-2"
          >
            <div className="space-y-4">
              <span className="text-[#153E90] text-sm font-bold uppercase tracking-[0.2em]">
                {dict.label}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 leading-tight">
                {dict.heading}
              </h2>
            </div>

            <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
              <p>{dict.desc1}</p>
              <p>{dict.desc2}</p>
              <p>{dict.desc3}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#16A34A] flex-shrink-0" />
                  <span className="text-gray-800 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div>
              <Link href="/about" className="inline-flex items-center justify-center px-8 py-3.5 bg-white border border-[#153E90] text-[#153E90] hover:bg-[#153E90] hover:text-white rounded-full font-semibold transition-all duration-300 shadow-sm hover:shadow-[0_10px_35px_rgba(21,62,144,0.15)] group">
                {dict.button}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
