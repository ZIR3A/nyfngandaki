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
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#153E90 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      
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

        {featuredMembers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-slate-400">
               <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
               </svg>
             </div>
             <h3 className="text-xl font-bold text-slate-700">{dict.emptyTitle}</h3>
             <p className="text-slate-500">{dict.emptyDesc}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMembers.slice(0, 6).map((member, idx) => (
              <motion.div 
                key={member._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-white/60 backdrop-blur-sm border-2 border-transparent hover:border-blue-100 rounded-[24px] overflow-hidden shadow-[0_10px_35px_rgba(15,45,90,0.04)] hover:shadow-[0_20px_50px_rgba(15,45,90,0.1)] transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                {/* Premium Gradient Border on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#153E90]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                {/* Portrait */}
                <div className="relative h-72 w-full bg-slate-100 overflow-hidden">
                   {member.photo ? (
                      <Image 
                        src={member.photo} 
                        alt={member.name[language] || member.name.en} 
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                   ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <span className="font-medium">No Photo</span>
                      </div>
                   )}
                   
                   {/* Hover Overlay with Socials */}
                   <div className="absolute inset-0 bg-gradient-to-t from-[#102C69]/90 via-[#102C69]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                      <div className="flex items-center space-x-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                         {member.socialLinks?.facebook && (
                           <a href={member.socialLinks.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/20 hover:bg-[#D81E27] backdrop-blur-md flex items-center justify-center text-white transition-colors">
                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                               <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                             </svg>
                           </a>
                         )}
                         {member.email && (
                           <a href={`mailto:${member.email}`} className="w-10 h-10 rounded-full bg-white/20 hover:bg-[#D81E27] backdrop-blur-md flex items-center justify-center text-white transition-colors">
                             <Mail className="w-5 h-5" />
                           </a>
                         )}
                      </div>
                   </div>
                </div>

                {/* Content */}
                <div className="p-6 text-center relative bg-white flex-1 flex flex-col">
                  {/* Decorative Red Accent Line */}
                  <div className="w-10 h-1 bg-[#D81E27] mx-auto rounded-full mb-4"></div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name[language] || member.name.en}</h3>
                  <p className="text-[#153E90] font-medium mb-3">{member.position?.[language] || member.position?.en}</p>
                  
                  {member.district && (
                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-6">
                      {member.district.name?.[language] || member.district.name?.en} District
                    </p>
                  )}

                  <div className="mt-auto">
                    <Link href={`/members/${member._id}`} className="text-sm font-bold text-[#153E90] hover:text-[#D81E27] uppercase tracking-wider flex items-center justify-center transition-colors">
                      View Profile <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
           <Link href="/committee" className="inline-flex items-center justify-center px-8 py-3.5 bg-blue-600 hover:bg-[#D81E27] text-white rounded-full font-semibold transition-all duration-300 shadow-[0_10px_35px_rgba(21,62,144,0.3)] hover:-translate-y-0.5 group">
              {dict.button}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>

      </div>
    </section>
  );
}
