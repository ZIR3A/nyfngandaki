import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, User } from "lucide-react";

export function MemberCard({ member, isNepali }) {
  const name = isNepali ? member.name?.np || member.name?.en : member.name?.en;
  
  // Handle position resolution from populated object or fallback to string
  let position = "";
  if (member.position_id && member.position_id.name) {
    position = isNepali ? member.position_id.name.np || member.position_id.name.en : member.position_id.name.en;
  } else if (member.position) {
    position = isNepali ? member.position.np || member.position.en : member.position.en;
  }

  const profileUrl = `/${isNepali ? "np" : "en"}/members/${member.slug || member._id}`;
  const orgLevel = member.organizationLevel || "PROVINCE";
  const orgBadgeText = orgLevel === "PROVINCE" 
    ? (isNepali ? "प्रदेश कमिटी" : "Province Committee") 
    : (isNepali ? "जिल्ला कमिटी" : "District Committee");

  const districtName = member.district?.name 
    ? (isNepali ? member.district.name.np || member.district.name.en : member.district.name.en)
    : null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[20px] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300 group flex flex-col h-full cursor-pointer relative">
      <Link href={profileUrl} className="block relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
        {member.photo || member.profilePhotoId ? (
          <div className="w-full h-full relative overflow-hidden group">
            <Image 
              src={member.photo || "/placeholder.jpg"} 
              alt={name || "Member Photo"} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out cursor-pointer" 
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-600 bg-gray-50 dark:bg-gray-800 group-hover:scale-105 transition-transform duration-700 ease-out cursor-pointer">
            <User className="w-16 h-16" />
          </div>
        )}
        
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10 pointer-events-none">
          <span className={`inline-flex px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold backdrop-blur-md border ${
            orgLevel === 'PROVINCE' 
              ? 'bg-blue-600/90 text-white border-blue-500/30' 
              : 'bg-red-600/90 text-white border-red-500/30'
          }`}>
            {orgBadgeText}
          </span>
          {orgLevel === 'DISTRICT' && districtName && (
            <span className="inline-flex self-start px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-white/90 dark:bg-black/90 text-gray-900 dark:text-white backdrop-blur-md border border-white/20">
              {districtName}
            </span>
          )}
        </div>
      </Link>

      <div className="p-5 sm:p-6 flex flex-col flex-1 pointer-events-none">
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
            {name}
          </h3>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
            {position}
          </p>
        </div>
        
        <div className="pt-4 mt-auto border-t border-gray-100 dark:border-gray-800 pointer-events-auto">
          <Link 
            href={profileUrl}
            className="inline-flex items-center text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors cursor-pointer"
          >
            {isNepali ? "प्रोफाइल हेर्नुहोस्" : "View Profile"}
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function MemberCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-[20px] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-[0_8px_24px_rgba(0,0,0,0.04)] animate-pulse flex flex-col h-full">
      <div className="aspect-[4/3] w-full bg-gray-200 dark:bg-gray-800 shrink-0" />
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-md mb-2" />
        <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded-md mb-6" />
        <div className="pt-4 mt-auto border-t border-gray-100 dark:border-gray-800">
          <div className="h-5 w-1/3 bg-gray-200 dark:bg-gray-800 rounded-md" />
        </div>
      </div>
    </div>
  );
}
