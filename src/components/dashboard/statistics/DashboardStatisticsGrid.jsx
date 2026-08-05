import { cn } from "@/lib/utils";

export function DashboardStatisticsGrid({ children, className, ...props }) {
  return (
    <div 
      className={cn(
        "grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6", 
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
