"use client";

import { useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { getAllDistrictsAction } from "@/actions/district.actions";
import { LocalizedInput } from "@/features/admin/about/components/shared/LocalizedInput";

export default function LocationTab() {
  const { register, control, formState: { errors }, getValues, setValue } = useFormContext();
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

      <div className="mt-4">
        <Controller
          name="venue.name"
          control={control}
          render={({ field }) => (
            <div>
              <LocalizedInput
                label="Venue Name"
                value={field.value}
                onChange={field.onChange}
                required
              />
              {errors.venue?.name?.en && <p className="text-red-500 text-xs mt-1">{errors.venue.name.en.message}</p>}
              {errors.venue?.name?.np && <p className="text-red-500 text-xs mt-1">{errors.venue.name.np.message}</p>}
            </div>
          )}
        />
      </div>
    </div>
  );
}
