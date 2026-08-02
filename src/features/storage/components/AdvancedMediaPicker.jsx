"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  UploadCloud, X, Loader2, Image as ImageIcon,
  File as FileIcon, Library, Search, CheckCircle2,
  GripVertical, Star, Type
} from "lucide-react";

export function AdvancedMediaPicker({
  module = "general",
  accept = "image/*",
  initialData = [],
  onChange
}) {
  const [items, setItems] = useState(() => Array.isArray(initialData) ? initialData : []);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [showLibrary, setShowLibrary] = useState(false);
  const inputRef = useRef(null);

  const notifyChange = (newItems) => {
    setItems(newItems);
    if (onChange) onChange(newItems);
  };

  const isImage = (asset) => {
    if (asset?.mimeType?.startsWith("image/")) return true;
    if (asset?.url) return /\.(jpg|jpeg|png|gif|webp|svg|avif)(\?|$)/i.test(asset.url);
    if (asset?.publicUrl) return /\.(jpg|jpeg|png|gif|webp|svg|avif)(\?|$)/i.test(asset.publicUrl);
    return false;
  };

  const handleFiles = async (selectedFiles) => {
    if (!selectedFiles || selectedFiles.length === 0) return;
    const filesToUpload = Array.from(selectedFiles);

    setUploading(true);
    setError(null);
    setProgress(0);

    let completed = 0;
    const uploaded = [];

    for (const file of filesToUpload) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("module", module);
        formData.append("folder", module);

        const res = await fetch("/api/storage/upload", { method: "POST", body: formData });
        const json = await res.json();

        if (!res.ok || !json.success) {
          throw new Error(json.message || `Failed to upload ${file.name}`);
        }

        uploaded.push({
          _id: json.data._id,
          url: json.data.publicUrl,
          originalName: json.data.originalName || json.data.filename,
          mimeType: json.data.mimeType,
          isFeatured: false,
          caption: { en: "", np: "" }
        });
        
        completed++;
        setProgress((completed / filesToUpload.length) * 100);
      } catch (err) {
        setError(err.message);
        break;
      }
    }

    const newItems = [...items, ...uploaded];
    if (newItems.length > 0 && !newItems.some(i => i.isFeatured)) {
      newItems[0].isFeatured = true;
    }
    notifyChange(newItems);
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleChange = (e) => {
    if (e.target.files?.length > 0) handleFiles(e.target.files);
  };

  const handleDropUpload = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length > 0) handleFiles(e.dataTransfer.files);
  };

  const handleLibrarySelect = (asset) => {
    const exists = items.some(i => i._id === asset._id);
    let newItems = [...items];
    
    if (exists) {
      newItems = newItems.filter(i => i._id !== asset._id);
    } else {
      newItems.push({
        _id: asset._id,
        url: asset.publicUrl,
        originalName: asset.originalName || asset.filename,
        mimeType: asset.mimeType,
        isFeatured: false,
        caption: { en: "", np: "" }
      });
    }

    if (newItems.length > 0 && !newItems.some(i => i.isFeatured)) {
      newItems[0].isFeatured = true;
    }
    
    notifyChange(newItems);
  };

  const removeItem = (id) => {
    let newItems = items.filter(i => i._id !== id);
    if (newItems.length > 0 && !newItems.some(i => i.isFeatured)) {
      newItems[0].isFeatured = true;
    }
    notifyChange(newItems);
  };

  const setFeatured = (id) => {
    const newItems = items.map(i => ({
      ...i,
      isFeatured: i._id === id
    }));
    notifyChange(newItems);
  };

  const updateCaption = (id, lang, value) => {
    const newItems = items.map(i => {
      if (i._id === id) {
        return { ...i, caption: { ...i.caption, [lang]: value } };
      }
      return i;
    });
    notifyChange(newItems);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(items);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    notifyChange(reordered);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-4">
        <div
          onDrop={handleDropUpload}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => !uploading && inputRef.current?.click()}
          className={`flex-1 relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
            uploading
              ? "border-blue-300 bg-blue-50 dark:bg-blue-950/30 cursor-not-allowed"
              : "border-slate-300 dark:border-slate-600 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 bg-slate-50 dark:bg-slate-800/50"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple
            className="hidden"
            onChange={handleChange}
            disabled={uploading}
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-2 w-full">
              <Loader2 className="text-blue-500 animate-spin" size={28} />
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Uploading...</p>
              <div className="w-full max-w-[200px] bg-blue-200 dark:bg-blue-800 rounded-full h-1.5">
                <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400">
              <UploadCloud size={32} className="text-slate-400" />
              <div>
                <p className="text-sm font-semibold">Upload images</p>
                <p className="text-xs text-slate-400">Drag & drop or click to browse</p>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowLibrary(true)}
          className="flex-1 flex flex-col items-center justify-center gap-2 border-2 border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-slate-600 dark:text-slate-300"
        >
          <Library size={32} className="text-slate-400" />
          <div className="text-center">
            <p className="text-sm font-semibold">Media Library</p>
            <p className="text-xs text-slate-400">Select from existing files</p>
          </div>
        </button>
      </div>

      {error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {items.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Selected Media ({items.length})</h4>
            <span className="text-xs text-slate-500">Drag to reorder. Set one as Featured.</span>
          </div>
          
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="media-list">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  {items.map((item, index) => (
                    <Draggable key={item._id} draggableId={item._id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-white dark:bg-slate-900 transition-colors ${
                            snapshot.isDragging ? "shadow-lg ring-1 ring-blue-500 z-10" : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                          }`}
                        >
                          <div {...provided.dragHandleProps} className="text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing self-center p-2">
                            <GripVertical size={20} />
                          </div>
                          
                          <div className="relative w-20 h-20 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0">
                            {isImage(item) && item.url ? (
                              <Image src={item.url} alt={item.originalName} fill className="object-cover" />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                                <FileIcon size={24} />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 space-y-2 w-full">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate max-w-[200px]" title={item.originalName}>
                                {item.originalName}
                              </p>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => setFeatured(item._id)}
                                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full transition-colors ${
                                    item.isFeatured 
                                      ? "bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800" 
                                      : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 dark:hover:bg-slate-700"
                                  }`}
                                >
                                  <Star size={12} className={item.isFeatured ? "fill-current" : ""} />
                                  {item.isFeatured ? "Featured" : "Set Featured"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeItem(item._id)}
                                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                  title="Remove"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="relative">
                                <Type size={12} className="absolute left-2.5 top-2.5 text-slate-400" />
                                <input 
                                  placeholder="Caption (English)" 
                                  value={item.caption?.en || ""}
                                  onChange={(e) => updateCaption(item._id, "en", e.target.value)}
                                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-transparent border border-slate-200 dark:border-slate-700 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-slate-700 dark:text-slate-300"
                                />
                              </div>
                              <div className="relative">
                                <Type size={12} className="absolute left-2.5 top-2.5 text-slate-400" />
                                <input 
                                  placeholder="Caption (Nepali)" 
                                  value={item.caption?.np || ""}
                                  onChange={(e) => updateCaption(item._id, "np", e.target.value)}
                                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-transparent border border-slate-200 dark:border-slate-700 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-slate-700 dark:text-slate-300 font-nepali"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}

      {showLibrary && (
        <MediaLibraryModal
          module={module}
          multiple={true}
          selectedIds={items.map((a) => a._id)}
          onSelect={handleLibrarySelect}
          onClose={() => setShowLibrary(false)}
        />
      )}
    </div>
  );
}

// Embedded Media Library Modal
function MediaLibraryModal({ module, multiple, selectedIds, onSelect, onClose }) {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  const fetchAssets = useCallback(async (p = 1, q = search) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: p, limit: 24 });
      if (module && module !== "all") params.set("module", module);
      if (q) params.set("search", q);
      const res = await fetch(`/api/storage?${params.toString()}`);
      const json = await res.json();
      if (json.success) {
        setAssets(json.data.assets);
        setPagination(json.data.pagination);
        setPage(p);
      }
    } catch (e) {
      console.error("Library modal fetch error:", e);
    } finally {
      setLoading(false);
    }
  }, [module, search]);

  React.useEffect(() => { fetchAssets(); }, [fetchAssets]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAssets(1, search);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-4xl max-h-[85vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Library size={20} className="text-blue-500" />
            Media Library
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <form onSubmit={handleSearch} className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search files..."
              className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </form>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="animate-spin text-blue-500" size={28} />
            </div>
          ) : assets.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <ImageIcon size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">No assets found</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {assets.map((asset) => {
                const isSelected = selectedIds.includes(asset._id);
                const isImg = asset.mimeType?.startsWith("image/");
                return (
                  <button
                    key={asset._id}
                    type="button"
                    onClick={() => onSelect(asset)}
                    className={`relative group aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      isSelected
                        ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                        : "border-gray-200 dark:border-gray-700 hover:border-blue-400"
                    }`}
                  >
                    {isImg && asset.publicUrl ? (
                      <Image src={asset.publicUrl} alt={asset.originalName} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                        <FileIcon size={24} className="text-gray-400" />
                      </div>
                    )}
                    {isSelected && (
                      <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                        <CheckCircle2 size={24} className="text-blue-600 dark:text-blue-300 drop-shadow" />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-1.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-[9px] truncate">{asset.originalName}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
          {pagination.pages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => fetchAssets(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold ${
                    p === page ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
