import React from "react";
import { History, Download, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function VersionHistory({ t, locale, versions }) {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {t("bidhan.versionHistory") || "Version History"}
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          {t("bidhan.versionHistoryDesc") || "Track the evolution of the constitution over time."}
        </p>
      </div>

      <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-8 space-y-12 pb-12">
        {versions.map((version, idx) => (
          <div key={version._id || idx} className="relative pl-8 md:pl-12">
            {/* Timeline Dot */}
            <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 ${
              version.isCurrent 
                ? "bg-primary border-primary shadow-[0_0_0_4px_rgba(37,99,235,0.1)] dark:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]" 
                : "bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-700"
            }`} />

            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {version.title?.[locale] || version.title?.en}
                    </h3>
                    {version.isCurrent && (
                      <Badge className="bg-emerald-500 hover:bg-emerald-600">
                        {t("bidhan.current") || "Current"}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <span className="mr-3">
                      {t("bidhan.version") || "Version"} {version.versionNumber}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700 mr-3" />
                    <span>{format(new Date(version.releaseDate || version.createdAt || new Date()), "MMMM d, yyyy")}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {/* Future: Add download button if version PDF is attached */}
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl mb-4">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                  {version.description?.[locale] || version.description?.en || ""}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
