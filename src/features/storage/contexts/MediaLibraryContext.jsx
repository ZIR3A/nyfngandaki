"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const MediaLibraryContext = createContext();

export const useMediaLibrary = () => {
  return useContext(MediaLibraryContext);
};

export const MediaLibraryProvider = ({ children, isPicker = false, onSelectAsset = null, defaultFolder = "all", multiple = false }) => {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(defaultFolder);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAssets = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const url = new URL("/api/storage", window.location.origin);
      url.searchParams.append("page", page);
      url.searchParams.append("limit", 20);
      if (selectedFolder && selectedFolder !== "all") {
        url.searchParams.append("module", selectedFolder);
      }
      
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch assets");
      
      const data = await res.json();
      if (data.success) {
        setAssets(data.data.assets);
        setTotalPages(data.data.pagination.pages);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [selectedFolder, page]);

  const refresh = () => {
    fetchAssets();
  };

  const handleUploadSuccess = () => {
    refresh();
  };

  const value = {
    assets,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    selectedFolder,
    setSelectedFolder,
    selectedAsset,
    setSelectedAsset,
    viewMode,
    setViewMode,
    page,
    setPage,
    totalPages,
    refresh,
    handleUploadSuccess,
    isPicker,
    onSelectAsset,
    multiple
  };

  return (
    <MediaLibraryContext.Provider value={value}>
      {children}
    </MediaLibraryContext.Provider>
  );
};
