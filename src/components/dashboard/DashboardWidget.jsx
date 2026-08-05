import { cn } from "@/lib/utils";

export function DashboardWidget({ children, className, colSpan = "full", ...props }) {
  const colSpanClasses = {
    small: "col-span-1 md:col-span-3 xl:col-span-3",
    medium: "col-span-1 md:col-span-6 xl:col-span-4",
    large: "col-span-1 md:col-span-6 xl:col-span-6",
    full: "col-span-1 md:col-span-6 xl:col-span-12",
  };

  return (
    <div 
      className={cn(
        "bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-300",
        colSpanClasses[colSpan] || colSpanClasses.full,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function DashboardWidgetHeader({ title, subtitle, icon: Icon, actions, className, ...props }) {
  return (
    <div 
      className={cn("p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between gap-4", className)}
      {...props}
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-[#1546B0] dark:text-blue-400" />
          </div>
        )}
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">{title}</h3>
          {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {actions && (
        <div className="flex items-center gap-2 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}

export function DashboardWidgetBody({ children, className, noPadding = false, ...props }) {
  return (
    <div 
      className={cn("flex-1 overflow-x-auto", !noPadding && "p-5 sm:p-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function DashboardWidgetFooter({ children, className, ...props }) {
  return (
    <div 
      className={cn("p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/50", className)}
      {...props}
    >
      {children}
    </div>
  );
}
