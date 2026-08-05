import { Building2 } from "lucide-react";
import Link from "next/link";

export function DashboardOrganizationEmptyState() {
  return (
    <div className="col-span-full py-16 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 border-dashed">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4">
        <Building2 className="w-8 h-8 text-[#1546B0] dark:text-blue-400" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Organization Structure Found</h3>
      <p className="text-sm text-slate-500 max-w-md text-center mb-6">
        The organizational hierarchy has not been set up yet. Start by creating districts and committees to see the organization overview.
      </p>
      <Link 
        href="/admin/districts/new"
        className="px-6 py-2 bg-[#1546B0] hover:bg-[#0D2E78] text-white rounded-lg font-medium text-sm transition-colors"
      >
        Create District
      </Link>
    </div>
  );
}
