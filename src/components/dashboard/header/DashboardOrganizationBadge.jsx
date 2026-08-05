import { Building2 } from "lucide-react";

export function DashboardOrganizationBadge({ 
  level = "Province", 
  name = "Gandaki",
  className = "" 
}) {
  return (
    <div className={`flex items-center gap-3 px-4 py-2 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-sm ${className}`}>
      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-[#1546B0] dark:text-blue-400">
        <Building2 className="w-4 h-4" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider leading-none mb-1">
          {level}
        </span>
        <span className="text-sm font-bold text-slate-900 dark:text-white leading-none">
          {name}
        </span>
      </div>
    </div>
  );
}
