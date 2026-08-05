import { Users, UserCheck, UserPlus, FileCheck } from "lucide-react";

function OverviewCard({ title, value, icon: Icon, trend }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md hover:border-[#1546B0]/30 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</h4>
        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-[#1546B0] dark:text-blue-400 flex items-center justify-center group-hover:bg-[#1546B0] group-hover:text-white transition-colors">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          {value.toLocaleString()}
        </span>
        {trend && (
          <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-md mb-1">
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

export function DashboardOverviewCards({ overview }) {
  if (!overview) return null;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <OverviewCard 
        title="Total Members" 
        value={overview.total} 
        icon={Users} 
      />
      <OverviewCard 
        title="Active Members" 
        value={overview.active} 
        icon={UserCheck} 
      />
      <OverviewCard 
        title="New This Month" 
        value={overview.newThisMonth} 
        icon={UserPlus} 
        trend="▲ Growth"
      />
      <OverviewCard 
        title="Profile Completion" 
        value={`${overview.completionRate}%`} 
        icon={FileCheck} 
      />
    </div>
  );
}
