import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";

export function DashboardBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean).slice(1); // skip 'admin'

  return (
    <div className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
      <Link href="/admin/dashboard" className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
        <Home className="h-4 w-4" />
        <span>Admin</span>
      </Link>
      
      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
        
        return (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-slate-300 dark:text-slate-600" />
            <span className={isLast ? "text-slate-900 dark:text-white font-bold" : ""}>
              {name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
