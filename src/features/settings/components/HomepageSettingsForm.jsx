"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Save, Loader2, Link as LinkIcon, Image as ImageIcon, MapPin, TrendingUp, Info, User, Zap } from "lucide-react";
import { updateHomepageSettings } from "../actions/setting.actions";
import { MediaPicker } from "@/features/storage/components/MediaPicker";
import { toast } from "sonner";

export function HomepageSettingsForm({ initialData = {} }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Initialize stats state
  const [stats, setStats] = useState(initialData?.stats || [{ label: { en: "", np: "" }, value: "" }]);

  const handleAddStat = () => {
    setStats([...stats, { label: { en: "", np: "" }, value: "" }]);
  };

  const handleRemoveStat = (index) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "stats", label: "Statistics", icon: TrendingUp },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    
    // Append stats data appropriately
    formData.append("statsCount", stats.length.toString());
    
    const result = await updateHomepageSettings(formData);

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
            
            {/* OVERVIEW & MISSION TAB */}
            <div className={activeTab === "overview" ? "block p-6" : "hidden"}>
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center border-b border-gray-100 pb-4">
                <Info className="w-5 h-5 mr-2 text-blue-600" />
                Overview
              </h2>
              
              <div className="space-y-8">
                


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
