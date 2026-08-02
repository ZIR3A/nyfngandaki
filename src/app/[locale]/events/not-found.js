import Link from "next/link";
import { SearchX, ArrowLeft } from "lucide-react";

export default function EventsNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
        <SearchX className="w-12 h-12 text-slate-400 dark:text-slate-500" />
      </div>
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
        Page Not Found
      </h2>
      <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md text-lg">
        The events page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/events"
        className="inline-flex items-center justify-center px-8 py-4 bg-[#1546B0] text-white rounded-full font-bold hover:bg-blue-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Events
      </Link>
    </div>
  );
}
