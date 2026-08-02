export default function SpeakerCard({ speaker }) {
  return (
    <div className="flex items-center space-x-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
      <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800"></div>
      <div>
        <h4 className="font-bold text-slate-900 dark:text-white">Speaker Name</h4>
        <p className="text-sm text-slate-500 dark:text-slate-400">Title / Organization</p>
      </div>
    </div>
  );
}
