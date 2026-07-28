"use client";

import { motion } from "framer-motion";
import { FileText, Download, Eye, FileDown } from "lucide-react";
import { useLanguage } from "@/localization/LanguageContext";

export default function ResourcesSection({ dictionary, resources = [] }) {
  const { language } = useLanguage();

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#07152D] to-[#102C69]">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#153E90] rounded-full blur-[150px] opacity-30 -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-6 max-w-[1320px] relative z-10">
        
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-blue-300 text-sm font-bold uppercase tracking-[0.2em] mb-4">
            {language === 'en' ? "OFFICIAL RESOURCES" : "आधिकारिक स्रोतहरू"}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white max-w-2xl mb-4">
            {language === 'en' ? "Important Documents & Downloads" : "महत्त्वपूर्ण कागजात र डाउनलोडहरू"}
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl">
            {language === 'en' ? "Access the official constitution, membership forms, and organization rules." : "आधिकारिक विधान, सदस्यता फारम, र संगठन नियमहरू पहुँच गर्नुहोस्।"}
          </p>
        </div>

        {resources.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-24 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 text-white">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-4">
                 <FileDown className="w-10 h-10 text-blue-300" />
              </div>
              <h3 className="text-xl font-bold">{language === 'en' ? 'No Resources Available' : 'कुनै स्रोतहरू उपलब्ध छैनन्'}</h3>
              <p className="text-blue-200 mt-2">{language === 'en' ? 'Official documents will be uploaded here soon.' : 'आधिकारिक कागजातहरू चाँडै यहाँ अपलोड गरिनेछ।'}</p>
           </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {resources.map((resource, idx) => (
              <motion.div 
                key={resource._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[24px] p-8 hover:bg-white/15 transition-all duration-300 group flex flex-col md:flex-row items-start md:items-center gap-6"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D81E27] to-red-800 flex items-center justify-center shadow-lg shrink-0 group-hover:scale-105 transition-transform">
                   <FileText className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                   <div className="flex items-center gap-2 mb-2">
                     <h3 className="text-xl font-bold text-white leading-tight">
                       {resource.title[language] || resource.title.en}
                     </h3>
                     {/* Badges */}
                     {resource.badges && resource.badges.map(badge => (
                        <span key={badge} className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30">
                          {badge}
                        </span>
                     ))}
                   </div>
                   
                   <p className="text-blue-100 text-sm line-clamp-2 mb-4">
                     {resource.description?.[language] || resource.description?.en}
                   </p>

                   <div className="flex flex-wrap items-center gap-4 mt-auto">
                     <span className="text-xs font-bold text-blue-300 bg-blue-900/50 px-3 py-1.5 rounded-lg border border-blue-800/50">
                       {resource.fileSize || "PDF Document"}
                     </span>
                     
                     <div className="flex items-center gap-3 ml-auto">
                        <a href={resource.fileUrl} target="_blank" rel="noreferrer" className="flex items-center text-sm font-semibold text-white hover:text-[#D81E27] transition-colors">
                           <Eye className="w-4 h-4 mr-1.5" /> {language === 'en' ? 'Preview' : 'हेर्नुहोस्'}
                        </a>
                        <a href={resource.fileUrl} download className="flex items-center text-sm font-semibold bg-white text-[#153E90] hover:bg-[#D81E27] hover:text-white px-4 py-2 rounded-xl transition-colors shadow-md">
                           <Download className="w-4 h-4 mr-1.5" /> {language === 'en' ? 'Download' : 'डाउनलोड'}
                        </a>
                     </div>
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
