import React from "react";
import { BookOpen, FileText, Files, GitCommit, ScrollText } from "lucide-react";

export default function QuickInfoBar({
  t,
  chaptersCount,
  articlesCount,
  documentsCount,
  amendmentsCount,
}) {
  const stats = [
    {
      label: t("bidhan.stats.chapters") || "Total Chapters",
      value: chaptersCount || 0,
      icon: BookOpen,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-100 dark:bg-blue-500/10",
    },
    {
      label: t("bidhan.stats.articles") || "Total Articles",
      value: articlesCount || 0,
      icon: ScrollText,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-100 dark:bg-emerald-500/10",
    },
    {
      label: t("bidhan.stats.documents") || "Official Documents",
      value: documentsCount || 0,
      icon: Files,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-100 dark:bg-amber-500/10",
    },
    {
      label: t("bidhan.stats.amendments") || "Amendments",
      value: amendmentsCount || 0,
      icon: GitCommit,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-100 dark:bg-purple-500/10",
    },
  ];

  return (
    <section className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex items-center space-x-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group cursor-pointer"
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
