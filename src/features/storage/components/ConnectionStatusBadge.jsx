"use client";

import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

/**
 * ConnectionStatusBadge
 * Displays a color-coded pill indicating the Google Drive connection state.
 * 
 * @param {boolean|null} isConnected - true=connected, false=disconnected, null=loading
 * @param {string} [className]
 */
export function ConnectionStatusBadge({ isConnected, className = "" }) {
  if (isConnected === null || isConnected === undefined) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 ${className}`}>
        <Loader2 size={12} className="animate-spin" />
        Checking…
      </span>
    );
  }

  if (isConnected) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 ${className}`}>
        <CheckCircle2 size={12} />
        Connected
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 ${className}`}>
      <XCircle size={12} />
      Not Connected
    </span>
  );
}
