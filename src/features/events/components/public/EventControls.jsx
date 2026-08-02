"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, Filter, CalendarDays, X } from "lucide-react";

export default function EventControls({ categories = [], locale = "en", dictionaries }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get("status") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");

  // Optional localized dictionary fallback
  const dict = dictionaries || {
    searchPlaceholder: locale === "np" ? "कार्यक्रमहरू खोज्नुहोस्..." : "Search events...",
    allStatus: locale === "np" ? "सबै अवस्था" : "All Status",
    allCategories: locale === "np" ? "सबै वर्गहरू" : "All Categories",
    upcoming: locale === "np" ? "आगामी" : "Upcoming",
    ongoing: locale === "np" ? "चलिरहेको" : "Ongoing",
    completed: locale === "np" ? "सम्पन्न" : "Completed",
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateUrlParams();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateUrlParams();
    }
  };

  const updateUrlParams = (newStatus = selectedStatus, newCategory = selectedCategory) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Always reset to page 1 on new filter
    params.delete("page");
    
    if (searchTerm) params.set("search", searchTerm);
    else params.delete("search");

    if (newStatus) params.set("status", newStatus);
    else params.delete("status");

    if (newCategory) params.set("category", newCategory);
    else params.delete("category");

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Trigger search on typing (debounce could be added, but manual enter works well)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== (searchParams.get("search") || "")) {
        updateUrlParams();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const onStatusChange = (e) => {
    const val = e.target.value;
    setSelectedStatus(val);
    updateUrlParams(val, selectedCategory);
  };

  const onCategoryChange = (e) => {
    const val = e.target.value;
    setSelectedCategory(val);
    updateUrlParams(selectedStatus, val);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedStatus("");
    setSelectedCategory("");
    router.push(pathname, { scroll: false });
  };

  const hasActiveFilters = searchParams.get("search") || searchParams.get("status") || searchParams.get("category");

  return (
    <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center w-full relative z-10">
      
      {/* Search Input */}
      <div className="relative flex-grow w-full md:w-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="block w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1546B0] focus:border-transparent transition-all"
          placeholder={dict.searchPlaceholder}
        />
      </div>

      {/* Status Filter */}
      <div className="relative w-full md:w-48 shrink-0">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <CalendarDays className="h-5 w-5 text-slate-400" />
        </div>
        <select
          value={selectedStatus}
          onChange={onStatusChange}
          className="block w-full pl-12 pr-8 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1546B0] focus:border-transparent appearance-none cursor-pointer"
        >
          <option value="">{dict.allStatus}</option>
          <option value="Upcoming">{dict.upcoming}</option>
          <option value="Ongoing">{dict.ongoing}</option>
          <option value="Completed">{dict.completed}</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="relative w-full md:w-48 shrink-0">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Filter className="h-5 w-5 text-slate-400" />
        </div>
        <select
          value={selectedCategory}
          onChange={onCategoryChange}
          className="block w-full pl-12 pr-8 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1546B0] focus:border-transparent appearance-none cursor-pointer"
        >
          <option value="">{dict.allCategories}</option>
          {categories.map((cat) => (
            <option key={cat._id || cat.slug} value={cat.slug}>
              {locale === "np" && cat.name?.np ? cat.name.np : cat.name?.en}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Button */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full md:w-auto px-4 py-3 flex items-center justify-center text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-medium shrink-0"
        >
          <X className="w-5 h-5 md:mr-2" />
          <span className="md:hidden">Clear Filters</span>
        </button>
      )}
    </div>
  );
}
