"use client";

import { useFormContext } from "react-hook-form";

export default function ScheduleTab() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Schedule</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Start Date *</label>
          <input 
            type="date"
            {...register("startDate")} 
            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1546B0]"
          />
          {errors.startDate && <p className="text-red-500 text-xs">{errors.startDate.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">End Date</label>
          <input 
            type="date"
            {...register("endDate")} 
            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1546B0]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Time / Schedule</label>
          <input 
            {...register("time")} 
            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1546B0]"
            placeholder="e.g. 10:00 AM - 4:00 PM"
          />
          {errors.time && <p className="text-red-500 text-xs">{errors.time.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Duration (English)</label>
          <input 
            {...register("duration.en")} 
            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1546B0]"
            placeholder="e.g. 3 Days"
          />
          {errors.duration?.en && <p className="text-red-500 text-xs">{errors.duration.en.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Duration (Nepali)</label>
          <input 
            {...register("duration.np")} 
            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1546B0]"
            placeholder="उदा. ३ दिन"
          />
          {errors.duration?.np && <p className="text-red-500 text-xs">{errors.duration.np.message}</p>}
        </div>
      </div>
    </div>
  );
}
