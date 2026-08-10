"use client";

import { useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { getCategoriesAction } from "@/features/events/actions/event.actions";
import { EVENT_STATUS } from "@/features/events/constants/event.constants";
import { LocalizedInput } from "@/features/admin/about/components/shared/LocalizedInput";

export default function BasicTab() {
  const { register, control, formState: { errors }, getValues, setValue } = useFormContext();
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategoriesAction();
      if (result.success) {
        setCategories(result.data);
        
        // React Hook Form async `<select>` fix: 
        // We must wait for React to render the options before setting the value
        setTimeout(() => {
          const currentCategory = getValues("category");
          if (currentCategory) {
            setValue("category", currentCategory, { shouldDirty: false });
          }
        }, 50);
      }
    };
    fetchCategories();
  }, [getValues, setValue]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Basic Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <div>
                <LocalizedInput
                  label="Event Title"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={{ en: "e.g. Annual Youth Summit 2026", np: "उदाहरण: वार्षिक युवा शिखर सम्मेलन २०२६" }}
                  required
                />
                {errors.title?.en && <p className="text-red-500 text-xs mt-1">{errors.title.en.message}</p>}
                {errors.title?.np && <p className="text-red-500 text-xs mt-1">{errors.title.np.message}</p>}
              </div>
            )}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category *</label>
          <select 
            {...register("category")} 
            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1546B0]"
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name.en}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Event Status *</label>
          <select 
            {...register("status")} 
            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1546B0]"
          >
            {Object.values(EVENT_STATUS).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          {errors.status && <p className="text-red-500 text-xs">{errors.status.message}</p>}
        </div>

        <div className="md:col-span-2 mt-4">
          <Controller
            name="organizer"
            control={control}
            render={({ field }) => (
              <div>
                <LocalizedInput
                  label="Organizer"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={{ en: "e.g. NYFN Gandaki Committee", np: "उदा. राष्ट्रिय युवा संघ नेपाल, गण्डकी प्रदेश" }}
                />
                {errors.organizer?.en && <p className="text-red-500 text-xs mt-1">{errors.organizer.en.message}</p>}
                {errors.organizer?.np && <p className="text-red-500 text-xs mt-1">{errors.organizer.np.message}</p>}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
