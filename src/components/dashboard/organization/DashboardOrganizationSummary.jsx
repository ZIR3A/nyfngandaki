import { Map, MapPin, Layers, FolderTree, Users, ChevronRight } from "lucide-react";
import Link from "next/link";

function DashboardOrganizationSummaryCard({ icon: Icon, title, count, href, color = "blue" }) {
  const colorSchemes = {
    blue: {
      text: "text-blue-500 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      hoverBg: "group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30",
      borderHover: "hover:border-blue-500/30"
    },
    green: {
      text: "text-emerald-500 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      hoverBg: "group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30",
      borderHover: "hover:border-emerald-500/30"
    },
    purple: {
      text: "text-purple-500 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-900/20",
      hoverBg: "group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30",
      borderHover: "hover:border-purple-500/30"
    },
    orange: {
      text: "text-orange-500 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-900/20",
      hoverBg: "group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30",
      borderHover: "hover:border-orange-500/30"
    },
    teal: {
      text: "text-teal-500 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-900/20",
      hoverBg: "group-hover:bg-teal-100 dark:group-hover:bg-teal-900/30",
      borderHover: "hover:border-teal-500/30"
    }
  };

  const scheme = colorSchemes[color] || colorSchemes.blue;

  return (
    <Link href={href} className={`flex items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md ${scheme.borderHover} transition-all group`}>
      <div className={`w-12 h-12 rounded-xl ${scheme.bg} ${scheme.text} flex items-center justify-center shrink-0 ${scheme.hoverBg} transition-colors`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">{title}</p>
        <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">{count.toLocaleString()}</p>
      </div>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-600 ${scheme.hoverBg} group-hover:${scheme.text} transition-colors shrink-0`}>
        <ChevronRight className="w-4 h-4" />
      </div>
    </Link>
  );
}

export function DashboardOrganizationSummary({ hierarchy }) {
  if (!hierarchy) return null;

  return (
    <div className="flex flex-col gap-4">
      <DashboardOrganizationSummaryCard 
        icon={Map} 
        title="Province" 
        count={hierarchy.provinceCommittees || 0} 
        href="/admin/committees"
        color="purple"
      />
      <DashboardOrganizationSummaryCard 
        icon={MapPin} 
        title="Districts" 
        count={hierarchy.districtCommittees || 0} 
        href="/admin/districts"
        color="teal"
      />
      <DashboardOrganizationSummaryCard 
        icon={Layers} 
        title="Committees" 
        count={hierarchy.totalCommittees || 0} 
        href="/admin/committees"
        color="blue"
      />
      <DashboardOrganizationSummaryCard 
        icon={FolderTree} 
        title="Departments" 
        count={hierarchy.totalDepartments || 0} 
        href="/admin/committees"
        color="orange"
      />
      <DashboardOrganizationSummaryCard 
        icon={Users} 
        title="Members" 
        count={hierarchy.totalMembers || 0} 
        href="/admin/members"
        color="green"
      />
    </div>
  );
}
