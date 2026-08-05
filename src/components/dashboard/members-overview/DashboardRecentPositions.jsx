import { GitMerge, ArrowRight } from "lucide-react";

export function DashboardRecentPositions({ positions }) {
  if (!positions || positions.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm h-full">
      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Recently Assigned Positions</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Latest organizational appointments</p>

      <div className="flex flex-col gap-4">
        {positions.map((pos, index) => {
          const date = new Date(pos.assignedAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
          return (
            <div key={pos.id || index} className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
              <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 text-[#1546B0] dark:text-blue-400 flex items-center justify-center shrink-0">
                <GitMerge className="w-5 h-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-x-2 text-sm">
                  <span className="font-bold text-slate-900 dark:text-white">{pos.name}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span className="font-semibold text-[#1546B0] dark:text-blue-400">{pos.position}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {pos.committee}
                </p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase font-medium">
                  {date}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
