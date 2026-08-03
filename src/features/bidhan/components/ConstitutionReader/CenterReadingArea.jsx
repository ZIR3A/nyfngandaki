import React from "react";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CenterReadingArea({
  t,
  locale,
  chapter,
  article,
  onPrevious,
  onNext,
  onOpenMobileMenu,
}) {
  if (!chapter || !article) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[500px] text-slate-400">
        <p>{t("bidhan.selectArticle") || "Select an article to start reading."}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-950 relative">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-36 z-30 flex items-center p-4 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur">
        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenMobileMenu}
          className="mr-3"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold truncate">
            {t("bidhan.chapter") || "Chapter"} {chapter.number}
          </p>
          <p className="text-sm font-medium truncate">
            {article.number}. {article.title[locale] || article.title["en"]}
          </p>
        </div>
      </div>

      {/* Reading Content */}
      <div className="flex-1 px-4 py-8 md:px-12 md:py-12 lg:px-16 max-w-4xl mx-auto w-full">
        <div className="mb-8 md:mb-12">
          <h2 className="text-sm md:text-base font-bold text-primary tracking-widest uppercase mb-2">
            {t("bidhan.chapter") || "Chapter"} {chapter.number}: {chapter.title[locale] || chapter.title["en"]}
          </h2>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
            {article.number}. {article.title[locale] || article.title["en"]}
          </h1>
        </div>

        <div className="prose prose-slate dark:prose-invert prose-lg md:prose-xl max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
          {/* Dangerously setting HTML for the mock rich text content */}
          <div dangerouslySetInnerHTML={{ __html: article.content[locale] || article.content["en"] }} />
        </div>

        {/* Navigation Buttons */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={onPrevious}
            className="flex-1 sm:flex-none sm:w-auto h-auto py-3 px-4 justify-start rounded-xl group"
          >
            <ChevronLeft className="w-5 h-5 mr-2 text-slate-400 group-hover:text-primary transition-colors" />
            <div className="text-left min-w-0 hidden sm:block">
              <span className="block text-xs text-slate-500 uppercase tracking-wider">
                {t("bidhan.previous") || "Previous"}
              </span>
              <span className="block text-sm font-medium truncate max-w-[200px]">
                {t("bidhan.previousArticle") || "Previous Article"}
              </span>
            </div>
            <span className="sm:hidden">{t("bidhan.previous") || "Previous"}</span>
          </Button>

          <Button
            variant="outline"
            onClick={onNext}
            className="flex-1 sm:flex-none sm:w-auto h-auto py-3 px-4 justify-end rounded-xl group ml-4"
          >
            <div className="text-right min-w-0 hidden sm:block">
              <span className="block text-xs text-slate-500 uppercase tracking-wider">
                {t("bidhan.next") || "Next"}
              </span>
              <span className="block text-sm font-medium truncate max-w-[200px]">
                {t("bidhan.nextArticle") || "Next Article"}
              </span>
            </div>
            <span className="sm:hidden">{t("bidhan.next") || "Next"}</span>
            <ChevronRight className="w-5 h-5 ml-2 text-slate-400 group-hover:text-primary transition-colors" />
          </Button>
        </div>
      </div>
    </div>
  );
}
