"use client";

import React, { useState, useRef } from 'react';
import { UploadCloud, X, File as FileIcon, Loader2 } from 'lucide-react';
import { useMediaLibrary } from '../contexts/MediaLibraryContext';

export const UploadDropzone = ({ onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  
  const inputRef = useRef(null);
  const { handleUploadSuccess, selectedFolder } = useMediaLibrary();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...droppedFiles]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    setError(null);
    setProgress(0);
    
    const module = selectedFolder === 'all' ? 'temp' : selectedFolder;

    try {
      // For simplicity in this demo, upload files sequentially
      // In production, you might want parallel uploads with Promise.all
      let completed = 0;
      
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("module", module);
        formData.append("folder", module);
        
        const res = await fetch("/api/storage/upload", {
          method: "POST",
          body: formData,
        });
        
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || `Failed to upload ${file.name}`);
        }
        
        completed++;
        setProgress((completed / files.length) * 100);
      }
      
      handleUploadSuccess();
      setFiles([]);
      if (onClose) onClose();
      
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 max-w-xl w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800">Upload Assets</h3>
        {onClose && (
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-md text-slate-500">
            <X size={20} />
          </button>
        )}
      </div>

      <div 
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400 bg-slate-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <UploadCloud size={48} className={`mx-auto mb-4 ${dragActive ? 'text-blue-500' : 'text-slate-400'}`} />
        <p className="text-slate-600 mb-2 font-medium">Drag & drop files here</p>
        <p className="text-slate-400 text-sm mb-4">or click to browse from your computer</p>
        
        <input 
          ref={inputRef}
          type="file" 
          multiple 
          className="hidden" 
          onChange={handleChange}
        />
        
        <button 
          onClick={() => inputRef.current?.click()}
          className="px-4 py-2 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Select Files
        </button>
      </div>

      {files.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-slate-700 mb-3">Selected Files ({files.length})</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <FileIcon size={18} className="text-slate-400 shrink-0" />
                  <span className="text-sm text-slate-700 truncate font-medium">{file.name}</span>
                  <span className="text-xs text-slate-400 shrink-0">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                {!uploading && (
                  <button onClick={() => removeFile(idx)} className="text-slate-400 hover:text-red-500 p-1">
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-100">
              {error}
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex-1 mr-4">
              {uploading && (
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
              )}
            </div>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium text-sm hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
            >
              {uploading ? (
                <><Loader2 size={16} className="animate-spin mr-2" /> Uploading...</>
              ) : (
                'Upload Files'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
