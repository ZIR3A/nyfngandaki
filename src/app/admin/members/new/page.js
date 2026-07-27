"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createMemberAction } from "@/actions/member.actions";
// Assuming you have these UI components or basic HTML replacements
// import { Label } from "@/components/ui/label"; 
// import { Textarea } from "@/components/ui/textarea";

export default function NewMemberPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: { en: "", np: "" },
    position: { en: "", np: "" },
    biography: { en: "", np: "" },
    email: "",
    phone: "",
    facebook: "",
    status: "Active"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await createMemberAction(formData);
      if (res.success) {
        router.push("/admin/members");
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/members">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Add New Member</h1>
          <p className="text-gray-500 text-sm">Create a new member profile in the directory.</p>
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
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Full Name (English) *</label>
              <Input 
                required 
                placeholder="e.g. Ram Bahadur Thapa"
                value={formData.name.en}
                onChange={(e) => setFormData({...formData, name: { ...formData.name, en: e.target.value }})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Full Name (Nepali)</label>
              <Input 
                placeholder="e.g. राम बहादुर थापा"
                value={formData.name.np}
                onChange={(e) => setFormData({...formData, name: { ...formData.name, np: e.target.value }})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Position (English) *</label>
              <Input 
                required 
                placeholder="e.g. Member"
                value={formData.position.en}
                onChange={(e) => setFormData({...formData, position: { ...formData.position, en: e.target.value }})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Position (Nepali)</label>
              <Input 
                placeholder="e.g. सदस्य"
                value={formData.position.np}
                onChange={(e) => setFormData({...formData, position: { ...formData.position, np: e.target.value }})}
              />
            </div>
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
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Biography (English)</label>
              <textarea 
                className="w-full h-32 p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                placeholder="Short bio in English..."
                value={formData.biography.en}
                onChange={(e) => setFormData({...formData, biography: { ...formData.biography, en: e.target.value }})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Biography (Nepali)</label>
              <textarea 
                className="w-full h-32 p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                placeholder="Short bio in Nepali..."
                value={formData.biography.np}
                onChange={(e) => setFormData({...formData, biography: { ...formData.biography, np: e.target.value }})}
              />
            </div>
          </div>
        </div>
        
        {/* Photo Upload Placeholder (For GCS later) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2">Profile Photo</h3>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50/50">
            <ImageIcon className="h-10 w-10 text-gray-400 mb-3" />
            <p className="text-sm font-bold text-gray-700">Upload Photo</p>
            <p className="text-xs text-gray-500 mt-1">Image uploads will be integrated with Google Cloud Storage in the next phase.</p>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Save className="h-4 w-4 mr-2" /> Save Member</>}
          </Button>
        </div>

      </form>
    </div>
  );
}
