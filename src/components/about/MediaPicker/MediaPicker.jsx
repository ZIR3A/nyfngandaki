'use client';

import React, { useState } from 'react';
// import { UploadCloud, Search, Image as ImageIcon, FileText } from 'lucide-react';

/**
 * Reusable MediaPicker Component
 * @param {Array} allowedTypes - e.g., ['image', 'document']
 * @param {boolean} multiple - Allow multiple selections
 * @param {function} onSelect - Callback when media is selected: (mediaId or [mediaIds]) => void
 */
export default function MediaPicker({ allowedTypes = ['image'], multiple = false, onSelect }) {
  const [activeTab, setActiveTab] = useState('library'); // 'library' | 'upload'
  
  return (
    <div className="bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col h-[600px] max-w-4xl mx-auto">
      {/* Header Tabs */}
      <div className="flex border-b bg-gray-50">
        <button 
          className={`px-6 py-3 font-medium text-sm ${activeTab === 'library' ? 'border-b-2 border-blue-600 text-blue-700 bg-white' : 'text-gray-600 hover:text-gray-900'}`}
          onClick={() => setActiveTab('library')}
        >
          Media Library
        </button>
        <button 
          className={`px-6 py-3 font-medium text-sm ${activeTab === 'upload' ? 'border-b-2 border-blue-600 text-blue-700 bg-white' : 'text-gray-600 hover:text-gray-900'}`}
          onClick={() => setActiveTab('upload')}
        >
          Upload New
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === 'library' ? (
          <div>
            {/* Search and Filter */}
            <div className="flex gap-4 mb-6">
              <input type="text" placeholder="Search media..." className="flex-1 border rounded-lg px-4 py-2" />
              <select className="border rounded-lg px-4 py-2">
                <option value="">All Types</option>
                <option value="image">Images</option>
                <option value="document">Documents</option>
              </select>
            </div>
            {/* Media Grid Placeholder */}
            <div className="grid grid-cols-4 gap-4">
               <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-blue-500 cursor-pointer transition-colors">
                  <span className="text-gray-400 text-sm">Media Item</span>
               </div>
               {/* Map more items here */}
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="text-center">
              {/* <UploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-4" /> */}
              <p className="text-gray-700 font-medium text-lg mb-1">Click or drag files here to upload</p>
              <p className="text-gray-500 text-sm">Supports JPG, PNG, WEBP, PDF (Max 5MB)</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="border-t p-4 flex justify-end gap-3 bg-gray-50">
        <button className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 bg-white font-medium">
          Cancel
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
          Insert Selected
        </button>
      </div>
    </div>
  );
}
