"use client";

import React from "react";
import { DistrictExplorerProvider } from "../contexts/DistrictExplorerContext";
import { DirectoryHero } from "./DirectoryHero";
import { DynamicCommitteeSections } from "./DynamicCommitteeSections";
import { DistrictExplorerSection } from "./DistrictExplorerSection";
import { DistrictMembersSection } from "./DistrictMembersSection";

export function MembersDirectoryLayout({ isNepali }) {
  return (
    <DistrictExplorerProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans">
        {/* 1. Hero Section */}
        <DirectoryHero isNepali={isNepali} />
        
        {/* 2. Dynamic Committee Sections (Incharge, Province, etc) */}
        <DynamicCommitteeSections isNepali={isNepali} />
        
        {/* 3. District Explorer */}
        <DistrictExplorerSection isNepali={isNepali} />

        {/* 4. District Members */}
        <DistrictMembersSection isNepali={isNepali} />
      </div>
    </DistrictExplorerProvider>
  );
}
