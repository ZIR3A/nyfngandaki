"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createMemberAction, updateMemberAction } from "@/actions/member.actions";
import { MediaPicker } from "@/features/storage/components/MediaPicker";
import { LocalizedInput } from "@/features/admin/about/components/shared/LocalizedInput";
import { LocalizedTextarea } from "@/features/admin/about/components/shared/LocalizedTextarea";

export const MemberForm = ({ initialData = null }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: initialData?.name || { en: "", np: "" },
    position: initialData?.position || { en: "", np: "" },
    biography: initialData?.biography || { en: "", np: "" },
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    facebook: initialData?.facebook || "",
    status: initialData?.status || "Active",
    isFeaturedOnHome: initialData?.isFeaturedOnHome || false,
    showPhonePublic: initialData?.showPhonePublic || false,
    showEmailPublic: initialData?.showEmailPublic || false,
    isChairperson: initialData?.isChairperson || false,
    displayOrder: initialData?.displayOrder || 0,
    profilePhotoId: initialData?.profilePhotoId || null,
    coverPhotoId: initialData?.coverPhotoId || null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let res;
      if (initialData?._id) {
        res = await updateMemberAction(initialData._id, formData);
      } else {
        res = await createMemberAction(formData);
      }
      
      if (res.success) {
        router.push("/admin/members");
        router.refresh();
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const isEdit = !!initialData;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/members">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            {isEdit ? "Edit Member" : "Add New Member"}
          </h1>
          <p className="text-gray-500 text-sm">
            {isEdit ? "Update member profile in the directory." : "Create a new member profile in the directory."}
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Basic Info Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2">Basic Information</h3>
          
          <div className="space-y-6">
            <LocalizedInput
              label="Full Name"
              placeholder={{ en: "e.g. Ram Bahadur Thapa", np: "उदा. राम बहादुर थापा" }}
              value={formData.name}
              onChange={(val) => setFormData({ ...formData, name: val })}
              required
            />
            <LocalizedInput
              label="Position"
              placeholder={{ en: "e.g. Member", np: "उदा. सदस्य" }}
              value={formData.position}
              onChange={(val) => setFormData({ ...formData, position: val })}
              required
            />
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2">Contact Information</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Email Address</label>
              <Input 
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Phone Number</label>
              <Input 
                placeholder="+977 98..."
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-gray-700">Facebook URL</label>
              <Input 
                placeholder="https://facebook.com/..."
                value={formData.facebook}
                onChange={(e) => setFormData({...formData, facebook: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Biography Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2">Biography</h3>
          
          <LocalizedTextarea
            label="Biography"
            placeholder={{ en: "Short bio in English...", np: "छोटो जीवनी..." }}
            value={formData.biography}
            onChange={(val) => setFormData({ ...formData, biography: val })}
            rows={5}
          />
        </div>
        
        {/* Visibility & Ordering Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2">Visibility & Ordering</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={formData.isChairperson}
                  onChange={(e) => setFormData({...formData, isChairperson: e.target.checked})}
                />
                Is Chairperson / Leader
              </label>
              <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={formData.isFeaturedOnHome}
                  onChange={(e) => setFormData({...formData, isFeaturedOnHome: e.target.checked})}
                />
                Feature on Homepage
              </label>
              <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={formData.showPhonePublic}
                  onChange={(e) => setFormData({...formData, showPhonePublic: e.target.checked})}
                />
                Show Phone Number Publicly
              </label>
              <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={formData.showEmailPublic}
                  onChange={(e) => setFormData({...formData, showEmailPublic: e.target.checked})}
                />
                Show Email Address Publicly
              </label>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Display Order (Ascending)</label>
              <Input 
                type="number"
                placeholder="0"
                value={formData.displayOrder}
                onChange={(e) => setFormData({...formData, displayOrder: parseInt(e.target.value) || 0})}
              />
              <p className="text-xs text-gray-500">Lower numbers appear first on the homepage and directory.</p>
            </div>
          </div>
        </div>
        
        {/* Photo Upload */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2">Photos</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Profile Photo (Optional)</label>
              <MediaPicker
                name="profilePhotoId"
                module="members"
                initialData={
                  initialData?.profilePhotoId && initialData?.photo
                    ? { 
                        _id: initialData.profilePhotoId, 
                        publicUrl: initialData.photo, 
                        mimeType: "image/jpeg" 
                      } 
                    : null
                }
                onUpload={(asset) => setFormData((fd) => ({ ...fd, profilePhotoId: asset._id }))}
                onRemove={() => setFormData((fd) => ({ ...fd, profilePhotoId: null }))}
              />
              <p className="text-xs text-gray-500 mt-2">Upload a professional headshot for the directory.</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Cover Photo (Optional)</label>
              <MediaPicker
                name="coverPhotoId"
                module="members"
                initialData={
                  initialData?.coverPhotoId && initialData?.coverPhoto
                    ? { 
                        _id: initialData.coverPhotoId, 
                        publicUrl: initialData.coverPhoto, 
                        mimeType: "image/jpeg" 
                      } 
                    : null
                }
                onUpload={(asset) => setFormData((fd) => ({ ...fd, coverPhotoId: asset._id }))}
                onRemove={() => setFormData((fd) => ({ ...fd, coverPhotoId: null }))}
              />
              <p className="text-xs text-gray-500 mt-2">Cover image for the member's detailed profile page.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Save className="h-4 w-4 mr-2" /> {isEdit ? "Update Member" : "Save Member"}</>}
          </Button>
        </div>

      </form>
    </div>
  );
};
