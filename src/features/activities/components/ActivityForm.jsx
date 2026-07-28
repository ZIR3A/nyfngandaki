"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { createActivity, updateActivity } from "../actions/activity.actions";

export function ActivityForm({ initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);
    
    // Add checkbox fallback if they aren't checked
    if (!formData.get("featured")) formData.append("featured", "off");
    if (!formData.get("visibility")) formData.append("visibility", "off");

    let result;
    if (initialData?._id) {
      result = await updateActivity(initialData._id, formData);
    } else {
      result = await createActivity(formData);
    }

    if (result.success) {
      router.push("/admin/activities");
      router.refresh();
    } else {
      setError(result.message);
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/activities">
          <Button variant="outline" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            {initialData ? "Edit Activity" : "Create New Activity"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Fill in the details for the social impact activity in both English and Nepali.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-medium text-sm border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Dual Language Inputs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-bold text-gray-900">Content Details</h3>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* English */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-[#1546B0] uppercase tracking-wider">English Content</h4>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Title (EN) *</label>
                  <input required type="text" name="title.en" defaultValue={initialData?.title?.en || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="e.g. Blood Donation Camp" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Description (EN)</label>
                  <textarea name="description.en" defaultValue={initialData?.description?.en || ""} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="Describe the activity..."></textarea>
                </div>
              </div>

              {/* Nepali */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-[#D71920] uppercase tracking-wider">Nepali Content</h4>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Title (NP) *</label>
                  <input required type="text" name="title.np" defaultValue={initialData?.title?.np || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500" placeholder="उदा. रक्तदान कार्यक्रम" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Description (NP)</label>
                  <textarea name="description.np" defaultValue={initialData?.description?.np || ""} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500" placeholder="गतिविधिको बारेमा वर्णन गर्नुहोस्..."></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Settings & Statistics */}
        <div className="grid md:grid-cols-2 gap-6">
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-bold text-gray-900">Activity Properties</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Activity Type *</label>
                <select required name="type" defaultValue={initialData?.type || "Social"} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                  <option value="Social">Social</option>
                  <option value="Health">Health</option>
                  <option value="Education">Education</option>
                  <option value="Environment">Environment</option>
                  <option value="Sports">Sports</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Image URL</label>
                <div className="flex gap-2">
                  <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-lg">
                    <ImageIcon className="w-4 h-4" />
                  </span>
                  <input type="url" name="image" defaultValue={initialData?.image || ""} className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="https://example.com/image.jpg" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Provide a direct URL to the image for now.</p>
              </div>

              <div className="pt-4 space-y-3 border-t border-gray-100">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" name="featured" defaultChecked={initialData ? initialData.featured : false} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <div>
                    <span className="block font-bold text-gray-900 text-sm">Feature on Homepage</span>
                    <span className="block text-xs text-gray-500">This activity will be highlighted.</span>
                  </div>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" name="visibility" defaultChecked={initialData ? initialData.visibility : true} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <div>
                    <span className="block font-bold text-gray-900 text-sm">Visible to Public</span>
                    <span className="block text-xs text-gray-500">Show this activity on the website.</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-bold text-gray-900">Key Statistic (Optional)</h3>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-500 mb-2">Display a prominent number associated with this activity (e.g. "150+ Donors").</p>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Statistic Value</label>
                <input type="text" name="statistics.value" defaultValue={initialData?.statistics?.value || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="e.g. 500+" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Label (EN)</label>
                <input type="text" name="statistics.label.en" defaultValue={initialData?.statistics?.label?.en || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="e.g. Participants" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Label (NP)</label>
                <input type="text" name="statistics.label.np" defaultValue={initialData?.statistics?.label?.np || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="e.g. सहभागीहरू" />
              </div>
            </div>
          </div>

        </div>

        {/* Submit Actions */}
        <div className="flex justify-end gap-4 pt-6">
          <Link href="/admin/activities">
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
            {initialData ? "Update Activity" : "Save Activity"}
          </Button>
        </div>
        
      </form>
    </div>
  );
}
