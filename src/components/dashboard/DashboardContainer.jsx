import { cn } from "@/lib/utils";

export function DashboardContainer({ children, className, ...props }) {
  return (
    <div 
      className={cn("w-full flex flex-col gap-6 lg:gap-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}
