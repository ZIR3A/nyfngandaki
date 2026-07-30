"use client";

import { useLanguage } from "@/localization/LanguageContext";
import { Button } from "@/components/ui/button";
import { User, Phone, Mail, Globe } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function MemberCard({ member }) {
  const { language } = useLanguage();

  return (
    <motion.div 
      whileHover={{ scale: 1.03, y: -5 }}
      className="relative h-full bg-slate-50 dark:bg-white/5 backdrop-blur-lg border border-gray-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden z-10 flex flex-col items-center text-center justify-between cursor-pointer"
    >
      {/* Subtle glow effect in dark mode on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-500/0 to-blue-500/5 dark:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
      
      <div className="flex flex-col items-center w-full">
        {/* Photo */}
        <div className="w-32 h-32 rounded-full overflow-hidden bg-white dark:bg-slate-800 mb-6 border-4 border-white dark:border-slate-700 shadow-sm flex items-center justify-center text-muted-foreground shrink-0 relative">
          {member.photoUrl ? (
            <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
          ) : (
            <User className="w-12 h-12 opacity-50" />
          )}
        </div>
        
        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-blue dark:group-hover:text-blue-300 transition-colors">
          {member.name}
        </h4>
        <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-primary-blue dark:text-blue-400 text-xs font-semibold rounded-md mb-2">
          {member.position}
        </span>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{member.district}</p>
      </div>

      <div className="w-full mt-4">
        {/* Social Links (Optional) */}
        {(member.showPhonePublic && member.phone) || (member.showEmailPublic && member.email) || member.facebook ? (
          <div className="flex justify-center space-x-3 mb-6">
            {member.showPhonePublic && member.phone && (
              <a href={`tel:${member.phone}`} className="text-gray-400 hover:text-primary-blue transition-colors">
                <Phone className="w-4 h-4" />
              </a>
            )}
            {member.showEmailPublic && member.email && (
              <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-primary-blue transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            )}
            {member.facebook && (
              <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-blue transition-colors">
                <Globe className="w-4 h-4" />
              </a>
            )}
          </div>
        ) : null}

        <Link href={`/${language}/members/${member.id || "#"}`} className="w-full block">
          <Button variant="outline" className="w-full rounded-xl border-gray-200 dark:border-slate-700 group-hover:bg-primary-blue group-hover:border-primary-blue group-hover:text-white transition-all duration-300">
            View Profile
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
