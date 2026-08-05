"use client";

import { motion } from "framer-motion";
import { FileText, Download, Eye, FileDown, BookOpen } from "lucide-react";
import { useLanguage } from "@/localization/LanguageContext";
import Link from "next/link";

export default function ResourcesSection({ dictionary, resources = [] }) {
  const { language } = useLanguage();

  const bidhanResource = {
    _id: 'bidhan-main-doc',
    title: { en: 'Official Constitution (Bidhan)', np: 'आधिकारिक विधान' },
    description: { 
      en: 'The supreme guiding document outlining the principles, organizational structure, and operational guidelines of NYFN.', 
      np: 'राष्ट्रिय युवा संघ नेपालको सिद्धान्त, सांगठनिक संरचना र कार्यसञ्चालन निर्देशिकाहरू रूपरेखा गर्ने सर्वोच्च मार्गदर्शक दस्तावेज।' 
    },
    badges: ['OFFICIAL', 'CONSTITUTION'],
    fileSize: 'Digital Reader',
    fileUrl: `/${language}/bidhan`,
    isInternal: true,
    icon: <BookOpen className="w-8 h-8 text-white" />
  };

  const allResources = [bidhanResource, ...resources];

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
            {language === 'en' ? "Access the official constitution and organization rules." : "आधिकारिक विधान र संगठन नियमहरू पहुँच गर्नुहोस्।"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {allResources.map((resource, idx) => (
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
                 {resource.icon || <FileText className="w-8 h-8 text-white" />}
              </div>

              {/* Content */}
              <div className="flex-1 w-full">
                 <div className="flex flex-wrap items-center gap-2 mb-2">
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
                   
                   <div className="flex items-center gap-3 ml-auto mt-2 sm:mt-0">
                      {resource.isInternal ? (
                        <Link href={resource.fileUrl} className="flex items-center text-sm font-semibold bg-white text-[#153E90] hover:bg-[#D81E27] hover:text-white px-4 py-2 rounded-xl transition-colors shadow-md whitespace-nowrap cursor-pointer">
                           <BookOpen className="w-4 h-4 mr-1.5" /> {language === 'en' ? 'Read Document' : 'कागजात पढ्नुहोस्'}
                        </Link>
                      ) : (
                        <>
                          <a href={resource.fileUrl} target="_blank" rel="noreferrer" className="flex items-center text-sm font-semibold text-white hover:text-[#D81E27] transition-colors whitespace-nowrap">
                             <Eye className="w-4 h-4 mr-1.5" /> {language === 'en' ? 'Preview' : 'हेर्नुहोस्'}
                          </a>
                          <a href={resource.fileUrl} download className="flex items-center text-sm font-semibold bg-white text-[#153E90] hover:bg-[#D81E27] hover:text-white px-4 py-2 rounded-xl transition-colors shadow-md whitespace-nowrap cursor-pointer">
                             <Download className="w-4 h-4 mr-1.5" /> {language === 'en' ? 'Download' : 'डाउनलोड'}
                          </a>
                        </>
                      )}
                   </div>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
