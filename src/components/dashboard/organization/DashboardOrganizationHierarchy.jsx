import { Map, MapPin, Layers, FolderTree, Users, ChevronDown } from "lucide-react";

function DashboardOrganizationNode({ icon: Icon, title, count, isLast }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 w-full max-w-[240px] shadow-sm hover:border-[#1546B0]/50 dark:hover:border-blue-500/50 transition-colors cursor-pointer group">
        <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-[#1546B0] dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:bg-[#1546B0] group-hover:text-white dark:group-hover:bg-blue-600 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 flex justify-between items-center min-w-0">
          <span className="font-bold text-slate-900 dark:text-white text-sm truncate">{title}</span>
          <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold px-2 py-1 rounded-md ml-2 shrink-0">{count}</span>
        </div>
      </div>
      
      {!isLast && (
        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 my-1 relative">
          <ChevronDown className="w-3 h-3 text-slate-400 dark:text-slate-500 absolute -bottom-2 -left-1.5 bg-white dark:bg-slate-950 rounded-full" />
        </div>
      )}
    </div>
  );
}

export function DashboardOrganizationHierarchy({ hierarchy }) {
  if (!hierarchy) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-full">
      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">Hierarchy</h3>
      
      <div className="flex-1 flex flex-col items-center justify-center py-2">
        <DashboardOrganizationNode 
          icon={Map} 
          title="Province" 
          count={hierarchy.provinceCommittees || 0} 
        />
        <DashboardOrganizationNode 
          icon={MapPin} 
          title="Districts" 
          count={hierarchy.districtCommittees || 0} 
        />
        <DashboardOrganizationNode 
          icon={Layers} 
          title="Committees" 
          count={hierarchy.totalCommittees || 0} 
        />
        <DashboardOrganizationNode 
          icon={FolderTree} 
          title="Departments" 
          count={hierarchy.totalDepartments || 0} 
        />
        <DashboardOrganizationNode 
          icon={Users} 
          title="Members" 
          count={hierarchy.totalMembers || 0} 
          isLast 
        />
      </div>
    </div>
  );
}
