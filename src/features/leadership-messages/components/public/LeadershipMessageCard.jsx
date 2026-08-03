"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote, Star } from "lucide-react";

export default function LeadershipMessageCard({ message, dictionary, index = 0, onInteract }) {
  if (!message) return null;

  const member = message.member_id;
  const isNepali = dictionary?.locale === "np";
  
  const name = message.is_custom_person 
    ? (isNepali ? (message.custom_name_np || message.custom_name_en) : (message.custom_name_en || message.custom_name_np))
    : (isNepali ? (member?.name?.np || member?.name?.en) : (member?.name?.en || member?.name?.np));
    
  const position = message.is_custom_person
    ? (isNepali ? (message.custom_position_np || message.custom_position_en) : (message.custom_position_en || message.custom_position_np))
    : (isNepali ? (member?.position_id?.name?.np || member?.position_id?.name?.en) : (member?.position_id?.name?.en || member?.position_id?.name?.np));
    
  const photoUrl = message.is_custom_person ? message.custom_photo : member?.photo;

  const shortMessage = isNepali ? (message.short_message_np || message.short_message_en) : (message.short_message_en || message.short_message_np);

  const handleInteract = (action) => {
    if (onInteract) {
      onInteract({ action, messageId: message._id, memberName: name });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-2 transition-all duration-300"
    >
      {/* Featured Badge */}
      {message.featured && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-yellow-400 text-yellow-900 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
          <Star className="w-3 h-3 fill-yellow-900" />
          {dictionary?.common?.featured || (isNepali ? 'विशेष' : 'Featured')}
        </div>
      )}

      {/* Top Area: Avatar & Info */}
      <div className="p-8 pb-6 flex flex-col items-center text-center relative z-10">
        <div className="absolute top-4 right-4 text-blue-100 dark:text-slate-800">
          <Quote className="w-12 h-12 rotate-180 opacity-50" />
        </div>
        
        <div className="relative w-28 h-28 mb-6">
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          {photoUrl ? (
            <div className="w-full h-full relative overflow-hidden rounded-full border-4 border-white dark:border-slate-900 shadow-md z-10 group-hover:scale-105 transition-transform duration-500">
              <Image 
                src={photoUrl} 
                alt={name || "Leader"} 
                fill
                className="object-cover object-top" 
                sizes="112px"
              />
            </div>
          ) : (
            <div className="w-full h-full rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-3xl border-4 border-white dark:border-slate-900 shadow-md relative z-10 group-hover:scale-105 transition-transform duration-500">
              {name?.charAt(0) || "U"}
            </div>
          )}
        </div>
        
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full mb-3">
          {position || 'Leader'}
        </span>
        
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {name}
        </h3>
      </div>

      {/* Message Content */}
      <div className="px-8 pb-8 flex-1 flex flex-col">
        <p className="space-y-6 text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed italic font-light whitespace-pre-wrap line-clamp-4 relative z-10 mb-6">
          "{shortMessage}"
        </p>
        
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
          <Link 
            href={`/${dictionary?.locale || 'en'}/about#leadership-messages`}
            onClick={() => handleInteract("read_more")}
            className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 group/link cursor-pointer"
          >
            {dictionary?.common?.readFullMessage || (isNepali ? 'थप पढ्नुहोस्' : 'Read Full Message')}
            <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
