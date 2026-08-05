"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { createEvent, updateEvent } from "../actions/event.actions";
import { MediaPicker } from "@/features/storage/components/MediaPicker";
import { toast } from "sonner";

export function EventForm({ initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    
    if (!formData.get("featured")) formData.append("featured", "off");

    let result;
    if (initialData?._id) {
      result = await updateEvent(initialData._id, formData);
    } else {
      result = await createEvent(formData);
    }

    try {
      if (result.success) {
        toast.success("Success", { description: result.message || "Event saved successfully." });
        router.push("/admin/events");
        router.refresh();
      } else {
        toast.error("Error", { 
          description: result.errors?.length 
            ? `${result.message}\nDetails: ${result.errors.join(", ")}` 
            : result.message || "Failed to save event." 
        });
      }
    } catch (err) {
      toast.error("Error", { description: err.message || "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  }

  // Helper to format date for input type="datetime-local"
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/events">
          <Button variant="outline" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            {initialData ? "Edit Event" : "Create New Event"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Fill in the details for the upcoming event or program.
          </p>
        </div>
      </div>



      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Dual Language Inputs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-bold text-gray-900">Event Details (Bilingual)</h3>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* English */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-[#1546B0] uppercase tracking-wider">English Content</h4>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Event Title (EN) *</label>
                  <input required type="text" name="title.en" defaultValue={initialData?.title?.en || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Venue/Location (EN)</label>
                  <input type="text" name="venue.en" defaultValue={initialData?.venue?.en || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Organizer (EN)</label>
                  <input type="text" name="organizer.en" defaultValue={initialData?.organizer?.en || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Description (EN)</label>
                  <textarea name="description.en" defaultValue={initialData?.description?.en || ""} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"></textarea>
                </div>
              </div>

              {/* Nepali */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-[#D71920] uppercase tracking-wider">Nepali Content</h4>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Event Title (NP) *</label>
                  <input required type="text" name="title.np" defaultValue={initialData?.title?.np || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Venue/Location (NP)</label>
                  <input type="text" name="venue.np" defaultValue={initialData?.venue?.np || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Organizer (NP)</label>
                  <input type="text" name="organizer.np" defaultValue={initialData?.organizer?.np || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Description (NP)</label>
                  <textarea name="description.np" defaultValue={initialData?.description?.np || ""} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-bold text-gray-900">Schedule & Properties</h3>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Date & Time *</label>
                <input required type="datetime-local" name="date" defaultValue={formatDateForInput(initialData?.date)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
                <select name="status" defaultValue={initialData?.status || "Upcoming"} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Banner Image (Cover)</label>
                  <MediaPicker name="bannerImageId" module="events" />
                  <p className="text-xs text-gray-500 mt-1">Wide image displayed at the top of the event page.</p>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Featured Image</label>
                  <MediaPicker name="featuredImageId" module="events" />
                  <p className="text-xs text-gray-500 mt-1">Square/thumbnail image for event listings.</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Event Gallery</label>
                  <MediaPicker name="galleryImageIds" module="events" multiple={true} />
                  <p className="text-xs text-gray-500 mt-1">Select multiple images for the post-event gallery.</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" name="featured" defaultChecked={initialData ? initialData.featured : false} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <div>
                    <span className="block font-bold text-gray-900 text-sm">Feature Event</span>
                    <span className="block text-xs text-gray-500">Highlight this event on the homepage.</span>
                  </div>
                </label>
              </div>
            </div>

          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end gap-4 pt-6">
          <Link href="/admin/events">
            <Button variant="outline" type="button" disabled={loading} className="px-8">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={loading} className="px-8 bg-blue-600 hover:bg-blue-700 text-white">
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {initialData ? "Update Event" : "Save Event"}
          </Button>
        </div>
        
      </form>
    </div>
  );
}
