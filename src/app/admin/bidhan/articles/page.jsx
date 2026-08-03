"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit2, Trash2, Search, Filter, BookOpen, Loader2 } from "lucide-react";
import RichTextEditor from "@/features/bidhan/components/admin/RichTextEditor";
import { LocalizedInput } from "@/features/admin/about/components/shared/LocalizedInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getArticlesAction, getChaptersAction, getActiveConstitutionAction, createArticleAction, updateArticleAction, deleteArticleAction } from "@/actions/bidhan.actions";

export default function ArticlesManagement() {
  const [articles, setArticles] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [constitutionId, setConstitutionId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [chapterId, setChapterId] = useState("");
  const [number, setNumber] = useState("");
  const [title, setTitle] = useState({ en: "", np: "" });
  const [content, setContent] = useState({ en: "", np: "" });
  const [activeLang, setActiveLang] = useState("en");

  const fetchData = async () => {
    setIsLoading(true);
    const constRes = await getActiveConstitutionAction();
    if (constRes.success && constRes.data) {
      setConstitutionId(constRes.data._id);
    }
    
    const [chapRes, artRes] = await Promise.all([
      getChaptersAction(),
      getArticlesAction()
    ]);
    
    if (chapRes.success) setChapters(chapRes.data || []);
    if (artRes.success) setArticles(artRes.data || []);
    
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleOpenForm = (article = null) => {
    if (article) {
      setEditingId(article._id);
      setChapterId(article.chapterId?._id || article.chapterId);
      setNumber(article.number);
      setTitle(article.title || { en: "", np: "" });
      setContent(article.content || { en: "", np: "" });
    } else {
      setEditingId(null);
      setChapterId("");
      setNumber(articles.length + 1);
      setTitle({ en: "", np: "" });
      setContent({ en: "", np: "" });
    }
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!constitutionId || !chapterId) {
      toast.error("Error", { description: "Please select a chapter." });
      return;
    }
    
    setIsSaving(true);
    const payload = {
      constitutionId,
      chapterId,
      number,
      title,
      content,
      status: "Published"
    };
    
    const res = editingId 
      ? await updateArticleAction(editingId, payload)
      : await createArticleAction(payload);
      
    setIsSaving(false);
    if (res.success) {
      toast.success("Success", { description: res.message });
      setIsEditing(false);
      fetchData();
    } else {
      toast.error("Error", { description: res.errors?.length ? `${res.message}\nDetails: ${res.errors.join(", ")}` : res.message });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    
    const res = await deleteArticleAction(id);
    if (res.success) {
      toast.success("Success", { description: res.message });
      fetchData();
    } else {
      toast.error("Error", { description: res.errors?.length ? `${res.message}\nDetails: ${res.errors.join(", ")}` : res.message });
    }
  };

  if (isEditing) {
    return (
      <div className="space-y-6 max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Edit Article</h1>
            <p className="text-slate-500 mt-2">Modify the rich text content of the article.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isSaving}>Cancel</Button>
            <Button onClick={handleSave} disabled={isSaving}>{isSaving ? "Saving..." : "Save Article"}</Button>
          </div>
        </div>

        <div className="space-y-8 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Chapter</label>
              <Select value={chapterId} onValueChange={setChapterId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Chapter" />
                </SelectTrigger>
                <SelectContent>
                  {chapters.map(c => (
                    <SelectItem key={c._id} value={c._id}>{c.number}. {c.title?.en}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Article Number</label>
              <Input type="number" value={number} onChange={(e) => setNumber(e.target.value)} />
            </div>
          </div>
          
          <LocalizedInput 
            label="Article Title" 
            value={title} 
            onChange={setTitle} 
            required 
          />

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Article Content
              </label>
              <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
                <button
                  type="button"
                  onClick={() => setActiveLang('en')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                    activeLang === 'en' 
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLang('np')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                    activeLang === 'np' 
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  NP
                </button>
              </div>
            </div>
            
            <RichTextEditor 
              value={content[activeLang]} 
              onChange={(val) => setContent({...content, [activeLang]: val})} 
              placeholder={`Write the ${activeLang === 'en' ? 'English' : 'Nepali'} article content here...`}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Articles</h1>
          <p className="text-slate-500 mt-2">Manage the granular articles of the constitution.</p>
        </div>
        <div className="flex gap-3">
          <Button className="gap-2" onClick={() => handleOpenForm()}>
            <Plus className="w-4 h-4" />
            Create Article
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        
        {/* Filters */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input className="pl-9 bg-white dark:bg-slate-900" placeholder="Search articles..." />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] bg-white dark:bg-slate-900">
              <SelectValue placeholder="All Chapters" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Chapters</SelectItem>
              {chapters.map(c => (
                <SelectItem key={c._id} value={c._id}>{c.number}. {c.title?.en}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="bg-white dark:bg-slate-900">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Table Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 grid grid-cols-12 gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <div className="col-span-1">No.</div>
          <div className="col-span-3">Chapter</div>
          <div className="col-span-3">Title (English)</div>
          <div className="col-span-3">Title (Nepali)</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {isLoading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          </div>
        ) : articles.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No articles found. Create the first one.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {articles.map((article) => (
              <div key={article._id} className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                <div className="col-span-1 font-semibold text-slate-700 dark:text-slate-300">
                  {article.number}
                </div>
                <div className="col-span-3 text-sm text-slate-600 dark:text-slate-400">
                  {article.chapterId?.title?.en || "Unknown Chapter"}
                </div>
                <div className="col-span-3 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-500 opacity-50" />
                  {article.title?.en}
                </div>
                <div className="col-span-3 text-slate-600 dark:text-slate-400 font-medium">
                  {article.title?.np}
                </div>
                <div className="col-span-1 flex justify-center">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    article.status === 'Published' 
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}>
                    {article.status}
                  </span>
                </div>
                <div className="col-span-1 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600 hover:bg-blue-50" onClick={() => handleOpenForm(article)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:bg-red-50" onClick={() => handleDelete(article._id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
