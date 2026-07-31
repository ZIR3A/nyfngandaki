"use client";

import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { motion } from "framer-motion";

export function LeadershipCard({ member, isNepali }) {
  const name = isNepali ? member.name?.np || member.name?.en : member.name?.en;
  let position = "";
  if (member.position_id && member.position_id.name) {
    position = isNepali ? member.position_id.name.np || member.position_id.name.en : member.position_id.name.en;
  } else if (member.position) {
    position = isNepali ? member.position.np || member.position.en : member.position.en;
  }

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="flex flex-col items-center max-w-[220px] mx-auto group cursor-pointer"
    >
      <Link href={`/${isNepali ? "np" : "en"}/members/${member.slug}`} className="w-full flex flex-col items-center">
        
        {/* Photo Container */}
        <div className="relative">
          <div className="w-24 h-24 md:w-32 md:h-32 relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-[4px] border-white shadow-xl z-10 transition-transform duration-500 group-hover:scale-105 bg-gray-100 flex-shrink-0">
            {member.photo || member.profilePhotoId ? (
              <Image 
                src={member.photo || "/placeholder.jpg"} 
                alt={name} 
                fill
                className="object-cover object-top" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <User className="w-12 h-12" />
              </div>
            )}
          </div>
          
          {/* Overlapping Badge */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
            <div className="bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-sm">
              {position}
            </div>
          </div>
        </div>
        
        {/* Text Container */}
        <div className="mt-8 text-center space-y-0.5">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {name}
          </h3>
        </div>
        
      </Link>
    </motion.div>
  );
}
