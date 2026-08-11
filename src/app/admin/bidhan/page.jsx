"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Files, FileText, Download, TrendingUp, History, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getDashboardStatsAction } from "@/actions/bidhan.actions";

export default function BidhanDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    hasConstitution: false,
    version: "N/A",
    chaptersCount: 0,
    articlesCount: 0,
    documentsCount: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await getDashboardStatsAction();
      if (res.success && res.data) {
        setStats(res.data);
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: "Active Version", value: stats.version || "N/A", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { label: "Total Chapters", value: (stats.chaptersCount || 0).toString(), icon: Files, color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
    { label: "Total Articles", value: (stats.articlesCount || 0).toString(), icon: FileText, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30" },
    { label: "Official Documents", value: (stats.documentsCount || 0).toString(), icon: Download, color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/30" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-slate-500 mt-2">Overview of the Digital Constitution and Official Documents.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 animate-pulse"></div>
          ))}
        </div>
      ) : !stats.hasConstitution ? (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-8 text-center max-w-2xl mx-auto mt-12">
          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Active Constitution Found</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            You need to create an initial constitution profile before you can manage chapters, articles, and documents.
          </p>
          <Button asChild>
            <Link href="/admin/bidhan/constitution">
              <BookOpen className="w-4 h-4 mr-2" />
              Create Initial Constitution
            </Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <Button asChild variant="outline" size="crm-primary" className="h-auto py-4 flex flex-col items-center gap-2">
                  <Link href="/admin/bidhan/chapters">
                    <Files className="w-5 h-5" />
                    Manage Chapters
                  </Link>
                </Button>
                <Button asChild variant="outline" size="crm-primary" className="h-auto py-4 flex flex-col items-center gap-2">
                  <Link href="/admin/bidhan/articles">
                    <FileText className="w-5 h-5" />
                    Manage Articles
                  </Link>
                </Button>
                <Button asChild variant="outline" size="crm-primary" className="h-auto py-4 flex flex-col items-center gap-2">
                  <Link href="/admin/bidhan/documents">
                    <Download className="w-5 h-5" />
                    Upload Document
                  </Link>
                </Button>
                <Button asChild variant="outline" size="crm-primary" className="h-auto py-4 flex flex-col items-center gap-2">
                  <Link href="/admin/bidhan/versions">
                    <History className="w-5 h-5" />
                    Version History
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">Article {i * 12} Updated</p>
                      <p className="text-xs text-slate-500 mt-1">Admin modified the content in Chapter {i}.</p>
                      <p className="text-xs text-slate-400 mt-1">{i * 2} hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

