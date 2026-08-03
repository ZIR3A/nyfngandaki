"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Eye, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocalizedTextarea } from "@/features/admin/about/components/shared/LocalizedTextarea";
import { LocalizedRichTextEditor } from "@/features/admin/about/components/shared/LocalizedRichTextEditor";
import { LocalizedInput } from "@/features/admin/about/components/shared/LocalizedInput";
import { MediaPicker } from "@/features/storage/components/MediaPicker";
import { MemberSelector } from "./MemberSelector";
import { createLeadershipMessageAction, updateLeadershipMessageAction } from "@/actions/leadership-message.actions";
import { toast } from "sonner";
import { z } from "zod";

// Preview subcomponents (internal to keep it self-contained for now)
const HomepagePreview = ({ member, shortMessage, isNepali }) => (
  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col h-full max-w-sm mx-auto">
    <div className="p-6 flex flex-col items-center text-center">
      {member?.photo ? (
        <img src={member.photo} alt="Avatar" className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white dark:border-slate-800 shadow-sm" />
      ) : (
        <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-3xl mb-4 border-4 border-white dark:border-slate-800 shadow-sm">
          {member?.name?.en?.charAt(0) || "U"}
        </div>
      )}
      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-0.5 rounded-full mb-2">
        {isNepali ? (member?.position_id?.name?.np || member?.position_id?.name?.en || 'Position') : (member?.position_id?.name?.en || 'Position')}
      </span>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
        {isNepali ? (member?.name?.np || member?.name?.en || 'Name') : (member?.name?.en || 'Name')}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-4">
        {isNepali ? (shortMessage.np || 'Short message content...') : (shortMessage.en || 'Short message content...')}
      </p>
      <Button variant="outline" className="w-full mt-auto rounded-full">
        {isNepali ? 'थप पढ्नुहोस्' : 'Read Full Message'}
      </Button>
    </div>
  </div>
);

const AboutPreview = ({ member, fullMessage, isNepali }) => (
  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm max-w-4xl mx-auto w-full">
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 bg-slate-50 dark:bg-slate-950 p-6 flex flex-col items-center border-r border-slate-100 dark:border-slate-800">
        {member?.photo ? (
          <img src={member.photo} alt="Avatar" className="w-32 h-32 rounded-full object-cover mb-4 shadow-sm" />
        ) : (
          <div className="w-32 h-32 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-4xl mb-4 shadow-sm">
            {member?.name?.en?.charAt(0) || "U"}
          </div>
        )}
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-0.5 rounded-full mb-2">
          {isNepali ? (member?.position_id?.name?.np || member?.position_id?.name?.en || 'Position') : (member?.position_id?.name?.en || 'Position')}
        </span>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center">
          {isNepali ? (member?.name?.np || member?.name?.en || 'Name') : (member?.name?.en || 'Name')}
        </h3>
      </div>
      <div className="w-full md:w-2/3 p-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          {isNepali ? 'नेतृत्वको सन्देश' : 'Message from Leadership'}
        </h2>
        <div 
          className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300"
          dangerouslySetInnerHTML={{ __html: isNepali ? (fullMessage.np || '<p>Message content goes here...</p>') : (fullMessage.en || '<p>Message content goes here...</p>') }}
        />
      </div>
    </div>
  </div>
);

