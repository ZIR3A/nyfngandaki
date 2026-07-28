"use client";

import React, { useState } from 'react';
import { useMediaLibrary } from '../contexts/MediaLibraryContext';
import { 
  X, 
  Trash2, 
  Download, 
  ExternalLink, 
  Copy, 
  Info,
  Calendar,
  HardDrive,
  FileText,
  User,
  AlertTriangle
} from 'lucide-react';
import Image from 'next/image';

export const AssetPreviewPanel = () => {
  const { selectedAsset, setSelectedAsset, refresh, isPicker, onSelectAsset } = useMediaLibrary();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  if (!selectedAsset) return null;

  const isImage = selectedAsset.mimeType.startsWith('image/');
  const isVideo = selectedAsset.mimeType.startsWith('video/');

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedAsset.publicUrl);
    // In a real app, you'd show a toast here
  };

  const handleDelete = async () => {
    if (selectedAsset.usageCount > 0) {
      if (!confirm(`Warning: This asset is used in ${selectedAsset.usageCount} places. Deleting it will break those references. Are you sure?`)) {
        return;
      }
    } else {
      if (!confirm("Are you sure you want to delete this asset?")) return;
    }

    setIsDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/storage/${selectedAsset._id}`, { method: 'DELETE' });
      const data = await res.json();
      
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete");
      }
      
      setSelectedAsset(null);
      refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-80 bg-white border-l border-slate-200 h-full flex flex-col hidden lg:flex shrink-0">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <h3 className="font-semibold text-slate-800">Asset Details</h3>
        <button onClick={() => setSelectedAsset(null)} className="text-slate-400 hover:text-slate-600 p-1">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Preview Area */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-center items-center min-h-[200px]">
          {isImage ? (
            <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-sm border border-slate-200 bg-white">
              <Image src={selectedAsset.publicUrl} alt={selectedAsset.originalName} fill className="object-contain" />
            </div>
          ) : isVideo ? (
            <video src={selectedAsset.publicUrl} controls className="w-full rounded-lg" />
          ) : (
            <div className="w-full aspect-square bg-white rounded-lg border border-slate-200 flex flex-col items-center justify-center text-slate-400 shadow-sm">
              <FileText size={64} className="mb-4 text-slate-300" />
              <span className="text-sm font-medium">No Preview Available</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-4 flex gap-2 border-b border-slate-100 flex-wrap">
          {isPicker && (
            <button 
              onClick={() => onSelectAsset(selectedAsset)} 
              className="w-full flex items-center justify-center p-3 mb-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-sm font-medium"
            >
              Select this Asset
            </button>
          )}
          <button onClick={handleCopy} className="flex-1 flex flex-col items-center justify-center p-2 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors border border-transparent hover:border-slate-200">
            <Copy size={18} className="mb-1" />
            <span className="text-[10px] uppercase font-bold tracking-wider">Copy URL</span>
          </button>
          <a href={selectedAsset.publicUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center justify-center p-2 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors border border-transparent hover:border-slate-200">
            <ExternalLink size={18} className="mb-1" />
            <span className="text-[10px] uppercase font-bold tracking-wider">Open</span>
          </a>
          <button onClick={handleDelete} disabled={isDeleting} className="flex-1 flex flex-col items-center justify-center p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors border border-transparent hover:border-red-100 disabled:opacity-50">
            <Trash2 size={18} className="mb-1" />
            <span className="text-[10px] uppercase font-bold tracking-wider">{isDeleting ? '...' : 'Delete'}</span>
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border-b border-red-100 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Details List */}
        <div className="p-4 space-y-4">
          
          {selectedAsset.usageCount > 0 && (
            <div className="flex items-start p-3 bg-blue-50 text-blue-800 rounded-lg text-sm">
              <Info size={16} className="shrink-0 mt-0.5 mr-2" />
              <div>This asset is actively used in <strong>{selectedAsset.usageCount}</strong> place(s). Deleting it may cause missing images in the app.</div>
            </div>
          )}

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">File Info</h4>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-slate-500 block text-xs">Original Name</span>
                <span className="font-medium text-slate-700 break-all">{selectedAsset.originalName}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-500 block text-xs flex items-center gap-1"><HardDrive size={12}/> Size</span>
                  <span className="font-medium text-slate-700">{(selectedAsset.size / 1024).toFixed(2)} KB</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Type</span>
                  <span className="font-medium text-slate-700 uppercase">{selectedAsset.extension}</span>
                </div>
              </div>
              <div>
                <span className="text-slate-500 block text-xs">MIME</span>
                <span className="font-medium text-slate-700">{selectedAsset.mimeType}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Context</h4>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-slate-500 block text-xs">Module</span>
                <span className="font-medium text-slate-700 capitalize">{selectedAsset.module}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-xs flex items-center gap-1"><Calendar size={12}/> Uploaded</span>
                <span className="font-medium text-slate-700">{new Date(selectedAsset.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
