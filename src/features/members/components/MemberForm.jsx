"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createMemberAction, updateMemberAction } from "@/actions/member.actions";
import { MediaPicker } from "@/features/storage/components/MediaPicker";
import { getDepartmentsAction } from "@/actions/department.actions";
import { LocalizedInput } from "@/features/admin/about/components/shared/LocalizedInput";
import { LocalizedTextarea } from "@/features/admin/about/components/shared/LocalizedTextarea";
import { toast } from "sonner";

export const MemberForm = ({ initialData = null, districts = [], committees = [], positions = [] }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: initialData?.name || { en: "", np: "" },
    organizationLevel: initialData?.organizationLevel || "Province",
    position_id: initialData?.position_id?._id || initialData?.position_id || "",
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
    district: initialData?.district?._id || initialData?.district || "",
  });



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;
      if (initialData?._id) {
        res = await updateMemberAction(initialData._id, formData);
      } else {
        res = await createMemberAction(formData);
      }
      
      if (res.success) {
        toast.success("Success", { description: res.message });
        router.push("/admin/members");
        router.refresh();
      } else {
        toast.error("Error", { 
          description: res.errors?.length 
            ? `${res.message}\nDetails: ${res.errors.join(", ")}` 
            : res.message 
        });
      }
    } catch (err) {
      toast.error("Error", { description: "An unexpected error occurred." });
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



      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Personal Information Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2">Personal Information</h3>
          
          <div className="space-y-8">
            {/* Name */}
            <div>
              <LocalizedInput
                label="Full Name"
                placeholder={{ en: "e.g. Ram Bahadur Thapa", np: "उदा. राम बहादुर थापा" }}
                value={formData.name}
                onChange={(val) => setFormData({ ...formData, name: val })}
                required
              />
            </div>

            {/* Photos */}
            <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
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
              </div>
            </div>

            {/* Contact */}
            <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
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

            {/* Biography */}
            <div className="pt-4 border-t border-gray-100">
              <LocalizedTextarea
                label="Biography"
                placeholder={{ en: "Short bio in English...", np: "छोटो जीवनी..." }}
                value={formData.biography}
                onChange={(val) => setFormData({ ...formData, biography: val })}
                rows={5}
              />
            </div>
          </div>
        </div>

        {/* Organization Information Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2">Organization Information</h3>
          
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Organization Level <span className="text-red-500">*</span></label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input 
                      type="radio" 
                      name="organizationLevel" 
                      value="Central" 
                      checked={formData.organizationLevel === "Central"}
                      onChange={(e) => {
                        setFormData({...formData, organizationLevel: e.target.value, district: ""});
                      }}
                      className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    Central
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input 
                      type="radio" 
                      name="organizationLevel" 
                      value="Province" 
                      checked={formData.organizationLevel === "Province" || formData.organizationLevel === "PROVINCE"}
                      onChange={(e) => {
                        setFormData({...formData, organizationLevel: "Province", district: ""});
                      }}
                      className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    Province Committee
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input 
                      type="radio" 
                      name="organizationLevel" 
                      value="District" 
                      checked={formData.organizationLevel === "District" || formData.organizationLevel === "DISTRICT"}
                      onChange={(e) => setFormData({...formData, organizationLevel: "District"})}
                      className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    District Committee
                  </label>
                </div>
              </div>


            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {(formData.organizationLevel === "District" || formData.organizationLevel === "DISTRICT") && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">District Assignment <span className="text-red-500">*</span></label>
                  <select 
                    className="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.district}
                    onChange={(e) => setFormData({...formData, district: e.target.value})}
                    required
                  >
                    <option value="">-- Select a District --</option>
                    {districts.map(d => (
                      <option key={d._id} value={d._id}>{d.name?.en} ({d.name?.np})</option>
                    ))}
                  </select>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Member Status</label>
                <select 
                  className="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>



            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Position <span className="text-red-500">*</span></label>
                <select 
                  className="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.position_id}
                  onChange={(e) => setFormData({...formData, position_id: e.target.value})}
                  required
                >
                  <option value="">-- Select a Position --</option>
                  {positions.map(p => (
                    <option key={p._id} value={p._id}>{p.name?.en} ({p.name?.np})</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
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
