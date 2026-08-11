"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, TrendingUp, Info } from "lucide-react";
import { updateHomepageSettings } from "../actions/setting.actions";
import { MediaPicker } from "@/features/storage/components/MediaPicker";
import { toast } from "sonner";
import { LocalizedInput } from "@/features/admin/about/components/shared/LocalizedInput";

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
    stats.forEach((stat, idx) => {
      formData.append(`stats[${idx}].label.en`, stat.label?.en || "");
      formData.append(`stats[${idx}].label.np`, stat.label?.np || "");
    });
    
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
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4 flex-1">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Homepage Settings</h1>
            <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">Manage the core content displayed on the public homepage.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/settings">Cancel</Link>
          </Button>
          <Button onClick={() => document.getElementById("homepage-settings-form").requestSubmit()} disabled={loading} variant="crm-primary" size="crm-primary">
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
          <form id="homepage-settings-form" onSubmit={handleSubmit} className="w-full">
            
            {/* OVERVIEW & MISSION TAB */}
            <div className={activeTab === "overview" ? "block p-6" : "hidden"}>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center border-b border-gray-100 dark:border-slate-800 pb-4">
                <Info className="w-5 h-5 mr-2 text-blue-600" />
                Overview
              </h2>
              
              <div className="space-y-8">
                


                <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
                  <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">About Section Image</label>
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
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center border-b border-gray-100 dark:border-slate-800 pb-4">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Key Statistics
              </h2>
              
              <div className="space-y-6">
                <p className="text-sm text-gray-500 dark:text-slate-400">Add up to 4 key statistics to display in the highlighted section (e.g. 11 Districts, 1000+ Members).</p>
                
                {stats.map((stat, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl p-4 relative group">
                    <button 
                      type="button"
                      onClick={() => handleRemoveStat(index)}
                      className="absolute top-4 right-4 text-gray-400 dark:text-slate-500 hover:text-red-600 text-sm font-bold"
                    >
                      Remove
                    </button>
                    <h5 className="font-bold text-gray-700 dark:text-slate-300 mb-3 text-sm">Statistic {index + 1}</h5>
                    
                    <div className="grid md:grid-cols-2 gap-4 items-start">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between min-h-[28px]">
                          <label className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            Value (e.g. "11")
                          </label>
                        </div>
                        <input 
                          type="text" 
                          name={`stats[${index}].value`} 
                          value={stat.value || ""} 
                          onChange={(e) => {
                            const newStats = [...stats];
                            newStats[index].value = e.target.value;
                            setStats(newStats);
                          }}
                          className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/20 transition-all font-medium text-gray-900 dark:text-white placeholder:text-gray-400" 
                        />
                      </div>
                      <div className="md:col-span-1">
                        <LocalizedInput
                          label="Statistic Label"
                          value={{
                            en: stat.label?.en || "",
                            np: stat.label?.np || ""
                          }}
                          onChange={(val) => {
                            const newStats = [...stats];
                            newStats[index].label = val;
                            setStats(newStats);
                          }}
                          required={false}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {stats.length < 4 && (
                  <Button type="button" onClick={handleAddStat} variant="outline" className="w-full border-dashed border-2 py-6 text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800">
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
