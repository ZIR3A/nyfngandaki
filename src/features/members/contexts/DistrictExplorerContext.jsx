"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const DistrictExplorerContext = createContext();

export function DistrictExplorerProvider({ children }) {
  const searchParams = useSearchParams();
  const initialDistrict = searchParams.get("district") || null;
  const [selectedDistrictSlug, setSelectedDistrictSlug] = useState(initialDistrict);

  useEffect(() => {
    const dist = searchParams.get("district");
    if (dist && dist !== selectedDistrictSlug) {
      setSelectedDistrictSlug(dist);
    }
  }, [searchParams]);

  const value = {
    selectedDistrictSlug,
    setSelectedDistrictSlug,
  };

  return (
    <DistrictExplorerContext.Provider value={value}>
      {children}
    </DistrictExplorerContext.Provider>
  );
}

export function useDistrictExplorer() {
  const context = useContext(DistrictExplorerContext);
  if (context === undefined) {
    throw new Error("useDistrictExplorer must be used within a DistrictExplorerProvider");
  }
  return context;
}
