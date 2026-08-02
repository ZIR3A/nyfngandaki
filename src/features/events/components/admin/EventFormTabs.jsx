"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  Info,
  FileText,
  CalendarDays,
  MapPin,
  Image as ImageIcon,
  Settings,
  Search,
  AlertCircle
} from "lucide-react";

export const TABS = [
  { id: "basic", label: "Basic Info", icon: Info },
  { id: "content", label: "Content", icon: FileText },
  { id: "schedule", label: "Schedule", icon: CalendarDays },
  { id: "location", label: "Location", icon: MapPin },
  { id: "gallery", label: "Gallery", icon: ImageIcon },
  { id: "seo", label: "SEO", icon: Search },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function EventFormTabs({ activeTab, onTabChange }) {
  const { formState: { errors } } = useFormContext();

  // Basic check to see if a tab has errors based on form field names
  // In a real scenario, you map field paths to specific tabs.
  const tabHasError = (tabId) => {
    // This is a naive implementation; you'd want a map of tabId -> fieldNames
    if (Object.keys(errors).length === 0) return false;
    
    // Example basic mapping (adjust according to your schema)
    const errorMap = {
      basic: ["title", "category", "status"],
      content: ["description"],
      schedule: ["startDate", "endDate", "time"],
      location: ["venue"],
    };
    
    const fields = errorMap[tabId] || [];
    return fields.some(field => errors[field]);
  };

  return (
    <div className="w-full md:w-64 shrink-0 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-y-auto no-scrollbar pb-4 md:pb-0 pr-0 md:pr-4">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const hasError = tabHasError(tab.id);
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors whitespace-nowrap",
              isActive
                ? "bg-[#1546B0] text-white"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
              hasError && !isActive && "text-red-600 bg-red-50 dark:bg-red-900/10 dark:text-red-400"
            )}
          >
            <div className="flex items-center gap-3">
              <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-400", hasError && !isActive && "text-red-500")} />
              {tab.label}
            </div>
            {hasError && <AlertCircle className="w-4 h-4 text-red-500" />}
          </button>
        );
      })}
    </div>
  );
}
