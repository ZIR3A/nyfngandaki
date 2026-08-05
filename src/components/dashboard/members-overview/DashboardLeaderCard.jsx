import Image from "next/image";
import Link from "next/link";
import { User, Award } from "lucide-react";

export function DashboardLeaderCard({ leader }) {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/80 dark:to-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center hover:shadow-md transition-shadow group relative overflow-hidden">
      
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#1546B0] to-[#D71920]"></div>

      <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white dark:border-slate-800 shadow-sm overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        {leader.photo ? (
          <Image src={leader.photo} alt={leader.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <User className="w-10 h-10 text-slate-400" />
        )}
        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      <div className="absolute top-4 right-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 p-1.5 rounded-full shadow-sm">
        <Award className="w-4 h-4" />
      </div>

      <Link href={`/admin/members/${leader.id}/edit`} className="font-bold text-slate-900 dark:text-white text-base sm:text-lg hover:text-[#1546B0] dark:hover:text-blue-400 transition-colors block mb-1">
        {leader.name}
      </Link>
      
      <div className="inline-flex items-center justify-center px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-[#1546B0] dark:text-blue-400 rounded-full text-xs font-bold mb-2">
        {leader.position}
      </div>
      
      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
        {leader.committee}
      </p>
    </div>
  );
}
