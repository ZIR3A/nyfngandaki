"use client";

import React, { useState } from 'react';
import { MediaLibraryProvider, useMediaLibrary } from '../contexts/MediaLibraryContext';
import { FolderSidebar } from './FolderSidebar';
import { AssetGrid } from './AssetGrid';
import { AssetPreviewPanel } from './AssetPreviewPanel';
import { UploadDropzone } from './UploadDropzone';
import { Search, LayoutGrid, List, Plus, Filter } from 'lucide-react';

const MediaLibraryHeader = () => {
  const { searchQuery, setSearchQuery, viewMode, setViewMode } = useMediaLibrary();
  const [showUpload, setShowUpload] = useState(false);

  return (
    <>
      <div className="bg-white border-b border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div className="flex-1 max-w-xl flex items-center space-x-2 bg-slate-100 rounded-lg px-3 py-2 border border-slate-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search assets..." 
            className="bg-transparent border-none outline-none w-full text-sm text-slate-800 placeholder-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
              title="Grid View"
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
              title="List View"
            >
              <List size={18} />
            </button>
          </div>

          <button className="flex items-center space-x-2 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Filter size={16} />
            <span className="hidden sm:inline">Filter</span>
          </button>

          <button 
            onClick={() => setShowUpload(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus size={18} />
            <span>Upload</span>
          </button>
        </div>
      </div>

      {showUpload && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <UploadDropzone onClose={() => setShowUpload(false)} />
        </div>
      )}
    </>
  );
};

export const MediaLibraryLayout = () => {
  return (
    <MediaLibraryProvider>
      <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50 w-full overflow-hidden">
        <MediaLibraryHeader />
        <div className="flex flex-1 overflow-hidden relative">
          <FolderSidebar />
          <AssetGrid />
          <AssetPreviewPanel />
        </div>
      </div>
    </MediaLibraryProvider>
  );
};
