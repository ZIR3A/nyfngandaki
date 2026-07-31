"use client";

import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { motion } from "framer-motion";

export function FeaturedLeaderCard({ member, isNepali }) {
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
      className="flex flex-col items-center max-w-sm mx-auto group cursor-pointer"
    >
      <Link href={`/${isNepali ? "np" : "en"}/members/${member.slug}`} className="w-full flex flex-col items-center">
        
        {/* Photo Container */}
        <div className="relative">
          <div className="w-48 h-48 md:w-56 md:h-56 relative rounded-full overflow-hidden border-[6px] border-white shadow-xl z-10 transition-transform duration-500 group-hover:scale-105 bg-gray-100 flex-shrink-0">
            {member.photo || member.profilePhotoId ? (
              <Image 
                src={member.photo || "/placeholder.jpg"} 
                alt={name} 
                fill
                className="object-cover object-top" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <User className="w-20 h-20" />
              </div>
            )}
          </div>
          
          {/* Overlapping Badge */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
            <div className="bg-blue-100 text-blue-700 border border-blue-200 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-sm">
              {position}
            </div>
          </div>
        </div>
        
        {/* Text Container */}
        <div className="mt-8 text-center space-y-1">
          <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          <p className="text-base font-semibold text-slate-500">
            {position}
          </p>
        </div>
        
      </Link>
    </motion.div>
  );
}
