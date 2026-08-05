export function DashboardProgressCard({ title, percent, completed, total }) {
  // Determine color based on completion
  let colorClass = "bg-[#1546B0] dark:bg-blue-500";
  if (percent === 100) colorClass = "bg-green-500";
  else if (percent < 50) colorClass = "bg-orange-500";
  
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex justify-between items-end mb-2">
        <span className="font-bold text-sm text-slate-700 dark:text-slate-200">{title}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {completed} / {total}
          </span>
          <span className={`text-xs font-black px-1.5 py-0.5 rounded text-white ${percent === 100 ? 'bg-green-500' : 'bg-slate-800 dark:bg-slate-700'}`}>
            {percent}%
          </span>
        </div>
      </div>
      <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out ${colorClass}`} 
          style={{ width: `${Math.max(percent, 2)}%` }}
        />
      </div>
    </div>
  );
}

export function DashboardOrganizationHealth({ health }) {
  if (!health) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">Health Overview</h3>
      
      <DashboardProgressCard 
        title="District Setup" 
        percent={health.districtSetup.percent} 
        completed={health.districtSetup.completed} 
        total={health.districtSetup.total} 
      />
      
      <DashboardProgressCard 
        title="Committee Setup" 
        percent={health.committeeSetup.percent} 
        completed={health.committeeSetup.completed} 
        total={health.committeeSetup.total} 
      />
    </div>
  );
}
