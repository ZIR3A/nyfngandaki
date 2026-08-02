import { MapPin } from "lucide-react";

export default function VenueCard() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex items-start gap-4">
      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-[#1546B0] dark:text-blue-400 rounded-lg">
        <MapPin className="w-6 h-6" />
      </div>
      <div>
        <h4 className="font-bold text-slate-900 dark:text-white">Event Venue</h4>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Pokhara, Gandaki Province</p>
      </div>
    </div>
  );
}
