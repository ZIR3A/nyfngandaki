"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/localization/LanguageContext";

export default function ChairpersonSection({ dictionary, chairperson, hideLink = false }) {
  const { language } = useLanguage();
  const dict = dictionary.home.chairperson;

  const chairpersonName = chairperson?.name?.[language] || dict.name;
  const rawMessage = chairperson?.biography?.[language] || null;
  const isTruncated = rawMessage && rawMessage.length > 250;
  const chairpersonMessage = isTruncated
    ? rawMessage.substring(0, 250).trim() + "..."
    : rawMessage;
  const chairpersonImage = chairperson?.photo || null;

  return (
    <section id="chairperson" className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-[#F8FAFC] to-[#EAF1FF]">
      {/* Decorative Quote Watermark */}
      <div className="absolute top-10 left-10 opacity-5 pointer-events-none">
        <Quote className="w-[400px] h-[400px] text-[#153E90]" />
      </div>

      <div className="container mx-auto px-6 max-w-[1320px] relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[#153E90] text-sm font-bold uppercase tracking-[0.2em] mb-4">
            {dict.label}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 max-w-2xl">
            {dict.heading}
          </h2>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-[32px] p-8 md:p-12 shadow-[0_20px_60px_rgba(15,45,90,0.06)] border border-[#EAF1FF]">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-center">
            
            {/* Portrait */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="w-64 h-64 md:w-full md:h-80 relative rounded-2xl overflow-hidden shadow-lg bg-slate-100 mb-6 group">
                {chairpersonImage ? (
                  <Image 
                    src={chairpersonImage} 
                    alt={chairpersonName} 
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-slate-400 font-medium">Portrait (CMS)</span>
                  </div>
                )}
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900">{chairpersonName}</h3>
                <p className="text-[#D81E27] font-medium mt-1">{dict.position}</p>
                
                {/* Signature Placeholder */}
                <div className="mt-4 opacity-70">
                   <div className="h-12 w-32 border-b-2 border-gray-300 mx-auto flex items-end justify-center pb-1">
                      <span className="italic text-gray-400 font-serif text-lg">Signature</span>
                   </div>
                </div>
              </div>
            </motion.div>

            {/* Message */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col space-y-6"
            >
              <Quote className="w-10 h-10 text-[#153E90] opacity-20" />
              
              <div className="space-y-6 text-gray-700 text-lg md:text-xl leading-relaxed italic font-light whitespace-pre-wrap">
                {chairpersonMessage ? (
                  <p>{chairpersonMessage}</p>
                ) : (
                  <>
                    <p>{dict.msg1}</p>
                    <p>{dict.msg2}</p>
                  </>
                )}
              </div>

              <div className="pt-6">
                {!hideLink && (
                  <Link href={`/${language}/about#leadership`} className="inline-flex items-center text-[#153E90] font-semibold hover:text-[#D81E27] transition-colors group">
                    {dict.button}
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
