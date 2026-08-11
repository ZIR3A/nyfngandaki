"use client";

import { motion } from "framer-motion";
import { Network, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/localization/LanguageContext";

export default function OrganizationStructure() {
  const { language } = useLanguage();

  const structures = [
    { level: language === 'en' ? "National" : "राष्ट्रिय", title: language === 'en' ? "Central Committee" : "केन्द्रीय कमिटी" },
    { level: language === 'en' ? "Province" : "प्रदेश", title: language === 'en' ? "Province Committee" : "प्रदेश कमिटी" },
    { level: language === 'en' ? "District" : "जिल्ला", title: language === 'en' ? "District Committee" : "जिल्ला कमिटी" },
    { level: language === 'en' ? "Municipality" : "नगर/पालिका", title: language === 'en' ? "Municipality Committee" : "नगर/पालिका कमिटी" },
    { level: language === 'en' ? "Ward" : "वडा", title: language === 'en' ? "Ward Committee" : "वडा कमिटी" },
    { level: language === 'en' ? "Tole" : "टोल", title: language === 'en' ? "Tole Committee" : "टोल कमिटी" },
  ];

  const SHOW_ORGANIZATION_MODULE = false;

  return (
    <section className="py-16 md:py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1320px] relative z-10">
        
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[#153E90] dark:text-blue-400 text-sm font-bold uppercase tracking-[0.2em] mb-4">
            {language === 'en' ? "Organization Structure" : "संगठन संरचना"}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 dark:text-white max-w-2xl">
            {language === 'en' ? "How We Are Connected" : "हामी कसरी जोडिएका छौं"}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Animated SVG Connector Line */}
          <div className="absolute left-[40px] md:left-1/2 top-0 bottom-0 w-1 md:-ml-0.5 bg-blue-100 dark:bg-blue-900/30 hidden md:block">
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full bg-gradient-to-b from-[#153E90] via-[#2D63D8] to-[#153E90]"
            />
          </div>

          <div className="space-y-6 md:space-y-12">
            {structures.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-center justify-between w-full">
                  
                  {/* Connector Node */}
                  <div className="absolute left-[40px] md:left-1/2 -ml-3 md:-ml-4 w-6 h-6 md:w-8 md:h-8 bg-white dark:bg-slate-900 border-4 border-[#153E90] dark:border-blue-400 rounded-full z-10 hidden md:block">
                     <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.3 + 0.5 }}
                        className="w-full h-full bg-[#D81E27] rounded-full scale-50"
                     />
                  </div>

                  {/* Left Side (Desktop Only) */}
                  <div className={`hidden md:flex w-5/12 ${isEven ? 'pr-12 justify-end' : ''}`}>
                    {isEven && (
                      <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.3 }}
                        className="w-full"
                      >
                        <StructureCard item={item} align="right" />
                      </motion.div>
                    )}
                  </div>

                  {/* Right Side (Desktop Only) */}
                  <div className={`hidden md:flex w-5/12 ${!isEven ? 'pl-12 justify-start' : ''}`}>
                    {!isEven && (
                      <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.3 }}
                        className="w-full"
                      >
                        <StructureCard item={item} align="left" />
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Mobile Only Rendering */}
                  <div className="w-full block md:hidden">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.2 }}
                      >
                        <StructureCard item={item} align="center" />
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {SHOW_ORGANIZATION_MODULE && (
          <div className="mt-16 text-center">
             <Link href="/committee" className="inline-flex items-center justify-center px-8 py-3.5 bg-transparent border-2 border-[#153E90] dark:border-blue-400 text-[#153E90] dark:text-blue-400 hover:bg-[#153E90] dark:hover:bg-blue-400 hover:text-white dark:hover:text-[#0A0F1C] rounded-full font-semibold transition-all duration-300 group">
                {language === 'en' ? "View Complete Structure" : "पूर्ण संरचना हेर्नुहोस्"}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function StructureCard({ item, align }) {
  return (
    <div className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white dark:border-slate-800 rounded-[24px] p-8 shadow-[0_10px_35px_rgba(15,45,90,0.06)] hover:shadow-[0_15px_40px_rgba(15,45,90,0.12)] transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 dark:from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative z-10">
        <div className={`mb-4 flex ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'}`}>
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-[#153E90] dark:text-blue-400 group-hover:bg-[#153E90] dark:group-hover:bg-blue-400 group-hover:text-white dark:group-hover:text-[#0A0F1C] transition-colors duration-300">
             <Network className="w-6 h-6" />
          </div>
        </div>
        <span className="text-[#D81E27] dark:text-red-400 text-sm font-bold uppercase tracking-wider mb-2 block">{item.level}</span>
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
      </div>
    </div>
  );
}
