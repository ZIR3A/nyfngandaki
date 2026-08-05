import Link from "next/link";
import { DashboardGrowthIndicator } from "./DashboardGrowthIndicator";

export function DashboardStatisticCard({ 
  title, 
  value, 
  icon: Icon, 
  growth, 
  href,
  color = "blue"
}) {
  const colorSchemes = {
    blue: {
      text: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      hoverText: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
      glow: "via-blue-500/10"
    },
    green: {
      text: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      hoverText: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
      glow: "via-emerald-500/10"
    },
    purple: {
      text: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-900/20",
      hoverText: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
      glow: "via-purple-500/10"
    },
    indigo: {
      text: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
      hoverText: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
      glow: "via-indigo-500/10"
    },
    teal: {
      text: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-900/20",
      hoverText: "group-hover:text-teal-600 dark:group-hover:text-teal-400",
      glow: "via-teal-500/10"
    },
    orange: {
      text: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-900/20",
      hoverText: "group-hover:text-orange-600 dark:group-hover:text-orange-400",
      glow: "via-orange-500/10"
    },
    pink: {
      text: "text-pink-600 dark:text-pink-400",
      bg: "bg-pink-50 dark:bg-pink-900/20",
      hoverText: "group-hover:text-pink-600 dark:group-hover:text-pink-400",
      glow: "via-pink-500/10"
    }
  };

  const scheme = colorSchemes[color] || colorSchemes.blue;
  const innerContent = (
    <div className="p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col group cursor-pointer relative overflow-hidden">
      
      {/* Top section: Icon & Growth */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300 ${scheme.bg}`}>
          <Icon className={`w-6 h-6 ${scheme.text}`} />
        </div>
        {growth && (
          <DashboardGrowthIndicator percentage={growth.percentage} direction={growth.direction} />
        )}
      </div>

      {/* Value & Title */}
      <div className="mt-auto">
        <h4 className={`text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-1 ${scheme.hoverText} transition-colors`}>
          {value.toLocaleString()}
        </h4>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight">
          {title}
        </p>
      </div>

      {/* Placeholder for future mini trend line */}
      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent ${scheme.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-[#1546B0] rounded-2xl">
        {innerContent}
      </Link>
    );
  }

  return <div className="h-full">{innerContent}</div>;
}
