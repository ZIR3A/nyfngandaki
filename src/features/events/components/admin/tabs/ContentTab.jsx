"use client";

import { useFormContext } from "react-hook-form";

export default function ContentTab() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Event Content</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Short Summary (English)</label>
          <textarea 
            {...register("summary.en")} 
            className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1546B0] min-h-[100px] resize-y"
            placeholder="A brief overview of the event for the list view..."
          />
          {errors.summary?.en && <p className="text-red-500 text-xs">{errors.summary.en.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Short Summary (Nepali)</label>
          <textarea 
            {...register("summary.np")} 
            className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1546B0] min-h-[100px] resize-y"
            placeholder="कार्यक्रमको छोटो जानकारी..."
          />
          {errors.summary?.np && <p className="text-red-500 text-xs">{errors.summary.np.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Description (English) *</label>
          <textarea 
            {...register("description.en")} 
            rows={5}
            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1546B0]"
            placeholder="Detailed description of the event..."
          />
          {errors.description?.en && <p className="text-red-500 text-xs">{errors.description.en.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Description (Nepali) *</label>
          <textarea 
            {...register("description.np")} 
            rows={5}
            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1546B0]"
            placeholder="कार्यक्रमको विस्तृत विवरण..."
          />
          {errors.description?.np && <p className="text-red-500 text-xs">{errors.description.np.message}</p>}
        </div>
      </div>
    </div>
  );
}
