import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export function DashboardGrowthIndicator({ percentage, direction }) {
  if (direction === "up") {
    return (
      <div className="flex items-center gap-1 text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
        <TrendingUp className="w-3 h-3" />
        <span>+{percentage}%</span>
      </div>
    );
  }

  if (direction === "down") {
    return (
      <div className="flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full">
        <TrendingDown className="w-3 h-3" />
        <span>-{percentage}%</span>
      </div>
    );
  }

  // neutral
  return (
    <div className="flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
      <Minus className="w-3 h-3" />
      <span>{percentage}%</span>
    </div>
  );
}
