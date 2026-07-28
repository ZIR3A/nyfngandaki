"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search, Grid3x3, List, Trash2, Loader2,
  Image as ImageIcon, File as FileIcon, Filter, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const MODULE_FILTERS = [
  { value: "all", label: "All Files" },
  { value: "members", label: "Members" },
  { value: "events", label: "Events" },
  { value: "activities", label: "Activities" },
  { value: "resources", label: "Resources" },
  { value: "homepage", label: "Homepage" },
  { value: "districts", label: "Districts" },
  { value: "temp", label: "Temp" },
];

const TYPE_FILTERS = [
  { value: "", label: "All Types" },
  { value: "images", label: "Images" },
  { value: "documents", label: "Documents" },
];

function formatBytes(bytes) {
  if (!bytes) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { dateStyle: "medium" });
}

function AssetThumb({ asset }) {
  const isImg = asset.mimeType?.startsWith("image/");
  if (isImg && asset.publicUrl) {
    return (
      <Image src={asset.publicUrl} alt={asset.originalName} fill className="object-cover" />
    );
  }
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <FileIcon size={28} className="text-gray-400" />
    </div>
  );
}

export function MediaLibraryPageClient({ initialData }) {
  const router = useRouter();
  const [assets, setAssets] = useState(initialData?.assets || []);
  const [pagination, setPagination] = useState(initialData?.pagination || {});
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [module, setModule] = useState("all");
  const [mimeType, setMimeType] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [selected, setSelected] = useState(null);

  const fetchAssets = useCallback(async ({ page = 1, mod = module, q = search, type = mimeType } = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 24 });
      if (mod && mod !== "all") params.set("module", mod);
      if (q) params.set("search", q);
      if (type) params.set("mimeCategory", type);
      const res = await fetch(`/api/storage?${params.toString()}`);
      const json = await res.json();
      if (json.success) {
        setAssets(json.data.assets);
        setPagination(json.data.pagination);
      }
    } catch (e) {
      console.error("Media Library fetch error:", e);
    } finally {
      setLoading(false);
    }
  }, [module, search, mimeType]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAssets({ q: search });
  };

  const handleModuleChange = (v) => {
    setModule(v);
    fetchAssets({ mod: v });
  };

  const handleTypeChange = (v) => {
    setMimeType(v);
    fetchAssets({ type: v });
  };

  const handleDelete = async (asset) => {
    if (!confirm(`Delete "${asset.originalName}"? This cannot be undone.`)) return;
    setDeleting(asset._id);
    try {
      const res = await fetch(`/api/storage/${asset._id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setAssets((prev) => prev.filter((a) => a._id !== asset._id));
        if (selected?._id === asset._id) setSelected(null);
      }
    } finally {
      setDeleting(null);
    }
  };

  const totalAssets = pagination.total || 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search files…"
              className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </form>
          {/* Module filter */}
          <select
            value={module}
            onChange={(e) => handleModuleChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 dark:text-white"
          >
            {MODULE_FILTERS.map((f) => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
          {/* Type filter */}
          <select
            value={mimeType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 dark:text-white"
          >
            {TYPE_FILTERS.map((f) => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
          {/* View toggle */}
          <div className="flex border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setView("grid")}
              className={`px-3 py-2 ${view === "grid" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "bg-white dark:bg-gray-800 text-gray-500"}`}
            >
              <Grid3x3 size={16} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-3 py-2 ${view === "list" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "bg-white dark:bg-gray-800 text-gray-500"}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
          {totalAssets.toLocaleString()} asset{totalAssets !== 1 ? "s" : ""} total
        </p>
      </div>

      {/* Grid / List */}
      <div className={`relative ${selected ? "lg:grid lg:grid-cols-[1fr_320px] gap-6 items-start" : ""}`}>
        <div>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-blue-500" size={32} />
            </div>
          ) : assets.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center py-20 text-gray-400">
              <ImageIcon size={48} className="mb-4 opacity-30" />
              <p className="font-medium">No assets found</p>
              <p className="text-sm mt-1">Upload files from any form in the CRM.</p>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3">
              {assets.map((asset) => (
                <div
                  key={asset._id}
                  onClick={() => setSelected(selected?._id === asset._id ? null : asset)}
                  className={`group relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                    selected?._id === asset._id
                      ? "border-blue-500 shadow-lg shadow-blue-500/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                  }`}
                >
                  <AssetThumb asset={asset} />
                  {/* Delete overlay */}
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(asset); }}
                    disabled={deleting === asset._id}
                    className="absolute top-1.5 right-1.5 p-1.5 bg-white/90 dark:bg-gray-900/90 rounded-lg shadow text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {deleting === asset._id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                  </button>
                  {/* Module badge */}
                  <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 bg-black/60 text-white text-[10px] rounded-md font-medium">
                    {asset.module}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                    <th className="px-4 py-3 text-left">File</th>
                    <th className="px-4 py-3 text-left">Module</th>
                    <th className="px-4 py-3 text-left">Size</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {assets.map((asset) => (
                    <tr
                      key={asset._id}
                      onClick={() => setSelected(selected?._id === asset._id ? null : asset)}
                      className={`cursor-pointer transition-colors ${selected?._id === asset._id ? "bg-blue-50 dark:bg-blue-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-800/50"}`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
                            <AssetThumb asset={asset} />
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white truncate max-w-[180px]">
                            {asset.originalName}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                          {asset.module}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{formatBytes(asset.size)}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{formatDate(asset.createdAt)}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDelete(asset); }}
                          disabled={deleting === asset._id}
                          className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          {deleting === asset._id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => fetchAssets({ page: p })}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                    p === pagination.page
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Preview Panel */}
        {selected && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-5 sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">File Details</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X size={16} />
              </button>
            </div>
            {selected.mimeType?.startsWith("image/") && selected.publicUrl && (
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
                <Image src={selected.publicUrl} alt={selected.originalName} fill className="object-contain" />
              </div>
            )}
            <div className="space-y-2 text-sm">
              <DetailRow label="Name" value={selected.originalName} />
              <DetailRow label="Module" value={selected.module} />
              <DetailRow label="Type" value={selected.mimeType} />
              <DetailRow label="Size" value={formatBytes(selected.size)} />
              <DetailRow label="Uploaded" value={formatDate(selected.createdAt)} />
            </div>
            <div className="mt-4 flex gap-2">
              <a
                href={selected.publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Open File
              </a>
              <button
                onClick={() => handleDelete(selected)}
                disabled={deleting === selected._id}
                className="px-3 py-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 border border-red-200 dark:border-red-800 text-xs font-semibold rounded-lg transition-colors"
              >
                {deleting === selected._id ? <Loader2 size={14} className="animate-spin" /> : "Delete"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex gap-2">
      <span className="text-gray-500 dark:text-gray-400 w-20 shrink-0">{label}</span>
      <span className="text-gray-900 dark:text-white font-medium break-all">{value}</span>
    </div>
  );
}
