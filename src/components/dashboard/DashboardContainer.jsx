import { cn } from "@/lib/utils";

export function DashboardContainer({ children, className, ...props }) {
  return (
    <div 
      className={cn("p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full flex flex-col gap-6 lg:gap-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}
