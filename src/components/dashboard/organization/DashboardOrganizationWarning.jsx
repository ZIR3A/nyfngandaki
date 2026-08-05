import { AlertCircle } from "lucide-react";

export function DashboardOrganizationWarning({ warnings }) {
  if (!warnings || warnings.length === 0) return null;

  return (
    <div className="bg-orange-50 dark:bg-orange-950/20 rounded-2xl border border-orange-100 dark:border-orange-900/30 p-6 flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center shrink-0">
        <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
      </div>
      <div>
        <h4 className="font-bold text-orange-900 dark:text-orange-300 text-sm mb-2">Configuration Alerts</h4>
        <ul className="space-y-1.5">
          {warnings.map((warning, index) => (
            <li key={index} className="text-xs sm:text-sm text-orange-800 dark:text-orange-400/90 list-disc list-inside">
              {warning}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
