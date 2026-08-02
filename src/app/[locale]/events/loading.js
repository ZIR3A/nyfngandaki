import { Loader2 } from "lucide-react";

export default function EventsLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <Loader2 className="w-12 h-12 text-[#1546B0] animate-spin mb-4" />
      <p className="text-slate-500 dark:text-slate-400 animate-pulse font-medium">
        Loading events...
      </p>
    </div>
  );
}
