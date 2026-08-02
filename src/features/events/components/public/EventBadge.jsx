export default function EventBadge({ label, icon: Icon }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
      {Icon && <Icon className="w-3 h-3 mr-1" />}
      {label}
    </span>
  );
}
