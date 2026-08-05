import { Lightbulb } from "lucide-react";

export function DashboardInsightsPanel({ insights }) {
  if (!insights || insights.length === 0) return null;

  return (
    <div className="bg-[#F8FAFC] dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row gap-4 sm:items-center">
      <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-[#1546B0] dark:text-blue-400 flex items-center justify-center shrink-0">
        <Lightbulb className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">Growth Summary & Insights</h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
          {insights.map((insight, index) => (
            <li key={index} className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex items-start">
              <span className="text-[#1546B0] dark:text-blue-400 mr-2 font-bold">•</span>
              {insight}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
