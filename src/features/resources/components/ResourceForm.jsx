"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Loader2, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { createResource, updateResource } from "../actions/resource.actions";
import { MediaPicker } from "@/features/storage/components/MediaPicker";

export function ResourceForm({ initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);
    
    if (!formData.get("visibility")) formData.append("visibility", "off");

    let result;
    if (initialData?._id) {
      result = await updateResource(initialData._id, formData);
    } else {
      result = await createResource(formData);
    }

    if (result.success) {
      router.push("/admin/resources");
      router.refresh();
    } else {
      setError(result.message);
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/resources">
          <Button variant="outline" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            {initialData ? "Edit Resource" : "Create New Resource"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Fill in the details for the document, PDF, or guideline.
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
            <h3 className="font-bold text-gray-900">Resource Details (Bilingual)</h3>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* English */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-[#1546B0] uppercase tracking-wider">English Content</h4>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Title (EN) *</label>
                  <input required type="text" name="title.en" defaultValue={initialData?.title?.en || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Description (EN)</label>
                  <textarea name="description.en" defaultValue={initialData?.description?.en || ""} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"></textarea>
                </div>
              </div>

              {/* Nepali */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-[#D71920] uppercase tracking-wider">Nepali Content</h4>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Title (NP) *</label>
                  <input required type="text" name="title.np" defaultValue={initialData?.title?.np || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Description (NP)</label>
                  <textarea name="description.np" defaultValue={initialData?.description?.np || ""} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* File Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-bold text-gray-900">File Information</h3>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Resource File *</label>
                  <MediaPicker name="fileId" module="resources" accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*" />
                  <p className="text-xs text-gray-500 mt-1">Upload the document or PDF file.</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Thumbnail (Optional)</label>
                  <MediaPicker name="thumbnailId" module="resources" accept="image/*" />
                  <p className="text-xs text-gray-500 mt-1">Cover image for the resource list.</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">File Size</label>
                <input type="text" name="fileSize" defaultValue={initialData?.fileSize || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="e.g. 2.4 MB" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Badges (Optional)</label>
                <input type="text" name="badges" defaultValue={initialData?.badges?.join(", ") || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="e.g. PDF, Official" />
                <p className="text-xs text-gray-500 mt-1">Comma-separated tags to display alongside the resource.</p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" name="visibility" defaultChecked={initialData ? initialData.visibility : true} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <div>
                    <span className="block font-bold text-gray-900 text-sm">Visible to Public</span>
                    <span className="block text-xs text-gray-500">Show this resource on the website.</span>
                  </div>
                </label>
              </div>
            </div>

          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end gap-4 pt-6">
          <Link href="/admin/resources">
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
            {initialData ? "Update Resource" : "Save Resource"}
          </Button>
        </div>
        
      </form>
    </div>
  );
}
