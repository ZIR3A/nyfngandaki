export default function AgendaTimeline() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Event Agenda</h3>
      <div className="space-y-4">
        <div className="border-l-2 border-blue-500 pl-4 py-1">
          <p className="text-sm text-blue-500 font-semibold">10:00 AM</p>
          <p className="text-slate-700 dark:text-slate-300">Registration & Welcome</p>
        </div>
        <div className="border-l-2 border-slate-200 dark:border-slate-700 pl-4 py-1">
          <p className="text-sm text-slate-500 font-semibold">11:00 AM</p>
          <p className="text-slate-700 dark:text-slate-300">Opening Ceremony</p>
        </div>
      </div>
    </div>
  );
}
