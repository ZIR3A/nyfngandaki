export default function EventCategoryChip({ category }) {
  if (!category) return null;

  return (
    <span className="inline-flex px-3 py-1 bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-full shadow-sm backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50">
      {category}
    </span>
  );
}
