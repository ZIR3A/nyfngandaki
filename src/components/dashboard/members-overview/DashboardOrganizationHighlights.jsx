import { CheckCircle2 } from "lucide-react";

export function DashboardOrganizationHighlights({ highlights }) {
  if (!highlights || highlights.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-[#F8FAFC] dark:from-slate-900 dark:to-slate-900/50 rounded-2xl border border-blue-100 dark:border-blue-900/30 p-5 sm:p-6 shadow-sm">
      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">Organization Highlights</h3>

      <div className="space-y-4">
        {highlights.map((highlight, index) => (
          <div key={index} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {highlight.replace('✓', '').trim()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
