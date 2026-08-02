export default function EventFilter() {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <button className="px-4 py-2 bg-[#1546B0] text-white rounded-lg text-sm font-medium whitespace-nowrap">
        All Events
      </button>
      <button className="px-4 py-2 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded-lg text-sm font-medium whitespace-nowrap">
        Upcoming
      </button>
      <button className="px-4 py-2 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded-lg text-sm font-medium whitespace-nowrap">
        Completed
      </button>
    </div>
  );
}
