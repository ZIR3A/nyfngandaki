"use client";

import { useFormContext, Controller } from "react-hook-form";
import { AdvancedMediaPicker } from "@/features/storage/components/AdvancedMediaPicker";

export default function GalleryTab() {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Event Gallery</h3>
        <p className="text-sm text-slate-500 mt-1">Upload multiple images, rearrange them, and set a featured cover image.</p>
      </div>
      
      <Controller
        name="media"
        control={control}
        render={({ field }) => (
          <AdvancedMediaPicker
            module="events"
            accept="image/*,video/*,application/pdf"
            initialData={field.value || []}
            onChange={(items) => field.onChange(items)}
          />
        )}
      />

      {errors.media && (
        <p className="text-red-500 text-sm mt-2">{errors.media.message}</p>
      )}
    </div>
  );
}
