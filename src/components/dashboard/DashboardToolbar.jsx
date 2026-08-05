import { cn } from "@/lib/utils";

export function DashboardToolbar({ children, className, ...props }) {
  return (
    <div 
      className={cn(
        "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 px-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
