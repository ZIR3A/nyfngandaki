"use client";

import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { motion } from "framer-motion";

export function CompactMemberCard({ member, isNepali }) {
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
      className="bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800/60 hover:border-blue-500/30 dark:hover:border-blue-500/30 rounded-[1.5rem] p-4 shadow-sm hover:shadow-md transition-all group cursor-pointer h-full"
    >
      <Link href={`/${isNepali ? "np" : "en"}/members/${member.slug}`} className="w-full h-full flex flex-col items-center text-center">
        <div className="w-20 h-20 relative rounded-full overflow-hidden mb-3 bg-gray-100 dark:bg-gray-800 flex-shrink-0">
          {member.photo || member.profilePhotoId ? (
            <div className="w-full h-full relative overflow-hidden group-hover:scale-105 transition-transform duration-500 ease-out">
              <Image 
                src={member.photo || "/placeholder.jpg"} 
                alt={name} 
                fill
                className="object-cover object-top" 
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-500 ease-out">
              <User className="w-8 h-8" />
            </div>
          )}
        </div>
        
        <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2">
          {name}
        </h3>
        <p className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
          {position}
        </p>
      </Link>
    </motion.div>
  );
}
