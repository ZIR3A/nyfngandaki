"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/localization/LanguageContext";
import { en } from "@/localization/dictionaries/en";
import { np } from "@/localization/dictionaries/np";
import { Star, Quote, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import LeadershipEmptyState from "@/features/leadership-messages/components/public/LeadershipEmptyState";

const MessageArticle = ({ msg, index, dictionary, isNepali }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const isEven = index % 2 === 0;
  const member = msg.member_id;
  
  const name = msg.is_custom_person 
    ? (isNepali ? (msg.custom_name_np || msg.custom_name_en) : (msg.custom_name_en || msg.custom_name_np))
    : (isNepali ? (member?.name?.np || member?.name?.en) : (member?.name?.en || member?.name?.np));
    
  const position = msg.is_custom_person
    ? (isNepali ? (msg.custom_position_np || msg.custom_position_en) : (msg.custom_position_en || msg.custom_position_np))
    : (isNepali ? (member?.position_id?.name?.np || member?.position_id?.name?.en) : (member?.position_id?.name?.en || member?.position_id?.name?.np));
    
  const photoUrl = msg.is_custom_person ? msg.custom_photo : member?.photo;
  
  const fullMessage = isNepali ? (msg.full_message_np || msg.full_message_en) : (msg.full_message_en || msg.full_message_np);
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-16 items-start bg-slate-50/50 dark:bg-slate-900/20 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/50 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500`}
    >
      {/* Portrait & Designation Side */}
      <figure className="w-full md:w-1/3 flex-shrink-0 flex flex-col items-center group">
        <div className="relative w-40 h-40 md:w-56 md:h-56 mb-8">
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          {photoUrl ? (
            <div className="w-full h-full relative overflow-hidden rounded-full border-4 border-white dark:border-slate-900 shadow-md z-10 group-hover:scale-105 transition-transform duration-500">
              <Image 
                src={photoUrl} 
                alt={name || "Leader"} 
                fill
                className="object-cover object-top" 
                sizes="(max-width: 768px) 160px, 224px"
              />
            </div>
          ) : (
            <div className="w-full h-full rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-5xl border-4 border-white dark:border-slate-900 shadow-md relative z-10 group-hover:scale-105 transition-transform duration-500">
              {name?.charAt(0) || "U"}
            </div>
          )}
        </div>
        
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{name}</h3>
          <p className="text-[#D81E27] dark:text-red-400 font-medium">{position || 'Leader'}</p>
          {(member?.district?.name?.en || member?.district?.name?.np) && (
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              {isNepali ? (member.district?.name?.np || member.district?.name?.en) : (member.district?.name?.en || member.district?.name?.np)}
            </p>
          )}
        </div>
      </figure>

      {/* Content Side */}
      <div className="w-full md:w-2/3 flex flex-col pt-4">
        {msg.featured && (
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-yellow-100/50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-500 text-sm font-bold tracking-wider uppercase border border-yellow-200/50 dark:border-yellow-900/30">
              <Star className="w-4 h-4" />
              {dictionary?.common?.featured || (isNepali ? 'विशेष' : 'Featured')}
            </span>
          </div>
        )}
        
        <Quote className="w-10 h-10 text-[#153E90] dark:text-blue-400 opacity-20 mb-6" />
        
        <div className="relative">
          <div 
            className={`prose prose-lg prose-slate dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 font-light whitespace-pre-wrap prose-headings:text-slate-900 dark:prose-headings:text-slate-100 prose-a:text-blue-600 dark:prose-a:text-blue-400 overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[5000px]' : 'max-h-[250px]'}`}
            dangerouslySetInnerHTML={{ __html: fullMessage }}
          />
          
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 dark:from-slate-950/80 to-transparent pointer-events-none" />
          )}
        </div>
        
        <div className="mt-8">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 text-[#153E90] dark:text-blue-400 font-semibold hover:text-[#D81E27] dark:hover:text-red-400 transition-colors group"
          >
            {isExpanded 
              ? (isNepali ? 'कम देखाउनुहोस्' : 'Read Less') 
              : (isNepali ? 'थप पढ्नुहोस्' : 'Read More')}
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            ) : (
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default function AboutLeadershipMessages({ messages = [] }) {
  const { language } = useLanguage();
  const dictionary = language === 'np' ? np : en;
  const isNepali = language === 'np';

  return (
    <section id="leadership-messages" className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
            {dictionary?.common?.leadershipMessages || "Leadership Messages"}
          </h2>
          <div className="w-24 h-1 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {dictionary?.common?.leadershipMessagesSubtitle || "Our leaders share their vision, commitment, and dedication toward empowering the youth of Nepal."}
          </p>
        </motion.div>

        {/* Dynamic State: Empty vs List */}
        {(!messages || messages.length === 0) ? (
          <LeadershipEmptyState />
        ) : (
          <div className="space-y-16">
            {messages.map((msg, index) => (
              <MessageArticle 
                key={msg._id} 
                msg={msg} 
                index={index} 
                dictionary={dictionary} 
                isNepali={isNepali} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
