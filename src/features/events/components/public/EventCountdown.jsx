export default function EventCountdown({ targetDate }) {
  return (
    <div className="flex gap-4 text-center">
      <div className="flex flex-col">
        <span className="text-3xl font-bold text-slate-900 dark:text-white">00</span>
        <span className="text-xs uppercase text-slate-500">Days</span>
      </div>
      <div className="flex flex-col">
        <span className="text-3xl font-bold text-slate-900 dark:text-white">00</span>
        <span className="text-xs uppercase text-slate-500">Hrs</span>
      </div>
      <div className="flex flex-col">
        <span className="text-3xl font-bold text-slate-900 dark:text-white">00</span>
        <span className="text-xs uppercase text-slate-500">Mins</span>
      </div>
    </div>
  );
}
