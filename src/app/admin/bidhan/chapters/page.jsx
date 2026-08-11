"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, GripVertical, FileText, Loader2 } from "lucide-react";
import { getChaptersAction, createChapterAction, updateChapterAction, deleteChapterAction, getActiveConstitutionAction } from "@/actions/bidhan.actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LocalizedInput } from "@/features/admin/about/components/shared/LocalizedInput";
import { LocalizedTextarea } from "@/features/admin/about/components/shared/LocalizedTextarea";

export default function ChaptersManagement() {
  const [chapters, setChapters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [constitutionId, setConstitutionId] = useState(null);
  
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    number: "",
    title: { en: "", np: "" },
    description: { en: "", np: "" }
  });

  const fetchChapters = async () => {
    setIsLoading(true);
    const constRes = await getActiveConstitutionAction();
    if (constRes.success && constRes.data) {
      setConstitutionId(constRes.data._id);
    }
    
    const res = await getChaptersAction();
    if (res.success) {
      setChapters(res.data || []);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchChapters();
  }, []);

  const handleOpenDialog = (chapter = null) => {
    if (chapter) {
      setEditingId(chapter._id);
      setFormData({
        number: chapter.number,
        title: chapter.title || { en: "", np: "" },
        description: chapter.description || { en: "", np: "" }
      });
    } else {
      setEditingId(null);
      setFormData({
        number: chapters.length + 1,
        title: { en: "", np: "" },
        description: { en: "", np: "" }
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!constitutionId) {
      toast.error("Error", { description: "Active constitution not found. Please create one first." });
      return;
    }
    
    setIsSaving(true);
    const payload = { ...formData, constitutionId };
    
    const res = editingId 
      ? await updateChapterAction(editingId, payload)
      : await createChapterAction(payload);
      
    setIsSaving(false);
    
    if (res.success) {
      toast.success("Success", { description: res.message });
      setIsDialogOpen(false);
      fetchChapters();
    } else {
      toast.error("Error", { description: res.errors?.length ? `${res.message}\nDetails: ${res.errors.join(", ")}` : res.message });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this chapter?")) return;
    
    const res = await deleteChapterAction(id);
    if (res.success) {
      toast.success("Chapter Deleted", { description: res.message });
      fetchChapters();
    } else {
      toast.error("Error", { description: res.errors?.length ? `${res.message}\nDetails: ${res.errors.join(", ")}` : res.message });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Chapters</h1>
          <p className="text-slate-500 mt-2">Manage the organizational structure of the constitution.</p>
        </div>
        <Button onClick={() => handleOpenDialog()} variant="crm-primary" size="crm-primary" className="gap-2">
          <Plus className="w-4 h-4" />
          Create Chapter
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 grid grid-cols-12 gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <div className="col-span-1 text-center">Order</div>
          <div className="col-span-1">No.</div>
          <div className="col-span-4">Title (English)</div>
          <div className="col-span-3">Title (Nepali)</div>
          <div className="col-span-1 text-center">Articles</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {isLoading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          </div>
        ) : chapters.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No chapters found. Create the first one.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {chapters.map((chapter) => (
              <div key={chapter._id} className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                <div className="col-span-1 flex justify-center">
                  <button className="text-slate-400 hover:text-slate-600 cursor-grab active:cursor-grabbing">
                    <GripVertical className="w-4 h-4" />
                  </button>
                </div>
                <div className="col-span-1 font-semibold text-slate-700 dark:text-slate-300">
                  {chapter.number}
                </div>
                <div className="col-span-4 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500 opacity-50" />
                  {chapter.title?.en}
                </div>
                <div className="col-span-3 text-slate-600 dark:text-slate-400 font-medium">
                  {chapter.title?.np}
                </div>
                <div className="col-span-1 text-center text-sm font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-full py-0.5">
                  -
                </div>
                <div className="col-span-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 cursor-pointer" onClick={() => handleOpenDialog(chapter)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer" onClick={() => handleDelete(chapter._id)}>
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
            <DialogTitle>{editingId ? "Edit Chapter" : "Create Chapter"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-6 my-4">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Chapter Number</label>
              <Input 
                type="number" 
                value={formData.number} 
                onChange={(e) => setFormData({...formData, number: e.target.value})} 
                required 
              />
            </div>
            <LocalizedInput 
              label="Chapter Title" 
              value={formData.title} 
              onChange={(val) => setFormData({ ...formData, title: val })} 
              required 
            />
            <LocalizedTextarea 
              label="Description (Optional)" 
              value={formData.description} 
              onChange={(val) => setFormData({ ...formData, description: val })} 
              rows={3} 
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" size="crm-primary" type="button" disabled={isSaving}>Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isSaving} variant="crm-primary" size="crm-primary">
                {isSaving ? "Saving..." : "Save Chapter"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}



