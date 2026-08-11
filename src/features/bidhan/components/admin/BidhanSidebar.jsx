"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BookOpen, 
  FileText, 
  Files, 
  History, 
  LayoutDashboard,
  GitCommit,
  Search
} from "lucide-react";

export default function BidhanSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin/bidhan", icon: LayoutDashboard },
    { name: "Constitution", href: "/admin/bidhan/constitution", icon: BookOpen },
    { name: "Chapters", href: "/admin/bidhan/chapters", icon: Files },
    { name: "Articles", href: "/admin/bidhan/articles", icon: FileText },
    { name: "Documents", href: "/admin/bidhan/documents", icon: Search },
    { name: "Versions", href: "/admin/bidhan/versions", icon: History },
    { name: "Amendments", href: "/admin/bidhan/amendments", icon: GitCommit },
  ];

  return (
    <div className="w-full md:w-64 shrink-0 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-y-auto no-scrollbar pb-4 md:pb-0 pr-0 md:pr-4 hide-scrollbar">
      <div className="p-4 hidden md:block mb-2">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#1546B0]" />
          Bidhan CRM
        </h2>
        <p className="text-xs text-slate-500 mt-1">Digital Constitution Manager</p>
      </div>
      {navItems.map((item) => {
        const isActive = item.href === "/admin/bidhan"
          ? pathname === item.href
          : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
              isActive
                ? "bg-[#1546B0] text-white"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
            {item.name}
          </Link>
        );
      })}
    </div>
  );
}
