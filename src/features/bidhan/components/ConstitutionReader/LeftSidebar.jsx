import React, { useState } from "react";
import { Search, ChevronDown, ChevronRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LeftSidebar({
  t,
  locale,
  chapters,
  activeChapterId,
  activeArticleId,
  onSelectArticle,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedChapters, setExpandedChapters] = useState(
    chapters.map((c) => c.id) // Default all expanded for demo
  );

  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const filteredChapters = chapters.map((chapter) => {
    const titleStr = chapter.title[locale] || chapter.title["en"] || "";
    const chapterTitle = titleStr.toLowerCase();
    const matchesChapter = chapterTitle.includes(searchQuery.toLowerCase());

    const filteredArticles = chapter.articles.filter((article) => {
      const artTitleStr = article.title[locale] || article.title["en"] || "";
      return artTitleStr.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return {
      ...chapter,
      articles: filteredArticles,
      matchesChapter,
    };
  }).filter((chapter) => chapter.matchesChapter || chapter.articles.length > 0);

  return (
    <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0 flex flex-col h-[calc(100vh-140px)] sticky top-36 overflow-hidden bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 hidden md:flex">
      {/* Sidebar Header / Search */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={t("bidhan.searchContents") || "Search chapters, articles..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Table of Contents */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-3">
        <div className="mb-2 px-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t("bidhan.tableOfContents") || "Table of Contents"}
          </h3>
        </div>

        <nav className="space-y-1">
          {filteredChapters.map((chapter) => {
            const isExpanded = expandedChapters.includes(chapter.id);
            const isActiveChapter = activeChapterId === chapter.id;

            return (
              <div key={chapter.id} className="mb-1">
                <button
                  onClick={() => toggleChapter(chapter.id)}
                  className={cn(
                    "w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors group text-left",
                    isActiveChapter
                      ? "bg-slate-100 dark:bg-slate-800/50 text-primary font-medium"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/50"
                  )}
                >
                  <span className="mr-2 text-slate-400 group-hover:text-primary transition-colors">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </span>
                  <span className="flex-1 line-clamp-1">
                    {t("bidhan.chapter") || "Chapter"} {chapter.number}:{" "}
                    {chapter.title[locale] || chapter.title["en"]}
                  </span>
                </button>

                {isExpanded && chapter.articles.length > 0 && (
                  <div className="mt-1 ml-4 pl-3 border-l border-slate-200 dark:border-slate-800 space-y-1">
                    {chapter.articles.map((article) => {
                      const isActiveArticle = activeArticleId === article.id;
                      return (
                        <button
                          key={article.id}
                          onClick={() => onSelectArticle(chapter.id, article.id)}
                          className={cn(
                            "w-full flex items-start px-3 py-2 text-sm rounded-lg transition-colors text-left",
                            isActiveArticle
                              ? "bg-primary/5 text-primary font-medium"
                              : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-slate-200"
                          )}
                        >
                          <BookOpen className="w-3.5 h-3.5 mr-2 mt-0.5 flex-shrink-0 opacity-50" />
                          <span className="line-clamp-2 leading-tight">
                            {article.number}. {article.title[locale] || article.title["en"]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
