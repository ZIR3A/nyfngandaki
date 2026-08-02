"use client";

import { useFormContext } from "react-hook-form";
import { Copy, Save, Eye, Send, Loader2 } from "lucide-react";

export default function EventActionButtons({ isSubmitting, isDirty }) {
  const { watch } = useFormContext();
  
  // Just to track status if we have it in form
  const status = watch("status");

  return (
    <div className="flex items-center gap-3">
      <button 
        type="button" 
        className="hidden md:flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800"
      >
        <Eye className="w-4 h-4 mr-2" />
        Preview
      </button>

      {/* Example duplicate button (only active for existing events, so maybe conditional) */}
      <button 
        type="button" 
        className="hidden md:flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800"
      >
        <Copy className="w-4 h-4 mr-2" />
        Duplicate
      </button>
      
      {/* Save Draft */}
      <button 
        type="button" 
        disabled={isSubmitting}
        className="flex items-center px-4 py-2 text-sm font-medium text-[#1546B0] bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30 dark:hover:bg-blue-900/40"
      >
        <Save className="w-4 h-4 mr-2" />
        Save Draft
      </button>

      {/* Submit/Publish */}
      <button 
        type="submit" 
        disabled={isSubmitting || !isDirty}
        className="flex items-center px-5 py-2 text-sm font-bold text-white bg-[#1546B0] rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
      >
        {isSubmitting ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Send className="w-4 h-4 mr-2" />
        )}
        {status === 'Published' ? 'Update Event' : 'Publish Event'}
      </button>
    </div>
  );
}
