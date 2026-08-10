export default function PublicLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center w-full">
      <div className="relative">
        <div className="absolute inset-0 border-4 border-blue-100 dark:border-blue-900/30 rounded-full" />
        <div className="w-16 h-16 border-4 border-[#1546B0] dark:border-blue-500 rounded-full border-t-transparent animate-spin" />
      </div>
      <p className="mt-6 text-slate-500 dark:text-slate-400 animate-pulse font-medium text-sm tracking-widest uppercase">
        Loading...
      </p>
    </div>
  );
}
