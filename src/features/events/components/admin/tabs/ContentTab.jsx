"use client";

import { useFormContext, Controller } from "react-hook-form";
import { LocalizedTextarea } from "@/features/admin/about/components/shared/LocalizedTextarea";

export default function ContentTab() {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Event Content</h3>
      
      <div className="space-y-6">
        <Controller
          name="summary"
          control={control}
          render={({ field }) => (
            <div>
              <LocalizedTextarea
                label="Short Summary"
                value={field.value}
                onChange={field.onChange}
                placeholder={{ en: "A brief overview of the event for the list view...", np: "कार्यक्रमको छोटो जानकारी..." }}
                rows={3}
              />
              {errors.summary?.en && <p className="text-red-500 text-xs mt-1">{errors.summary.en.message}</p>}
              {errors.summary?.np && <p className="text-red-500 text-xs mt-1">{errors.summary.np.message}</p>}
            </div>
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <div>
              <LocalizedTextarea
                label="Detailed Description"
                value={field.value}
                onChange={field.onChange}
                placeholder={{ en: "Detailed description of the event...", np: "कार्यक्रमको विस्तृत विवरण..." }}
                rows={6}
                required
              />
              {errors.description?.en && <p className="text-red-500 text-xs mt-1">{errors.description.en.message}</p>}
              {errors.description?.np && <p className="text-red-500 text-xs mt-1">{errors.description.np.message}</p>}
            </div>
          )}
        />
      </div>
    </div>
  );
}
