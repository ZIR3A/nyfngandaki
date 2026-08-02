import { Search } from "lucide-react";

export default function EventSearch() {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg leading-5 bg-white dark:bg-slate-900 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#1546B0] focus:border-[#1546B0] sm:text-sm transition-colors"
        placeholder="Search events..."
      />
    </div>
  );
}
