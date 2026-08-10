"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { createBannerAction, updateBannerAction } from "@/actions/banner.actions";
import { MediaPicker } from "@/features/storage/components/MediaPicker";
import { LocalizedInput } from "@/features/admin/about/components/shared/LocalizedInput";
import { LocalizedTextarea } from "@/features/admin/about/components/shared/LocalizedTextarea";
import { toast } from "sonner";

export function BannerForm({ initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData?.title || { en: "", np: "" },
    subtitle: initialData?.subtitle || { en: "", np: "" },
    description: initialData?.description || { en: "", np: "" },
    primaryButtonText: initialData?.primaryButtonText || { en: "About Us", np: "हाम्रो बारे" },
    primaryButtonLink: initialData?.primaryButtonLink || "/about",
    secondaryButtonText: initialData?.secondaryButtonText || { en: "Our History", np: "हाम्रो इतिहास" },
    secondaryButtonLink: initialData?.secondaryButtonLink || "/about#history",
    order: initialData?.order || 0,
    isActive: initialData ? initialData.isActive : true,
    imageId: initialData?.imageId || null,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    let result;
    if (initialData?._id) {
      result = await updateBannerAction(initialData._id, formData);
    } else {
      result = await createBannerAction(formData);
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

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Dual Language Inputs */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2">Banner Content (Bilingual)</h3>
          
          <div className="space-y-8">
            <LocalizedInput
              label="Title"
              value={formData.title}
              onChange={(val) => setFormData({ ...formData, title: val })}
              required
            />
            
            <LocalizedInput
              label="Subtitle"
              value={formData.subtitle}
              onChange={(val) => setFormData({ ...formData, subtitle: val })}
              required
            />

            <LocalizedTextarea
              label="Description"
              value={formData.description}
              onChange={(val) => setFormData({ ...formData, description: val })}
              rows={3}
            />
          </div>
        </div>

        {/* Action Buttons & Image */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2">Buttons & Image</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-gray-700 border-b pb-1">Primary Button</h4>
                <LocalizedInput
                  label="Text"
                  value={formData.primaryButtonText}
                  onChange={(val) => setFormData({ ...formData, primaryButtonText: val })}
                />
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Link URL</label>
                  <Input 
                    type="text" 
                    value={formData.primaryButtonLink}
                    onChange={(e) => setFormData({ ...formData, primaryButtonLink: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h4 className="font-bold text-sm text-gray-700 border-b pb-1">Secondary Button</h4>
                <LocalizedInput
                  label="Text"
                  value={formData.secondaryButtonText}
                  onChange={(val) => setFormData({ ...formData, secondaryButtonText: val })}
                />
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Link URL</label>
                  <Input 
                    type="text" 
                    value={formData.secondaryButtonLink}
                    onChange={(e) => setFormData({ ...formData, secondaryButtonLink: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Banner Image *</label>
                <MediaPicker 
                  name="imageId" 
                  module="banners" 
                  initialData={initialData?.imageAsset}
                  onUpload={(asset) => setFormData((fd) => ({ ...fd, imageId: asset._id }))}
                  onRemove={() => setFormData((fd) => ({ ...fd, imageId: null }))}
                />
                <p className="text-xs text-gray-500 mt-2">Full width landscape image.</p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500" 
                  />
                  <div>
                    <span className="block font-bold text-gray-900 text-sm">Active</span>
                    <span className="block text-xs text-gray-500">Show this banner on the homepage.</span>
                  </div>
                </label>
              </div>

              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-1">Display Order</label>
                 <Input 
                   type="number" 
                   value={formData.order}
                   onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                 />
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
