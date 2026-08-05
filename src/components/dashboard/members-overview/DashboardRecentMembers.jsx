import { DashboardMemberCard } from "./DashboardMemberCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function DashboardRecentMembers({ members }) {
  if (!members || members.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Members</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Latest additions to the organization</p>
        </div>
        <Link href="/admin/members" className="hidden sm:flex items-center text-sm font-medium text-[#1546B0] dark:text-blue-400 hover:underline">
          View All <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {members.map((member) => (
          <DashboardMemberCard key={member.id} member={member} />
        ))}
      </div>
      
      <Link href="/admin/members" className="sm:hidden mt-4 flex justify-center items-center text-sm font-medium text-[#1546B0] dark:text-blue-400 border border-[#1546B0]/20 dark:border-blue-500/20 rounded-lg py-2">
        View All Members
      </Link>
    </div>
  );
}
