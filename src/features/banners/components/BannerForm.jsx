"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { createBannerAction, updateBannerAction } from "@/actions/banner.actions";
import { MediaPicker } from "@/features/storage/components/MediaPicker";
import { toast } from "sonner";

export function BannerForm({ initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    
    // Convert to structured object for the server action
    const data = {
      title: {
        en: formData.get("title.en"),
        np: formData.get("title.np"),
      },
      subtitle: {
        en: formData.get("subtitle.en"),
        np: formData.get("subtitle.np"),
      },
      description: {
        en: formData.get("description.en"),
        np: formData.get("description.np"),
      },
      primaryButtonText: {
        en: formData.get("primaryButtonText.en"),
        np: formData.get("primaryButtonText.np"),
      },
      primaryButtonLink: formData.get("primaryButtonLink"),
      secondaryButtonText: {
        en: formData.get("secondaryButtonText.en"),
        np: formData.get("secondaryButtonText.np"),
      },
      secondaryButtonLink: formData.get("secondaryButtonLink"),
      order: parseInt(formData.get("order")) || 0,
      isActive: formData.get("isActive") === "on",
      imageId: formData.get("imageId") || null,
    };

    let result;
    if (initialData?._id) {
      result = await updateBannerAction(initialData._id, data);
    } else {
      result = await createBannerAction(data);
    }

    try {
      if (result.success) {
        toast.success("Success", { description: result.message || "Banner saved successfully." });
        router.push("/admin/banners");
        router.refresh();
      } else {
        toast.error("Error", { 
          description: result.errors?.length 
            ? `${result.message}\nDetails: ${result.errors.join(", ")}` 
            : result.message || "Failed to save banner." 
        });
      }
    } catch (err) {
      toast.error("Error", { description: err.message || "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/banners">
          <Button variant="outline" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            {initialData ? "Edit Banner" : "Create New Banner"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Design the slider content for the homepage hero section.
          </p>
        </div>
      </div>



      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Dual Language Inputs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-bold text-gray-900">Banner Content (Bilingual)</h3>
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
                  <label className="block text-sm font-bold text-gray-700 mb-1">Subtitle (EN) *</label>
                  <input required type="text" name="subtitle.en" defaultValue={initialData?.subtitle?.en || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
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
                  <label className="block text-sm font-bold text-gray-700 mb-1">Subtitle (NP) *</label>
                  <input required type="text" name="subtitle.np" defaultValue={initialData?.subtitle?.np || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Description (NP)</label>
                  <textarea name="description.np" defaultValue={initialData?.description?.np || ""} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons & Image */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-bold text-gray-900">Buttons & Image</h3>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-gray-600">Primary Button</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Text (EN)</label>
                  <input type="text" name="primaryButtonText.en" defaultValue={initialData?.primaryButtonText?.en || "About Us"} className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Text (NP)</label>
                  <input type="text" name="primaryButtonText.np" defaultValue={initialData?.primaryButtonText?.np || "हाम्रो बारे"} className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Link URL</label>
                <input type="text" name="primaryButtonLink" defaultValue={initialData?.primaryButtonLink || "/about"} className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm" />
              </div>

              <h4 className="font-bold text-sm text-gray-600 mt-6">Secondary Button</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Text (EN)</label>
                  <input type="text" name="secondaryButtonText.en" defaultValue={initialData?.secondaryButtonText?.en || "Our History"} className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Text (NP)</label>
                  <input type="text" name="secondaryButtonText.np" defaultValue={initialData?.secondaryButtonText?.np || "हाम्रो इतिहास"} className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Link URL</label>
                <input type="text" name="secondaryButtonLink" defaultValue={initialData?.secondaryButtonLink || "/about#history"} className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Banner Image *</label>
                <MediaPicker 
                  name="imageId" 
                  module="banners" 
                  initialData={initialData?.imageAsset} 
                />
                <p className="text-xs text-gray-500 mt-2">Full width landscape image.</p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" name="isActive" defaultChecked={initialData ? initialData.isActive : true} className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                  <div>
                    <span className="block font-bold text-gray-900 text-sm">Active</span>
                    <span className="block text-xs text-gray-500">Show this banner on the homepage.</span>
                  </div>
                </label>
              </div>

              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-1">Display Order</label>
                 <input type="number" name="order" defaultValue={initialData?.order || 0} className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                 <p className="text-xs text-gray-500 mt-1">Lower numbers appear first.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end gap-4 pt-6">
          <Link href="/admin/banners">
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
            {initialData ? "Update Banner" : "Save Banner"}
          </Button>
        </div>
        
      </form>
    </div>
  );
}
