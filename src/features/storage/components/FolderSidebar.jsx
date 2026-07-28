"use client";

import React from 'react';
import { useMediaLibrary } from '../contexts/MediaLibraryContext';
import { 
  Folder, 
  Image as ImageIcon, 
  Users, 
  MapPin, 
  Calendar, 
  Building2, 
  FileText,
  Clock
} from 'lucide-react';

const FOLDERS = [
  { id: 'all', label: 'All Assets', icon: Folder },
  { id: 'members', label: 'Members', icon: Users },
  { id: 'homepage', label: 'Homepage', icon: ImageIcon },
  { id: 'districts', label: 'Districts', icon: MapPin },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'organization', label: 'Organization', icon: Building2 },
  { id: 'resources', label: 'Resources', icon: FileText },
  { id: 'temp', label: 'Temp', icon: Clock },
];

export const FolderSidebar = () => {
  const { selectedFolder, setSelectedFolder, setPage } = useMediaLibrary();

  const handleSelect = (id) => {
    setSelectedFolder(id);
    setPage(1); // Reset to first page when changing folders
  };

  return (
    <div className="w-64 bg-slate-50 border-r border-slate-200 h-full flex flex-col hidden md:flex">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">Folders</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {FOLDERS.map((folder) => {
          const Icon = folder.icon;
          const isActive = selectedFolder === folder.id;
          return (
            <button
              key={folder.id}
              onClick={() => handleSelect(folder.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                isActive 
                  ? "bg-blue-100 text-blue-700" 
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon size={18} className={isActive ? "text-blue-600" : "text-slate-400"} />
              <span>{folder.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
