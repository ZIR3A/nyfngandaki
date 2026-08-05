import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function DashboardQuickActionCard({ action }) {
  const { title, description, icon: Icon, href, color = "blue" } = action;

  const colorSchemes = {
    blue: {
      text: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      hoverBg: "group-hover:bg-blue-600 dark:group-hover:bg-blue-600",
      hoverText: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
      glow: "via-blue-500/5",
      borderHover: "hover:border-blue-500/30",
      arrowBg: "group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30"
    },
    green: {
      text: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      hoverBg: "group-hover:bg-emerald-600 dark:group-hover:bg-emerald-600",
      hoverText: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
      glow: "via-emerald-500/5",
      borderHover: "hover:border-emerald-500/30",
      arrowBg: "group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30"
    },
    purple: {
      text: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-900/20",
      hoverBg: "group-hover:bg-purple-600 dark:group-hover:bg-purple-600",
      hoverText: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
      glow: "via-purple-500/5",
      borderHover: "hover:border-purple-500/30",
      arrowBg: "group-hover:bg-purple-50 dark:group-hover:bg-purple-900/30"
    },
    orange: {
      text: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-900/20",
      hoverBg: "group-hover:bg-orange-600 dark:group-hover:bg-orange-600",
      hoverText: "group-hover:text-orange-600 dark:group-hover:text-orange-400",
      glow: "via-orange-500/5",
      borderHover: "hover:border-orange-500/30",
      arrowBg: "group-hover:bg-orange-50 dark:group-hover:bg-orange-900/30"
    },
    pink: {
      text: "text-pink-600 dark:text-pink-400",
      bg: "bg-pink-50 dark:bg-pink-900/20",
      hoverBg: "group-hover:bg-pink-600 dark:group-hover:bg-pink-600",
      hoverText: "group-hover:text-pink-600 dark:group-hover:text-pink-400",
      glow: "via-pink-500/5",
      borderHover: "hover:border-pink-500/30",
      arrowBg: "group-hover:bg-pink-50 dark:group-hover:bg-pink-900/30"
    },
    teal: {
      text: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-900/20",
      hoverBg: "group-hover:bg-teal-600 dark:group-hover:bg-teal-600",
      hoverText: "group-hover:text-teal-600 dark:group-hover:text-teal-400",
      glow: "via-teal-500/5",
      borderHover: "hover:border-teal-500/30",
      arrowBg: "group-hover:bg-teal-50 dark:group-hover:bg-teal-900/30"
    },
  };

  const scheme = colorSchemes[color] || colorSchemes.blue;

  return (
    <Link 
      href={href}
      className={`group flex items-center p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md ${scheme.borderHover} transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#1546B0] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 relative overflow-hidden transform hover:-translate-y-0.5 cursor-pointer`}
    >
      {/* Icon Area */}
      <div className={`w-12 h-12 rounded-xl ${scheme.bg} ${scheme.text} flex items-center justify-center shrink-0 group-hover:scale-110 ${scheme.hoverBg} group-hover:text-white dark:group-hover:text-white transition-all duration-300`}>
        <Icon className="w-6 h-6" />
      </div>

      {/* Text Content */}
      <div className="ml-4 flex-1 min-w-0">
        <h4 className={`font-bold text-slate-900 dark:text-white text-sm sm:text-base truncate ${scheme.hoverText} transition-colors`}>
          {title}
        </h4>
        <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
          {description}
        </p>
      </div>

      {/* Action Arrow */}
      <div className={`ml-3 shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-transparent ${scheme.arrowBg} text-slate-300 dark:text-slate-600 ${scheme.hoverText} transition-all duration-300 group-hover:translate-x-1`}>
        <ArrowRight className="w-4 h-4" />
      </div>

      {/* Subtle Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${scheme.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
    </Link>
  );
}
