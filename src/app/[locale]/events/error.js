"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function EventsError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
        Something went wrong!
      </h2>
      <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">
        We encountered an error while loading the events. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center justify-center px-6 py-3 bg-[#1546B0] text-white rounded-xl font-semibold hover:bg-blue-800 transition-colors shadow-sm"
      >
        <RefreshCcw className="w-5 h-5 mr-2" />
        Try Again
      </button>
    </div>
  );
}
