"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus, CheckCircle2, Archive, GitCommit, FileText, Loader2, Trash2 } from "lucide-react";
import { getVersionsAction, createVersionAction, deleteVersionAction, getActiveConstitutionAction, makeVersionCurrentAction } from "@/actions/bidhan.actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LocalizedInput } from "@/features/admin/about/components/shared/LocalizedInput";
import { LocalizedTextarea } from "@/features/admin/about/components/shared/LocalizedTextarea";

export default function VersionsManagement() {
  const [versions, setVersions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [constitutionId, setConstitutionId] = useState(null);

  const [formData, setFormData] = useState({
    versionNumber: "",
    title: { en: "", np: "" },
    description: { en: "", np: "" },
    releaseDate: ""
  });

  const fetchVersions = async () => {
    setIsLoading(true);
    const constRes = await getActiveConstitutionAction();
    if (constRes.success && constRes.data) {
      setConstitutionId(constRes.data._id);
    }
    
    const res = await getVersionsAction();
    if (res.success) {
      setVersions(res.data || []);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchVersions();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    const payload = { ...formData, releaseDate: new Date(formData.releaseDate), constitutionId };
    const res = await createVersionAction(payload);
    
    setIsSaving(false);
    if (res.success) {
      toast.success("Success", { description: res.message });
      setIsDialogOpen(false);
      fetchVersions();
    } else {
      toast.error("Error", { description: res.errors?.length ? `${res.message}\nDetails: ${res.errors.join(", ")}` : res.message });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this version?")) return;
    const res = await deleteVersionAction(id);
    if (res.success) {
      toast.success("Success", { description: res.message });
      fetchVersions();
    } else {
      toast.error("Error", { description: res.errors?.length ? `${res.message}\nDetails: ${res.errors.join(", ")}` : res.message });
    }
  };

  const handleMakeCurrent = async (id) => {
    if (!confirm("Are you sure you want to make this version the active one?")) return;
    const res = await makeVersionCurrentAction(id, constitutionId);
    if (res.success) {
      toast.success("Version Updated", { description: res.message });
      fetchVersions();
    } else {
      toast.error("Error", { description: res.errors?.length ? `${res.message}\nDetails: ${res.errors.join(", ")}` : res.message });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Version History</h1>
          <p className="text-slate-500 mt-2">Manage major versions and historical records of the constitution.</p>
        </div>
        <Button className="gap-2" onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4" />
          Create New Version
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 relative">
        <div className="absolute left-[39px] top-6 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-800"></div>

        <div className="space-y-8 relative z-10">
          {isLoading ? (
            <div className="p-12 flex justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
            </div>
          ) : versions.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              No versions found.
            </div>
          ) : (
            versions.map((version, index) => (
              <div key={version._id} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full border-4 border-white dark:border-slate-950 flex items-center justify-center shadow-sm ${
                    version.isCurrent ? "bg-blue-600 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                  }`}>
                    <GitCommit className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Version {version.versionNumber}</h3>
                      {version.isCurrent ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Active
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                          {version.status}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-slate-500">{new Date(version.releaseDate).toLocaleDateString()}</p>
                  </div>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{version.title?.en}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700/50">
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-slate-400" />
                        Articles (Stats not loaded)
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      {!version.isCurrent && (
                        <Button variant="outline" size="sm" onClick={() => handleMakeCurrent(version._id)}>
                          Make Current
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="text-slate-500" onClick={() => handleDelete(version._id)}>
                        <Trash2 className="w-4 h-4 mr-2 text-red-500" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Version</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-6 my-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Version Number</label>
                <Input 
                  value={formData.versionNumber} 
                  onChange={(e) => setFormData({...formData, versionNumber: e.target.value})} 
                  placeholder="e.g. v3.0"
                  required 
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Release Date</label>
                <Input 
                  type="date"
                  value={formData.releaseDate} 
                  onChange={(e) => setFormData({...formData, releaseDate: e.target.value})} 
                  required 
                />
              </div>
            </div>
            <LocalizedInput 
              label="Version Title" 
              value={formData.title} 
              onChange={(val) => setFormData({ ...formData, title: val })} 
              required 
            />
            <LocalizedTextarea 
              label="Change Summary" 
              value={formData.description} 
              onChange={(val) => setFormData({ ...formData, description: val })} 
              rows={3} 
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button" disabled={isSaving}>Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Version"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
