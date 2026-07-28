"use client";

import React from 'react';
import { useMediaLibrary } from '../contexts/MediaLibraryContext';
import { FileIcon, ImageIcon, FileText, Video } from 'lucide-react';
import Image from 'next/image';

const getFileIcon = (mimeType) => {
  if (mimeType.startsWith('image/')) return ImageIcon;
  if (mimeType.startsWith('video/')) return Video;
  if (mimeType === 'application/pdf') return FileText;
  return FileIcon;
};

export const AssetGrid = () => {
  const { assets, isLoading, error, selectedAsset, setSelectedAsset, viewMode } = useMediaLibrary();

  if (isLoading) {
    return <div className="flex-1 flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
  }

  if (error) {
    return <div className="flex-1 p-8 text-red-500">Error loading assets: {error}</div>;
  }

  if (assets.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-slate-500">
        <ImageIcon size={48} className="mb-4 text-slate-300" />
        <p>No assets found in this folder.</p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="flex-1 overflow-auto bg-white p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-sm text-slate-500">
              <th className="pb-2 font-medium">Name</th>
              <th className="pb-2 font-medium">Module</th>
              <th className="pb-2 font-medium">Size</th>
              <th className="pb-2 font-medium">Date</th>
              <th className="pb-2 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map(asset => {
              const isSelected = selectedAsset?._id === asset._id;
              const Icon = getFileIcon(asset.mimeType);
              
              const quickDelete = async (e) => {
                e.stopPropagation();
                if (!confirm("Are you sure you want to permanently delete this asset from both the database and Google Drive?")) return;
                try {
                  const res = await fetch(`/api/storage/${asset._id}`, { method: 'DELETE' });
                  if (res.ok) window.location.reload(); // Simple refresh for quick delete
                } catch (err) {
                  alert("Failed to delete asset");
                }
              };

              return (
                <tr 
                  key={asset._id}
                  onClick={() => setSelectedAsset(asset)}
                  className={`border-b border-slate-100 cursor-pointer hover:bg-slate-50 ${isSelected ? 'bg-blue-50' : ''}`}
                >
                  <td className="py-3 flex items-center gap-3">
                    {asset.mimeType.startsWith('image/') ? (
                      <div className="w-10 h-10 relative rounded bg-slate-100 overflow-hidden shrink-0">
                        <Image src={asset.publicUrl} alt={asset.originalName} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                        <Icon size={20} />
                      </div>
                    )}
                    <span className="text-sm font-medium text-slate-700 truncate max-w-[200px]">{asset.originalName}</span>
                  </td>
                  <td className="py-3 text-sm text-slate-500 capitalize">{asset.module}</td>
                  <td className="py-3 text-sm text-slate-500">{(asset.size / 1024 / 1024).toFixed(2)} MB</td>
                  <td className="py-3 text-sm text-slate-500">{new Date(asset.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 text-right">
                    <button 
                      onClick={quickDelete}
                      className="text-slate-400 hover:text-red-500 p-2 rounded-md hover:bg-red-50 transition-colors"
                      title="Permanently Delete"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  // Grid View
  return (
    <div className="flex-1 overflow-auto bg-white p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {assets.map((asset) => {
          const isSelected = selectedAsset?._id === asset._id;
          const Icon = getFileIcon(asset.mimeType);
          const isImage = asset.mimeType.startsWith('image/');
          
          return (
            <div 
              key={asset._id}
              onClick={() => setSelectedAsset(asset)}
              className={`group relative flex flex-col border rounded-lg overflow-hidden cursor-pointer transition-all ${
                isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-200 hover:border-blue-300 shadow-sm hover:shadow'
              }`}
            >
              <div className="aspect-square bg-slate-100 relative flex items-center justify-center">
                {isImage ? (
                  <Image src={asset.publicUrl} alt={asset.originalName} fill className="object-cover" />
                ) : (
                  <Icon size={40} className="text-slate-400" />
                )}
              </div>
              <div className="p-2 bg-white">
                <p className="text-xs font-medium text-slate-700 truncate" title={asset.originalName}>
                  {asset.originalName}
                </p>
                <p className="text-[10px] text-slate-500 uppercase mt-0.5">
                  {(asset.size / 1024).toFixed(0)} KB • {asset.extension}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