export const LeadershipMessageForm = ({ initialData = null }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("form"); // "form" or "preview"
  const [previewLang, setPreviewLang] = useState("en");

  const [formData, setFormData] = useState({
    member_id: initialData?.member_id || null, // Full member object for selector, we extract _id for payload
    is_custom_person: initialData?.is_custom_person || false,
    custom_name_en: initialData?.custom_name_en || "",
    custom_name_np: initialData?.custom_name_np || "",
    custom_position_en: initialData?.custom_position_en || "",
    custom_position_np: initialData?.custom_position_np || "",
    custom_photo: initialData?.custom_photo || "",
    short_message_en: initialData?.short_message_en || "",
    short_message_np: initialData?.short_message_np || "",
    full_message_en: initialData?.full_message_en || "",
    full_message_np: initialData?.full_message_np || "",
    homepage_visible: initialData?.homepage_visible !== false,
    about_visible: initialData?.about_visible !== false,
    featured: initialData?.featured || false,
    display_order: initialData?.display_order || 0,
    status: initialData?.status || "draft",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (formData.is_custom_person) {
      if (!formData.custom_name_en) newErrors.custom_name_en = "Custom English Name is required.";
    } else {
      if (!formData.member_id) newErrors.member_id = "Member is required.";
    }
    
    if (!formData.short_message_en) newErrors.short_message_en = "Short Message (English) is required.";
    if (formData.short_message_en?.length > 300) newErrors.short_message_en = "Cannot exceed 300 characters.";
    if (!formData.full_message_en) newErrors.full_message_en = "Full Message (English) is required.";
    if (formData.display_order < 0) newErrors.display_order = "Must be a positive number.";

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      // Auto focus first error logically (basic implementation)
      toast.error("Please fix the validation errors.");
      return false;
    }
    return true;
  };

  const handleSave = async (e, saveAndContinue = false) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        member_id: formData.is_custom_person ? null : (formData.member_id?._id || null), // Extract ID safely
      };

      let res;
      if (initialData?._id) {
        res = await updateLeadershipMessageAction(initialData._id, payload);
      } else {
        res = await createLeadershipMessageAction(payload);
      }

      if (res.success) {
        toast.success(res.message || "Leadership Message saved successfully.");
        if (!saveAndContinue) {
          router.push("/admin/leadership-messages");
        } else if (!initialData?._id) {
          // Redirect to edit mode if we just created it and want to continue
          router.push(`/admin/leadership-messages/${res.data._id}`);
        }
      } else {
        toast.error(res.message || "Failed to save message.");
        if (res.errors?.length > 0) {
          // Map zod errors to state if applicable
          const apiErrors = {};
          res.errors.forEach(err => {
            if (err.path && err.path[0]) {
              apiErrors[err.path[0]] = err.message;
            }
          });
          setErrors(apiErrors);
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => handleSave(e, false)} className="pb-24">
      {/* Sticky Header Actions */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 pb-4 mb-8 pt-4 -mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/leadership-messages">
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {initialData ? "Edit Leadership Message" : "New Leadership Message"}
            </h1>
            <p className="text-sm text-slate-500">Configure what leaders have to say.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" onClick={() => setActiveTab(activeTab === "form" ? "preview" : "form")}>
            {activeTab === "form" ? <><Eye className="w-4 h-4 mr-2"/> Preview</> : <><Layout className="w-4 h-4 mr-2"/> Edit Form</>}
          </Button>
          <Button type="button" variant="secondary" onClick={(e) => handleSave(e, true)} disabled={loading}>
            Save Draft
          </Button>
          <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Save className="h-4 w-4 mr-2" />
            {initialData ? "Save Changes" : "Publish Message"}
          </Button>
        </div>
      </div>

      {activeTab === "form" ? (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <div className="xl:col-span-2 space-y-8">
            
            {/* Section 1: Basic Information */}
            <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Basic Information</h2>
              </div>
              
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg w-fit">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, is_custom_person: false })}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${!formData.is_custom_person ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                  disabled={!!initialData}
                >
                  Registered Member
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, is_custom_person: true })}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${formData.is_custom_person ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                  disabled={!!initialData}
                >
                  Custom Person
                </button>
              </div>

              {!formData.is_custom_person ? (
                <MemberSelector
                  value={formData.member_id}
                  onChange={(val) => {
                    setFormData({ ...formData, member_id: val });
                    if (errors.member_id) setErrors({ ...errors, member_id: null });
                  }}
                  disabled={!!initialData} 
                  existingMessageError={errors.member_id}
                />
              ) : (
                <div className="space-y-6 border border-slate-200 dark:border-slate-800 rounded-lg p-6 bg-slate-50 dark:bg-slate-900/50">
                  <LocalizedInput
                    label="Name"
                    required={true}
                    value={{ en: formData.custom_name_en, np: formData.custom_name_np }}
                    onChange={(val) => {
                      setFormData({ ...formData, custom_name_en: val.en, custom_name_np: val.np });
                      if (errors.custom_name_en) setErrors({ ...errors, custom_name_en: null });
                    }}
                    placeholder={{ en: "e.g., Ram Bahadur", np: "जस्तै: राम बहादुर" }}
                  />
                  {errors.custom_name_en && <p className="text-sm text-red-500 mt-1">{errors.custom_name_en}</p>}

                  <LocalizedInput
                    label="Position / Title"
                    value={{ en: formData.custom_position_en, np: formData.custom_position_np }}
                    onChange={(val) => setFormData({ ...formData, custom_position_en: val.en, custom_position_np: val.np })}
                    placeholder={{ en: "e.g., Chief Guest", np: "जस्तै: प्रमुख अतिथि" }}
                  />

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Photo</label>
                    <MediaPicker
                      key={formData.custom_photo || 'empty'}
                      name="custom_photo"
                      module="leadership-messages"
                      multiple={false}
                      initialData={formData.custom_photo ? { _id: formData.custom_photo, publicUrl: formData.custom_photo, mimeType: "image/jpeg" } : null}
                      onUpload={(asset) => setFormData({ ...formData, custom_photo: asset.publicUrl })}
                      onRemove={() => setFormData({ ...formData, custom_photo: "" })}
                    />
                  </div>
                </div>
              )}
            </section>

            {/* Section 2: Homepage Message */}
            <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Homepage Message</h2>
                <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.homepage_visible}
                    onChange={(e) => setFormData({ ...formData, homepage_visible: e.target.checked })}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  Show on Homepage
                </label>
              </div>
              
              <LocalizedTextarea
                label="Short Message"
                description="This appears on the homepage card. Recommended 180-220 characters."
                required={true}
                value={{ en: formData.short_message_en, np: formData.short_message_np }}
                onChange={(val) => {
                  setFormData({ ...formData, short_message_en: val.en, short_message_np: val.np });
                  if (errors.short_message_en) setErrors({ ...errors, short_message_en: null });
                }}
                placeholder={{ en: "Write a short inspiring message...", np: "छोटो सन्देश लेख्नुहोस्..." }}
                rows={3}
              />
              {errors.short_message_en && <p className="mt-1 text-sm text-red-500">{errors.short_message_en}</p>}
              <div className="mt-2 text-xs text-right text-slate-500">
                EN: {formData.short_message_en.length}/300 | NP: {formData.short_message_np.length}/300
              </div>
            </section>

            {/* Section 3: About Page Message */}
            <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. About Page Message</h2>
                <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.about_visible}
                    onChange={(e) => setFormData({ ...formData, about_visible: e.target.checked })}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  Show on About Page
                </label>
              </div>
              
              <LocalizedRichTextEditor
                label="Full Message"
                description="The complete message to be displayed on the About page."
                required={true}
                value={{ en: formData.full_message_en, np: formData.full_message_np }}
                onChange={(val) => {
                  setFormData({ ...formData, full_message_en: val.en, full_message_np: val.np });
                  if (errors.full_message_en) setErrors({ ...errors, full_message_en: null });
                }}
              />
              {errors.full_message_en && <p className="mt-1 text-sm text-red-500">{errors.full_message_en}</p>}
            </section>
          </div>

          {/* Sidebar / Section 4 & 5 & Live Preview */}
          <div className="space-y-8">
            {/* Section 4 & 5: Publishing & Display */}
            <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Publishing & Settings</h2>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <p className="mt-1 text-xs text-slate-500">Lower numbers appear first.</p>
                {errors.display_order && <p className="mt-1 text-sm text-red-500">{errors.display_order}</p>}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  Feature this message
                </label>
                <p className="mt-1 text-xs text-slate-500 ml-6">Highlight this message above others.</p>
              </div>
            </section>

            {/* Live Preview Sidecard */}
            <section className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hidden sm:block">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex justify-between items-center">
                Live Preview (Home)
                <span className="text-xs font-normal text-slate-500 normal-case bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">EN</span>
              </h2>
              <div className="scale-90 origin-top">
                <HomepagePreview 
                  member={formData.is_custom_person ? {
                    name: { en: formData.custom_name_en, np: formData.custom_name_np },
                    position_id: { name: { en: formData.custom_position_en, np: formData.custom_position_np } },
                    photo: formData.custom_photo
                  } : formData.member_id} 
                  shortMessage={{ en: formData.short_message_en, np: formData.short_message_np }} 
                  isNepali={false} 
                />
              </div>
            </section>
          </div>
        </div>
      ) : (
        /* Section 6: Full Preview Tab */
        <div className="space-y-8 bg-slate-100 dark:bg-black p-8 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center mb-8 bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Device Previews</h2>
            <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
              <button type="button" onClick={() => setPreviewLang("en")} className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors ${previewLang === 'en' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-500'}`}>English</button>
              <button type="button" onClick={() => setPreviewLang("np")} className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors ${previewLang === 'np' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-500'}`}>Nepali</button>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Homepage Card View</h3>
              <HomepagePreview 
                member={formData.is_custom_person ? {
                  name: { en: formData.custom_name_en, np: formData.custom_name_np },
                  position_id: { name: { en: formData.custom_position_en, np: formData.custom_position_np } },
                  photo: formData.custom_photo
                } : formData.member_id} 
                shortMessage={{ en: formData.short_message_en, np: formData.short_message_np }} 
                isNepali={previewLang === 'np'} 
              />
            </div>
            <div className="border-t border-slate-300 dark:border-slate-800 pt-12">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">About Page View</h3>
              <AboutPreview 
                member={formData.is_custom_person ? {
                  name: { en: formData.custom_name_en, np: formData.custom_name_np },
                  position_id: { name: { en: formData.custom_position_en, np: formData.custom_position_np } },
                  photo: formData.custom_photo
                } : formData.member_id} 
                fullMessage={{ en: formData.full_message_en, np: formData.full_message_np }} 
                isNepali={previewLang === 'np'} 
              />
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
