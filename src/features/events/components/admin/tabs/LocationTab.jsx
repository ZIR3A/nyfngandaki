"use client";

import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { getAllDistrictsAction } from "@/actions/district.actions";

export default function LocationTab() {
  const { register, formState: { errors }, getValues, setValue } = useFormContext();
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchDistricts = async () => {
      const result = await getAllDistrictsAction();
      if (result.success) {
        setDistricts(result.data);
        
        // React Hook Form async select fix
        setTimeout(() => {
          const currentDistrict = getValues("district");
          if (currentDistrict) {
            setValue("district", currentDistrict, { shouldDirty: false });
          }
        }, 50);
      }
    };
    fetchDistricts();
  }, [getValues, setValue]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Location</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">District</label>
          <select 
            {...register("district")} 
            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1546B0]"
          >
            <option value="">Select District</option>
            {districts.map(district => (
              <option key={district._id} value={district._id}>{district.name.en}</option>
            ))}
          </select>
          {errors.district && <p className="text-red-500 text-xs">{errors.district.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Venue Name (English) *</label>
          <input 
            {...register("venue.name.en")} 
            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1546B0]"
          />
          {errors.venue?.name?.en && <p className="text-red-500 text-xs">{errors.venue.name.en.message}</p>}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Venue Name (Nepali) *</label>
          <input 
            {...register("venue.name.np")} 
            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1546B0]"
          />
          {errors.venue?.name?.np && <p className="text-red-500 text-xs">{errors.venue.name.np.message}</p>}
        </div>
      </div>
    </div>
  );
}
