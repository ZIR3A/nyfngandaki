import { Users, Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";

export function DashboardQuickSummary() {
  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm w-full lg:max-w-sm mt-6 lg:mt-0">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Today's Overview</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-[#1546B0] dark:text-blue-400" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 dark:text-white leading-tight">12</div>
            <div className="text-xs font-medium text-slate-500">Members Added</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center shrink-0">
            <CalendarIcon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 dark:text-white leading-tight">3</div>
            <div className="text-xs font-medium text-slate-500">Upcoming Events</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 dark:text-white leading-tight">5</div>
            <div className="text-xs font-medium text-slate-500">Pending Approvals</div>
          </div>
        </div>

      </div>
    </div>
  );
}
