"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, Search, Link as LinkIcon, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getAmendmentsAction, createAmendmentAction, deleteAmendmentAction, getVersionsAction, getActiveConstitutionAction } from "@/actions/bidhan.actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { LocalizedInput } from "@/features/admin/about/components/shared/LocalizedInput";
import { LocalizedTextarea } from "@/features/admin/about/components/shared/LocalizedTextarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AmendmentsManagement() {
  const [amendments, setAmendments] = useState([]);
  const [versions, setVersions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [constitutionId, setConstitutionId] = useState(null);

  const [formData, setFormData] = useState({
    number: "",
    title: { en: "", np: "" },
    description: { en: "", np: "" },
    date: "",
    versionId: ""
  });

  const fetchData = async () => {
    setIsLoading(true);
    
    const constRes = await getActiveConstitutionAction();
    if (constRes.success && constRes.data) {
      setConstitutionId(constRes.data._id);
    }

    const [verRes, amRes] = await Promise.all([
      getVersionsAction(),
      getAmendmentsAction()
    ]);
    
    if (verRes.success) {
      setVersions(verRes.data || []);
      if (verRes.data && verRes.data.length > 0) {
        setFormData(prev => ({ ...prev, versionId: verRes.data[0]._id }));
      }
    }
    if (amRes.success) setAmendments(amRes.data || []);
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.versionId) {
      toast.error("Error", { description: "Please select a version." });
      return;
    }
    
    setIsSaving(true);
    const payload = { 
      ...formData, 
      constitutionId,
      title: {
        en: formData.title.en || formData.title.np,
        np: formData.title.np || formData.title.en,
      },
      description: {
        en: formData.description.en || formData.description.np,
        np: formData.description.np || formData.description.en,
      },
      date: new Date(formData.date), 
      status: "Published" 
    };
    const res = await createAmendmentAction(payload);
    setIsSaving(false);
    
    if (res.success) {
      toast.success("Success", { description: res.message });
      setIsDialogOpen(false);
      fetchData();
    } else {
      toast.error("Error", { description: res.errors?.length ? `${res.message}\nDetails: ${res.errors.join(", ")}` : res.message });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this amendment?")) return;
    
    const res = await deleteAmendmentAction(id);
    if (res.success) {
      toast.success("Success", { description: res.message });
      fetchData();
    } else {
      toast.error("Error", { description: res.errors?.length ? `${res.message}\nDetails: ${res.errors.join(", ")}` : res.message });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Amendments</h1>
          <p className="text-slate-500 mt-2">Track constitutional changes and link them to affected chapters/articles.</p>
        </div>
        <Button className="gap-2" onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4" />
          Log Amendment
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input className="pl-9 bg-white dark:bg-slate-900" placeholder="Search amendments..." />
          </div>
        </div>

        <div className="p-4 border-b border-slate-200 dark:border-slate-800 grid grid-cols-12 gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <div className="col-span-4">Title (English)</div>
          <div className="col-span-3">Title (Nepali)</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-1 text-center">Affected</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {isLoading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          </div>
        ) : amendments.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No amendments found.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {amendments.map((amendment) => (
              <div key={amendment._id} className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                <div className="col-span-4 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                  {amendment.number ? <span className="text-xs bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded mr-1">{amendment.number}</span> : null}
                  {amendment.title?.en}
                </div>
                <div className="col-span-3 text-sm text-slate-600 dark:text-slate-400">
                  {amendment.title?.np}
                </div>
                <div className="col-span-2 text-sm text-slate-500">
                  {new Date(amendment.date).toLocaleDateString()}
                </div>
                <div className="col-span-1 flex justify-center">
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                    <LinkIcon className="w-3 h-3" />
                    {amendment.affectedArticles?.length || 0}
                  </span>
                </div>
                <div className="col-span-1 flex justify-center">
                  <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                    {amendment.status}
                  </span>
                </div>
                <div className="col-span-1 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600 hover:bg-blue-50">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:bg-red-50" onClick={() => handleDelete(amendment._id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Log Amendment</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-6 my-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Amendment Number</label>
                <Input 
                  value={formData.number} 
                  onChange={(e) => setFormData({...formData, number: e.target.value})} 
                  placeholder="e.g. 1st"
                  required 
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Target Version</label>
                <Select value={formData.versionId} onValueChange={(v) => setFormData({...formData, versionId: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Version" />
                  </SelectTrigger>
                  <SelectContent>
                    {versions.map(v => (
                      <SelectItem key={v._id} value={v._id}>{v.versionNumber}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <LocalizedInput 
              label="Amendment Title" 
              value={formData.title} 
              onChange={(val) => setFormData({ ...formData, title: val })} 
              required 
            />
            
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Date Passed</label>
              <Input 
                type="date"
                value={formData.date} 
                onChange={(e) => setFormData({...formData, date: e.target.value})} 
                required 
              />
            </div>
            
            <LocalizedTextarea 
              label="Summary of Changes" 
              value={formData.description} 
              onChange={(val) => setFormData({ ...formData, description: val })} 
              rows={3} 
            />
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button" disabled={isSaving}>Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Amendment"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
