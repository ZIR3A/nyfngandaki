import React from "react";
import { GitCommit, FileText, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default function AmendmentTimeline({ t, locale, amendments }) {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {t("bidhan.amendments") || "Amendments"}
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          {t("bidhan.amendmentsDesc") || "Detailed record of all changes made to the constitution."}
        </p>
      </div>

      <div className="space-y-6">
        {amendments.map((amendment) => (
          <div 
            key={amendment.id}
            className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="hidden md:flex p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl">
                  <GitCommit className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {amendment.title[locale]}
                    </h3>
                    <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {format(new Date(amendment.date), "MMM d, yyyy")}
                    </Badge>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base mb-6">
                    {amendment.description[locale]}
                  </p>

                  {/* Affected Chapters */}
                  {amendment.affectedChapters && amendment.affectedChapters.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        {t("bidhan.affectedChapters") || "Affected Chapters:"}
                      </span>
                      {amendment.affectedChapters.map((chNum) => (
                        <Badge key={chNum} variant="outline" size="crm-primary" className="border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/10">
                          {t("bidhan.chapter") || "Chapter"} {chNum}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-4">
                    <button className="flex items-center text-sm font-medium text-primary hover:text-primary-hover transition-colors">
                      <FileText className="w-4 h-4 mr-2" />
                      {t("bidhan.viewOriginalDoc") || "View Original Document"}
                    </button>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <button className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
                      {t("bidhan.expandDetails") || "Expand Details"}
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
