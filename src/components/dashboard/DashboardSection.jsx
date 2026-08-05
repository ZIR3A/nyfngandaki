import { cn } from "@/lib/utils";

export function DashboardSection({ title, description, children, className, actions, ...props }) {
  return (
    <div className={cn("space-y-4 sm:space-y-6", className)} {...props}>
      {(title || description || actions) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            {title && <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>}
            {description && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{description}</p>}
          </div>
          {actions && (
            <div className="flex items-center gap-3">
              {actions}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
