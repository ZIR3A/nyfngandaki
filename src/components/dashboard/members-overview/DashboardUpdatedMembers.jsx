import Image from "next/image";
import Link from "next/link";
import { User, Clock } from "lucide-react";

export function DashboardUpdatedMembers({ members }) {
  if (!members || members.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm h-full">
      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Recently Updated Profiles</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Members whose profiles were recently modified</p>

      <div className="flex flex-col gap-4">
        {members.map((member) => {
          const updateTime = new Date(member.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const updateDate = new Date(member.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric' });
          
          return (
            <div key={member.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center shrink-0">
                {member.photo ? (
                  <Image src={member.photo} alt={member.name} width={40} height={40} className="object-cover" />
                ) : (
                  <User className="w-5 h-5 text-slate-400" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <Link href={`/admin/members/${member.id}`} className="font-bold text-sm text-slate-900 dark:text-white hover:text-[#1546B0] dark:hover:text-blue-400 truncate block">
                  {member.name}
                </Link>
                <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  <Clock className="w-3 h-3 mr-1" />
                  {updateDate} at {updateTime}
                </div>
              </div>
              
              <div className="shrink-0 text-xs font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                By Admin
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
