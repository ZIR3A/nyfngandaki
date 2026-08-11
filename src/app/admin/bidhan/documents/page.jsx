"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud, Search, Trash2, ExternalLink, Filter, Loader2, Download } from "lucide-react";
import { MediaPicker } from "@/features/storage/components/MediaPicker";
import { getDocumentsAction, createDocumentAction, deleteDocumentAction } from "@/actions/bidhan.actions";

export default function DocumentManagement() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {
    setIsLoading(true);
    const res = await getDocumentsAction();
    if (res.success) {
      setDocuments(res.data || []);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchDocuments();
  }, []);

  const handleUpload = async (asset) => {
    setIsUploading(true);
    const payload = {
      title: { en: asset.originalName || asset.filename || "Uploaded Document", np: asset.originalName || asset.filename || "अपलोड गरिएको कागजात" },
      driveUrl: asset.publicUrl || asset.url,
      driveFileId: asset.providerFileId || asset.driveId || asset._id,
      fileType: asset.mimeType?.includes('pdf') ? "PDF" : "DOC",
      fileSize: asset.size ? `${(asset.size / 1024 / 1024).toFixed(2)} MB` : "Unknown",
    };
    
    const res = await createDocumentAction(payload);
    setIsUploading(false);
    
    if (res.success) {
      setIsUploadOpen(false);
      toast.success("Upload Successful", { description: res.message });
      fetchDocuments();
    } else {
      toast.error("Error", { description: res.errors?.length ? `${res.message}\nDetails: ${res.errors.join(", ")}` : res.message });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this document?")) return;
    
    const res = await deleteDocumentAction(id);
    if (res.success) {
      toast.success("Document Deleted", { description: res.message });
      fetchDocuments();
    } else {
      toast.error("Error", { description: res.errors?.length ? `${res.message}\nDetails: ${res.errors.join(", ")}` : res.message });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Official Documents</h1>
          <p className="text-slate-500 mt-2">Manage downloadable constitution files and directives.</p>
        </div>
        <Button variant="crm-primary" size="crm-primary" className="gap-2" onClick={() => setIsUploadOpen(true)}>
          <UploadCloud className="w-4 h-4" />
          Upload Document
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        
        {/* Filters */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input className="pl-9 bg-white dark:bg-slate-900" placeholder="Search documents..." />
          </div>
          <Button variant="outline" size="crm-primary" className="bg-white dark:bg-slate-900">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Table Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 grid grid-cols-12 gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <div className="col-span-5">Document Name</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-1">Size</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {isLoading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          </div>
        ) : documents.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No documents found.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {documents.map((doc) => (
              <div key={doc._id} className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                <div className="col-span-5 font-medium text-slate-900 dark:text-white flex items-center gap-3">
                  <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold ${
                    doc.fileType === 'PDF' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30'
                  }`}>
                    {doc.fileType || "DOC"}
                  </div>
                  {doc.title?.en}
                </div>
                <div className="col-span-2 text-sm text-slate-600 dark:text-slate-400">
                  {doc.categoryId?.name?.en || "General"}
                </div>
                <div className="col-span-1 text-sm text-slate-500">
                  {doc.fileSize || "-"}
                </div>
                <div className="col-span-2 text-sm text-slate-500">
                  {new Date(doc.createdAt).toLocaleDateString()}
                </div>
                <div className="col-span-1 flex justify-center">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    doc.status === 'Published' 
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}>
                    {doc.status}
                  </span>
                </div>
                <div className="col-span-1 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {doc.driveUrl && (
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 cursor-pointer" asChild>
                      <a href={doc.driveUrl} target="_blank" rel="noreferrer">
                        <Download className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer" onClick={() => handleDelete(doc._id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto overflow-x-hidden p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Upload Document</h2>
                <p className="text-sm text-slate-500">Add a new document to the official library.</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsUploadOpen(false)}>
                ✕
              </Button>
            </div>
            
            <MediaPicker 
              name="documentFile" 
              module="documents" 
              accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
              onUpload={handleUpload}
            />
          </div>
        </div>
      )}
    </div>
  );
}

