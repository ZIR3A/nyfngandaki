import { cn } from "@/lib/utils";

/**
 * DashboardGrid provides a responsive 12-column grid layout for widgets.
 * Mobile: 1 col, Tablet: 6 cols, Desktop: 12 cols
 */
export function DashboardGrid({ children, className, ...props }) {
  return (
    <div 
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 xl:grid-cols-12 gap-4 sm:gap-6", 
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
