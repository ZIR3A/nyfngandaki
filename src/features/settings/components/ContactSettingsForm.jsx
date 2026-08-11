"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Save, Loader2, MapPin, Share2, Clock, Phone, Mail, Plus, Trash2, ArrowLeft } from "lucide-react";
import { updateContactSettings } from "../actions/setting.actions";
import { LocalizedInput } from "@/features/admin/about/components/shared/LocalizedInput";
import { toast } from "sonner";
import Link from "next/link";

export function ContactSettingsForm({ initialData = {} }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const [contactData, setContactData] = useState({
    address_en: initialData?.contact?.address?.en || "",
    address_np: initialData?.contact?.address?.np || "",
    website: initialData?.contact?.website || "",
    latitude: initialData?.contact?.location?.latitude || "",
    longitude: initialData?.contact?.location?.longitude || "",
    facebook: initialData?.socialLinks?.facebook || "",
    twitter: initialData?.socialLinks?.twitter || "",
    instagram: initialData?.socialLinks?.instagram || "",
    youtube: initialData?.socialLinks?.youtube || "",
    tiktok: initialData?.socialLinks?.tiktok || "",
  });

  const [phones, setPhones] = useState(initialData?.contact?.phones?.length > 0 ? initialData.contact.phones : []);
  const [emails, setEmails] = useState(initialData?.contact?.emails?.length > 0 ? initialData.contact.emails : []);

  const [officeHours, setOfficeHours] = useState(initialData?.officeHours || {
    sunday: { enabled: true, open: "10:00", close: "17:00" },
    monday: { enabled: true, open: "10:00", close: "17:00" },
    tuesday: { enabled: true, open: "10:00", close: "17:00" },
    wednesday: { enabled: true, open: "10:00", close: "17:00" },
    thursday: { enabled: true, open: "10:00", close: "17:00" },
    friday: { enabled: true, open: "10:00", close: "17:00" },
    saturday: { enabled: false, open: "10:00", close: "17:00" },
  });

  const tabs = [
    { id: "general", label: "General Contact", icon: MapPin },
    { id: "hours", label: "Office Hours", icon: Clock },
    { id: "social", label: "Social Media", icon: Share2 },
  ];

  const handleOfficeHourChange = (day, field, value) => {
    setOfficeHours(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  const addPhone = () => {
    setPhones([...phones, { label: { en: "", np: "" }, number: "", primary: phones.length === 0 }]);
  };

  const removePhone = (index) => {
    setPhones(phones.filter((_, i) => i !== index));
  };

  const addEmail = () => {
    setEmails([...emails, { label: { en: "", np: "" }, email: "", primary: emails.length === 0 }]);
  };

  const removeEmail = (index) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    
    formData.append("contact.address.en", contactData.address_en);
    formData.append("contact.address.np", contactData.address_np);
    formData.append("contact.website", contactData.website);
    if (contactData.latitude) formData.append("contact.location.latitude", contactData.latitude);
    if (contactData.longitude) formData.append("contact.location.longitude", contactData.longitude);

    phones.forEach((p, idx) => {
      formData.append(`contact.phones.${idx}.label.en`, p.label?.en || "");
      formData.append(`contact.phones.${idx}.label.np`, p.label?.np || "");
      formData.append(`contact.phones.${idx}.number`, p.number || "");
      formData.append(`contact.phones.${idx}.primary`, p.primary || false);
    });

    emails.forEach((em, idx) => {
      formData.append(`contact.emails.${idx}.label.en`, em.label?.en || "");
      formData.append(`contact.emails.${idx}.label.np`, em.label?.np || "");
      formData.append(`contact.emails.${idx}.email`, em.email || "");
      formData.append(`contact.emails.${idx}.primary`, em.primary || false);
    });
    
    formData.append("socialLinks.facebook", contactData.facebook);
    formData.append("socialLinks.twitter", contactData.twitter);
    formData.append("socialLinks.instagram", contactData.instagram);
    formData.append("socialLinks.youtube", contactData.youtube);
    formData.append("socialLinks.tiktok", contactData.tiktok);

    // Append office hours
    Object.keys(officeHours).forEach(day => {
      formData.append(`officeHours.${day}.enabled`, officeHours[day].enabled);
      formData.append(`officeHours.${day}.open`, officeHours[day].open);
      formData.append(`officeHours.${day}.close`, officeHours[day].close);
    });

    const result = await updateContactSettings(formData);

    try {
      if (result.success) {
        toast.success("Success", { description: result.message || "Settings updated successfully." });
        router.refresh();
      } else {
        toast.error("Error", { 
          description: result.errors?.length 
            ? `${result.message}\nDetails: ${result.errors.join(", ")}` 
            : result.message || "Failed to update settings." 
        });
      }
    } catch (err) {
      toast.error("Error", { description: err.message || "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  }

  const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  return (
    <div className="max-w-5xl mx-auto pb-24">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4 flex-1">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Contact Settings</h1>
            <p className="text-gray-500 text-sm mt-1">Manage office location, hours, and social media links.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/settings">Cancel</Link>
          </Button>
          <Button onClick={() => document.getElementById("contact-settings-form").requestSubmit()} disabled={loading} variant="crm-primary" size="crm-primary">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save All Changes
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 shrink-0 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-y-auto no-scrollbar pb-4 md:pb-0 pr-0 md:pr-4 hide-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? "bg-[#1546B0] text-white" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <tab.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Form Content */}
        <div className="flex-1 min-w-0">
          <form id="contact-settings-form" onSubmit={handleSubmit} className="w-full">
            
            {/* GENERAL CONTACT TAB */}
            <div className={activeTab === "general" ? "block space-y-6" : "hidden"}>
              
              <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center border-b border-gray-100 dark:border-slate-800 pb-4">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Location & Web
                </h2>
                
                <div className="space-y-6">
                  <LocalizedInput 
                    label="Office Address"
                    value={{ en: contactData.address_en, np: contactData.address_np }}
                    onChange={(val) => setContactData({ ...contactData, address_en: val.en, address_np: val.np })}
                    placeholder={{ en: "Pokhara, Gandaki Province", np: "पोखरा, गण्डकी प्रदेश" }}
                  />

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Website URL</label>
                    <input 
                      type="url" 
                      value={contactData.website}
                      onChange={(e) => setContactData({ ...contactData, website: e.target.value })}
                      placeholder="https://example.com"
                      className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Map Latitude</label>
                      <input 
                        type="number" step="any"
                        value={contactData.latitude}
                        onChange={(e) => setContactData({ ...contactData, latitude: e.target.value })}
                        placeholder="28.2096"
                        className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Map Longitude</label>
                      <input 
                        type="number" step="any"
                        value={contactData.longitude}
                        onChange={(e) => setContactData({ ...contactData, longitude: e.target.value })}
                        placeholder="83.9856"
                        className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4 mb-6">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-blue-600" />
                    Phone Numbers
                  </h2>
                  <Button type="button" variant="outline" size="sm" onClick={addPhone}>
                    <Plus className="w-4 h-4 mr-2" /> Add Phone
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {phones.map((phone, index) => (
                    <div key={index} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl relative">
                      <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 hover:bg-red-50 hover:text-red-600" onClick={() => removePhone(index)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <div className="space-y-4 pt-8">
                        <div className="grid md:grid-cols-1 gap-4">
                          <LocalizedInput
                            label="Phone Label"
                            value={{ en: phone.label?.en || "", np: phone.label?.np || "" }}
                            onChange={(val) => {
                              const newPhones = [...phones];
                              newPhones[index].label = { en: val.en, np: val.np };
                              setPhones(newPhones);
                            }}
                            placeholder={{ en: "Office", np: "कार्यालय" }}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <label className="block text-xs font-medium text-slate-500 mb-1">Number</label>
                            <input value={phone.number || ""} onChange={(e) => {
                              const newPhones = [...phones];
                              newPhones[index].number = e.target.value;
                              setPhones(newPhones);
                            }} placeholder="+977 XXXXXXXXX" className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded text-sm bg-white dark:bg-slate-900" />
                          </div>
                          <div className="flex items-center gap-2 mt-4">
                            <input type="checkbox" checked={phone.primary} onChange={(e) => {
                              const newPhones = phones.map((p, i) => ({ ...p, primary: i === index ? e.target.checked : false }));
                              setPhones(newPhones);
                            }} className="rounded" />
                            <label className="text-xs text-slate-600">Primary</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {phones.length === 0 && <p className="text-sm text-slate-500 italic">No phone numbers configured.</p>}
                </div>
              </section>

              <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4 mb-6">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-blue-600" />
                    Email Addresses
                  </h2>
                  <Button type="button" variant="outline" size="sm" onClick={addEmail}>
                    <Plus className="w-4 h-4 mr-2" /> Add Email
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {emails.map((emailObj, index) => (
                    <div key={index} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl relative">
                      <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 hover:bg-red-50 hover:text-red-600" onClick={() => removeEmail(index)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <div className="space-y-4 pt-8">
                        <div className="grid md:grid-cols-1 gap-4">
                          <LocalizedInput
                            label="Email Label"
                            value={{ en: emailObj.label?.en || "", np: emailObj.label?.np || "" }}
                            onChange={(val) => {
                              const newEmails = [...emails];
                              newEmails[index].label = { en: val.en, np: val.np };
                              setEmails(newEmails);
                            }}
                            placeholder={{ en: "Support", np: "समर्थन" }}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <label className="block text-xs font-medium text-slate-500 mb-1">Email</label>
                            <input type="email" value={emailObj.email || ""} onChange={(e) => {
                              const newEmails = [...emails];
                              newEmails[index].email = e.target.value;
                              setEmails(newEmails);
                            }} placeholder="info@example.com" className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded text-sm bg-white dark:bg-slate-900" />
                          </div>
                          <div className="flex items-center gap-2 mt-4">
                            <input type="checkbox" checked={emailObj.primary} onChange={(e) => {
                              const newEmails = emails.map((em, i) => ({ ...em, primary: i === index ? e.target.checked : false }));
                              setEmails(newEmails);
                            }} className="rounded" />
                            <label className="text-xs text-slate-600">Primary</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {emails.length === 0 && <p className="text-sm text-slate-500 italic">No emails configured.</p>}
                </div>
              </section>

            </div>

            {/* OFFICE HOURS TAB */}
            <div className={activeTab === "hours" ? "block bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6" : "hidden"}>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center border-b border-gray-100 dark:border-slate-800 pb-4">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Office Hours
              </h2>
              
              <div className="space-y-4">
                {daysOfWeek.map((day) => (
                  <div key={day} className="flex items-center gap-4 p-4 border border-slate-100 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <div className="w-32 flex items-center gap-3">
                      <input 
                        type="checkbox"
                        checked={officeHours[day]?.enabled}
                        onChange={(e) => handleOfficeHourChange(day, "enabled", e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300 capitalize">{day}</span>
                    </div>
                    
                    {officeHours[day]?.enabled ? (
                      <div className="flex flex-1 items-center gap-4">
                        <div className="flex-1">
                          <input 
                            type="time" 
                            value={officeHours[day]?.open}
                            onChange={(e) => handleOfficeHourChange(day, "open", e.target.value)}
                            className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded text-sm bg-white dark:bg-slate-900"
                          />
                        </div>
                        <span className="text-slate-500 text-sm">to</span>
                        <div className="flex-1">
                          <input 
                            type="time" 
                            value={officeHours[day]?.close}
                            onChange={(e) => handleOfficeHourChange(day, "close", e.target.value)}
                            className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded text-sm bg-white dark:bg-slate-900"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 text-sm text-slate-400 italic">
                        Closed
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* SOCIAL MEDIA TAB */}
            <div className={activeTab === "social" ? "block bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6" : "hidden"}>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center border-b border-gray-100 dark:border-slate-800 pb-4">
                <Share2 className="w-5 h-5 mr-2 text-blue-600" />
                Social Media Links
              </h2>
              
              <div className="space-y-6">
                {[
                  { id: "facebook", label: "Facebook URL", placeholder: "https://facebook.com/..." },
                  { id: "twitter", label: "X (Twitter) URL", placeholder: "https://twitter.com/..." },
                  { id: "instagram", label: "Instagram URL", placeholder: "https://instagram.com/..." },
                  { id: "youtube", label: "YouTube URL", placeholder: "https://youtube.com/..." },
                  { id: "tiktok", label: "TikTok URL", placeholder: "https://tiktok.com/..." },
                ].map((platform) => (
                  <div key={platform.id}>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{platform.label}</label>
                    <input 
                      type="url" 
                      value={contactData[platform.id]}
                      onChange={(e) => setContactData({ ...contactData, [platform.id]: e.target.value })}
                      placeholder={platform.placeholder}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                ))}
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
