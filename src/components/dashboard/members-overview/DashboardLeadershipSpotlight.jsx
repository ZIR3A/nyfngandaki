import { DashboardLeaderCard } from "./DashboardLeaderCard";
import Link from "next/link";
import { Star } from "lucide-react";

export function DashboardLeadershipSpotlight({ leaders }) {
  if (!leaders || leaders.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500 flex items-center justify-center shrink-0">
          <Star className="w-4 h-4 fill-current" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Leadership Spotlight</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Newly highlighted leaders</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {leaders.map((leader) => (
          <DashboardLeaderCard key={leader.id} leader={leader} />
        ))}
      </div>
      
      <Link href="/admin/committees" className="mt-6 flex justify-center items-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-[#1546B0] dark:hover:text-blue-400 transition-colors">
        View All Committees
      </Link>
    </div>
  );
}
