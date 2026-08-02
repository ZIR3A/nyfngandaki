import { Loader2 } from "lucide-react";

export default function EventDetailsLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0A0F1C]">
      <Loader2 className="w-12 h-12 text-[#1546B0] animate-spin mb-4" />
      <p className="text-slate-500 dark:text-slate-400 animate-pulse font-medium">
        Loading event details...
      </p>
    </div>
  );
}
