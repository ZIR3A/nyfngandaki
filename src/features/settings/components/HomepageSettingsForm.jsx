"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Save, Loader2, Link as LinkIcon, Image as ImageIcon, MapPin, TrendingUp, Info, User, Zap } from "lucide-react";
import { updateHomepageSettings } from "../actions/setting.actions";
import { MediaPicker } from "@/features/storage/components/MediaPicker";

export function HomepageSettingsForm({ initialData = {} }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("hero");
  
  // Initialize stats state
  const [stats, setStats] = useState(initialData?.stats || [{ label: { en: "", np: "" }, value: "" }]);

  const handleAddStat = () => {
    setStats([...stats, { label: { en: "", np: "" }, value: "" }]);
  };

  const handleRemoveStat = (index) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  const tabs = [
    { id: "hero", label: "Hero Banner", icon: ImageIcon },
    { id: "chairperson", label: "Chairperson", icon: User },
    { id: "overview", label: "Overview & Mission", icon: Info },
    { id: "map", label: "Map & CTA", icon: MapPin },
    { id: "stats", label: "Statistics", icon: TrendingUp },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.target);
    
    // Append stats data appropriately
    formData.append("statsCount", stats.length.toString());
    
    const result = await updateHomepageSettings(formData);

    if (result.success) {
      setSuccess(result.message);
      router.refresh();
      // Scroll to top to see success message
      window.scrollTo(0, 0);
    } else {
      setError(result.message);
    }
    setLoading(false);
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Homepage Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage the core content displayed on the public homepage.</p>
        </div>
        <Button onClick={() => document.getElementById("homepage-settings-form").requestSubmit()} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Save All Changes
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-medium text-sm border border-red-100 flex items-center">
           {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 font-medium text-sm border border-green-100 flex items-center">
           {success}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 shrink-0">
          <nav className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-3 text-sm font-bold rounded-lg transition-colors whitespace-nowrap ${
                    isActive 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <tab.icon className={`w-4 h-4 mr-3 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Form Content */}
        <div className="flex-1 min-w-0">
          <form id="homepage-settings-form" onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            
            {/* HERO BANNER TAB */}
            <div className={activeTab === "hero" ? "block p-6" : "hidden"}>
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center border-b border-gray-100 pb-4">
                <ImageIcon className="w-5 h-5 mr-2 text-blue-600" />
                Hero Banner Settings
              </h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* English */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-sm text-blue-600 uppercase tracking-wider">English Content</h4>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Hero Title (EN)</label>
                      <input type="text" name="heroTitle.en" defaultValue={initialData?.heroTitle?.en || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="e.g. Empowering Youth" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Hero Subtitle (EN)</label>
                      <textarea name="heroSubtitle.en" defaultValue={initialData?.heroSubtitle?.en || ""} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="Short impactful message..."></textarea>
                    </div>
                  </div>
                  
                  {/* Nepali */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-sm text-red-600 uppercase tracking-wider">Nepali Content</h4>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Hero Title (NP)</label>
                      <input type="text" name="heroTitle.np" defaultValue={initialData?.heroTitle?.np || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500" placeholder="उदा. युवा सशक्तिकरण" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Hero Subtitle (NP)</label>
                      <textarea name="heroSubtitle.np" defaultValue={initialData?.heroSubtitle?.np || ""} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500" placeholder="छोटो सन्देश..."></textarea>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Background Banner Image</label>
                  <MediaPicker 
                    name="heroImageId" 
                    module="homepage" 
                    initialData={
                      initialData?.heroImageId && initialData?.banner
                        ? { 
                            _id: initialData.heroImageId, 
                            publicUrl: initialData.banner, 
                            mimeType: "image/jpeg" 
                          } 
                        : null
                    }
                  />
                </div>
              </div>
            </div>

            {/* CHAIRPERSON TAB */}
            <div className={activeTab === "chairperson" ? "block p-6" : "hidden"}>
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center border-b border-gray-100 pb-4">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Chairperson Details
              </h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* English */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-sm text-blue-600 uppercase tracking-wider">English Content</h4>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Chairperson Name (EN)</label>
                      <input type="text" name="chairpersonName.en" defaultValue={initialData?.chairpersonName?.en || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Message (EN)</label>
                      <textarea name="chairpersonMessage.en" defaultValue={initialData?.chairpersonMessage?.en || ""} rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"></textarea>
                    </div>
                  </div>
                  
                  {/* Nepali */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-sm text-red-600 uppercase tracking-wider">Nepali Content</h4>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Chairperson Name (NP)</label>
                      <input type="text" name="chairpersonName.np" defaultValue={initialData?.chairpersonName?.np || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Message (NP)</label>
                      <textarea name="chairpersonMessage.np" defaultValue={initialData?.chairpersonMessage?.np || ""} rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500"></textarea>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Chairperson Photo</label>
                  <MediaPicker 
                    name="chairpersonImageId" 
                    module="homepage" 
                    initialData={
                      initialData?.chairpersonImageId && initialData?.chairpersonImage 
                        ? { 
                            _id: initialData.chairpersonImageId, 
                            publicUrl: initialData.chairpersonImage, 
                            mimeType: "image/jpeg" 
                          } 
                        : null
                    }
                  />
                </div>
              </div>
            </div>

            {/* OVERVIEW & MISSION TAB */}
            <div className={activeTab === "overview" ? "block p-6" : "hidden"}>
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center border-b border-gray-100 pb-4">
                <Info className="w-5 h-5 mr-2 text-blue-600" />
                Overview, Mission & Vision
              </h2>
              
              <div className="space-y-8">
                
                {/* Mission */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Mission (EN)</label>
                    <textarea name="mission.en" defaultValue={initialData?.mission?.en || ""} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Mission (NP)</label>
                    <textarea name="mission.np" defaultValue={initialData?.mission?.np || ""} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500"></textarea>
                  </div>
                </div>

                {/* Vision */}
                <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Vision (EN)</label>
                    <textarea name="vision.en" defaultValue={initialData?.vision?.en || ""} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Vision (NP)</label>
                    <textarea name="vision.np" defaultValue={initialData?.vision?.np || ""} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500"></textarea>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <label className="block text-sm font-bold text-gray-700 mb-2">About Section Image</label>
                  <MediaPicker 
                    name="aboutImageId" 
                    module="homepage" 
                    initialData={
                      initialData?.aboutImageId && initialData?.aboutImage 
                        ? { 
                            _id: initialData.aboutImageId, 
                            publicUrl: initialData.aboutImage, 
                            mimeType: "image/jpeg" 
                          } 
                        : null
                    }
                  />
                </div>
                
              </div>
            </div>

            {/* MAP & CTA TAB */}
            <div className={activeTab === "map" ? "block p-6" : "hidden"}>
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center border-b border-gray-100 pb-4">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Map Integration & CTA
              </h2>
              
              <div className="space-y-8">
                
                {/* Map */}
                <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                  <h4 className="font-bold text-gray-900 mb-2">Google Map Embed</h4>
                  <p className="text-sm text-gray-500 mb-4">Paste the iframe src URL from Google Maps to display an interactive map on the homepage.</p>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Embed URL (src)</label>
                    <input type="url" name="googleMapEmbedUrl" defaultValue={initialData?.googleMapEmbedUrl || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="https://www.google.com/maps/embed?pb=..." />
                  </div>
                </div>

                {/* CTA */}
                <div className="grid md:grid-cols-2 gap-6 pt-4">
                  {/* English */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-sm text-blue-600 uppercase tracking-wider">CTA Content (EN)</h4>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Title (EN)</label>
                      <input type="text" name="ctaTitle.en" defaultValue={initialData?.ctaTitle?.en || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Description (EN)</label>
                      <textarea name="ctaDescription.en" defaultValue={initialData?.ctaDescription?.en || ""} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"></textarea>
                    </div>
                  </div>
                  
                  {/* Nepali */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-sm text-red-600 uppercase tracking-wider">CTA Content (NP)</h4>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Title (NP)</label>
                      <input type="text" name="ctaTitle.np" defaultValue={initialData?.ctaTitle?.np || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Description (NP)</label>
                      <textarea name="ctaDescription.np" defaultValue={initialData?.ctaDescription?.np || ""} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500"></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Button Link</label>
                  <input type="text" name="ctaButtonLink" defaultValue={initialData?.ctaButtonLink || "/contact"} className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                
              </div>
            </div>

            {/* STATISTICS TAB */}
            <div className={activeTab === "stats" ? "block p-6" : "hidden"}>
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center border-b border-gray-100 pb-4">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Key Statistics
              </h2>
              
              <div className="space-y-6">
                <p className="text-sm text-gray-500">Add up to 4 key statistics to display in the highlighted section (e.g. 11 Districts, 1000+ Members).</p>
                
                {stats.map((stat, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-4 relative group">
                    <button 
                      type="button"
                      onClick={() => handleRemoveStat(index)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-600 text-sm font-bold"
                    >
                      Remove
                    </button>
                    <h5 className="font-bold text-gray-700 mb-3 text-sm">Statistic {index + 1}</h5>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Value (e.g. "11")</label>
                        <input type="text" name={`stats[${index}].value`} defaultValue={stat.value || ""} className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Label (EN)</label>
                        <input type="text" name={`stats[${index}].label.en`} defaultValue={stat.label?.en || ""} className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Label (NP)</label>
                        <input type="text" name={`stats[${index}].label.np`} defaultValue={stat.label?.np || ""} className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500" />
                      </div>
                    </div>
                  </div>
                ))}

                {stats.length < 4 && (
                  <Button type="button" onClick={handleAddStat} variant="outline" className="w-full border-dashed border-2 py-6 text-gray-500 hover:bg-gray-50">
                    + Add Another Statistic
                  </Button>
                )}
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
