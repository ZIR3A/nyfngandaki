import React from "react";
import BidhanSidebar from "@/features/bidhan/components/admin/BidhanSidebar";

export default function BidhanAdminLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <BidhanSidebar />
      <div className="flex-1 h-full overflow-y-auto">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
