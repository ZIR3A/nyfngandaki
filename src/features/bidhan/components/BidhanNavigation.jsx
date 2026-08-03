import React from "react";
import { cn } from "@/lib/utils";

export default function BidhanNavigation({ 
  t, 
  activeTab, 
  setActiveTab,
  showReader = true,
  showDocuments = true,
  showVersions = true,
  showAmendments = true
}) {
  const tabs = [];
  
  if (showReader) tabs.push({ id: "reader", label: t("bidhan.tabs.reader") || "Digital Constitution" });
  if (showDocuments) tabs.push({ id: "documents", label: t("bidhan.tabs.documents") || "Official Documents" });
  if (showVersions) tabs.push({ id: "versions", label: t("bidhan.tabs.versions") || "Versions" });
  if (showAmendments) tabs.push({ id: "amendments", label: t("bidhan.tabs.amendments") || "Amendments" });

  if (tabs.length === 0) return null;

  return (
    <div className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4">
        <nav
          className="flex overflow-x-auto no-scrollbar py-1"
          aria-label="Tabs"
        >
          <div className="flex space-x-1 min-w-full sm:min-w-0 sm:justify-start">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative px-4 py-3 text-sm font-medium transition-all whitespace-nowrap outline-none",
                    isActive
                      ? "text-primary dark:text-primary"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="relative z-10">{tab.label}</span>
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"
                      layoutId="activeTabIndicator"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
