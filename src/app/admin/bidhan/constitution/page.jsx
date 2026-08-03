"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LocalizedInput } from "@/features/admin/about/components/shared/LocalizedInput";
import { LocalizedTextarea } from "@/features/admin/about/components/shared/LocalizedTextarea";
import { Save, BookOpen, Loader2 } from "lucide-react";
import { getActiveConstitutionAction, saveConstitutionAction } from "@/actions/bidhan.actions";

export default function ConstitutionManagement() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: { en: "", np: "" },
    description: { en: "", np: "" },
    currentVersion: "",
    effectiveDate: "",
  });

  React.useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const res = await getActiveConstitutionAction();
      if (res.success && res.data) {
        setFormData({
          id: res.data._id,
          title: res.data.title || { en: "", np: "" },
          description: res.data.description || { en: "", np: "" },
          currentVersion: res.data.currentVersion || res.data.version || "",
          effectiveDate: res.data.effectiveDate ? new Date(res.data.effectiveDate).toISOString().split('T')[0] : "",
        });
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    const res = await saveConstitutionAction(formData);
    
    setIsSaving(false);
    if (res.success) {
      toast.success("Success", {
        description: res.message,
      });
      if (res.data?._id) {
        setFormData(prev => ({ ...prev, id: res.data._id }));
      }
    } else {
      toast.error("Error", {
        description: res.errors?.length ? `${res.message}\nDetails: ${res.errors.join(", ")}` : res.message,
      });
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Constitution Details</h1>
          <p className="text-slate-500 mt-2">Manage the core metadata of the active Digital Constitution.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
          <Save className="w-4 h-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">Global Metadata</h2>
            <p className="text-xs text-slate-500">Multilingual fields for the primary constitution file.</p>
          </div>
        </div>

        {isLoading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          </div>
        ) : (

        <form onSubmit={handleSave} className="p-6 space-y-8 max-w-2xl">
          <LocalizedInput 
            label="Title" 
            value={formData.title} 
            onChange={(val) => setFormData({ ...formData, title: val })} 
            required 
          />

          <LocalizedTextarea 
            label="Description" 
            value={formData.description} 
            onChange={(val) => setFormData({ ...formData, description: val })} 
            rows={4} 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Current Version</label>
              <Input name="currentVersion" value={formData.currentVersion} onChange={handleChange} required />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Effective Date</label>
              <Input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} required />
            </div>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}
