import React from "react";
import { FolderOpen, ArrowUpRight } from "lucide-react";
import { format } from "date-fns";

export default function RelatedResources({ t, locale, resources }) {
  if (!resources || resources.length === 0) return null;

  return (
    <section className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {t("bidhan.relatedResources") || "Related Resources"}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            {t("bidhan.relatedResourcesDesc") || "Explore guidelines, circulars, and policies related to the constitution."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <a 
              key={resource.id} 
              href="#"
              className="flex flex-col bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl group-hover:bg-primary/5 transition-colors">
                  <FolderOpen className="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-300 dark:text-slate-700 group-hover:text-primary transition-colors" />
              </div>
              
              <div className="mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 block">
                  {resource.category}
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-primary transition-colors">
                  {resource.title[locale]}
                </h3>
              </div>
              
              <div className="mt-auto pt-4 flex items-center text-xs text-slate-500 dark:text-slate-400">
                <span>{t("bidhan.published") || "Published"}: {format(new Date(resource.date), "MMM d, yyyy")}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
