"use client";

import Image from "next/image";
import Link from "next/link";
import { MoreVertical, User, Edit, FileText } from "lucide-react";
import { useState } from "react";

export function DashboardMemberCard({ member }) {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Format the date (simplified for dashboard)
  const joinedDate = new Date(member.joinedAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <div className="bg-white dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800 hover:border-[#1546B0]/30 dark:hover:border-blue-500/30 rounded-xl p-4 shadow-sm hover:shadow-md transition-all group relative">
      <div className="flex gap-4 items-start">
        {/* Avatar */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm relative">
          {member.photo ? (
            <Image src={member.photo} alt={member.name} fill className="object-cover" />
          ) : (
            <User className="w-6 h-6 text-slate-400" />
          )}
          {/* Status Indicator */}
          <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white dark:border-slate-900 rounded-full ${member.status === 'Active' ? 'bg-green-500' : 'bg-slate-400'}`}></div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <Link href={`/admin/members/${member.id}/edit`} className="font-bold text-slate-900 dark:text-white text-sm sm:text-base hover:text-[#1546B0] dark:hover:text-blue-400 transition-colors truncate block">
            {member.name}
          </Link>
          <p className="text-xs font-semibold text-[#1546B0] dark:text-blue-400 mb-0.5 truncate">{member.position}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
            {member.committee} • {member.district}
          </p>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 uppercase font-medium tracking-wider">
            Joined {joinedDate}
          </p>
        </div>

        {/* Actions Menu Trigger */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 transition-colors shrink-0"
        >
          <MoreVertical className="w-4 h-4" />
        </button>

        {/* Dropdown Menu (Simplified contextual action) */}
        {menuOpen && (
          <div className="absolute top-12 right-4 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-100 dark:border-slate-700 py-1 z-10 animate-in fade-in zoom-in-95 duration-100">
            <Link href={`/admin/members/${member.id}/edit`} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700">
              <Edit className="w-3.5 h-3.5 text-slate-400" /> Edit Member
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
