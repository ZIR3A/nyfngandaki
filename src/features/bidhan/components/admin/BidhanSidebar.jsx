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
    <div className="w-full md:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-x-auto md:overflow-y-auto md:h-full hide-scrollbar">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 hidden md:block">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Bidhan CRM
        </h2>
        <p className="text-xs text-slate-500 mt-1">Digital Constitution Manager</p>
      </div>
      <nav className="p-2 md:p-4 flex flex-row md:flex-col gap-1 min-w-max md:min-w-0">
        {navItems.map((item) => {
          const isActive = item.href === "/admin/bidhan"
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2 md:gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? "bg-primary text-white"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-white" : "text-slate-400 dark:text-slate-500"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
