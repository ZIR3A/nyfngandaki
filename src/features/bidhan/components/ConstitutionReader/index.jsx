import React, { useState, useEffect } from "react";
import LeftSidebar from "./LeftSidebar";
import CenterReadingArea from "./CenterReadingArea";
import RightSidebar from "./RightSidebar";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";

export default function ConstitutionReader({ t, locale, data }) {
  const [activeChapterId, setActiveChapterId] = useState(null);
  const [activeArticleId, setActiveArticleId] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize with first article
  useEffect(() => {
    if (data?.chapters?.length > 0 && data.chapters[0].articles?.length > 0) {
      setActiveChapterId(data.chapters[0].id);
      setActiveArticleId(data.chapters[0].articles[0].id);
    }
  }, [data]);

  const handleSelectArticle = (chapterId, articleId) => {
    setActiveChapterId(chapterId);
    setActiveArticleId(articleId);
    setIsMobileMenuOpen(false); // Close mobile drawer if open
  };

  const getActiveContent = () => {
    const chapter = data?.chapters?.find((c) => c.id === activeChapterId);
    const article = chapter?.articles?.find((a) => a.id === activeArticleId);
    return { chapter, article };
  };

  const { chapter: currentChapter, article: currentArticle } = getActiveContent();

  const handlePrevious = () => {
    if (!currentChapter || !currentArticle) return;
    const articleIndex = currentChapter.articles.findIndex((a) => a.id === activeArticleId);
    if (articleIndex > 0) {
      // Previous article in same chapter
      setActiveArticleId(currentChapter.articles[articleIndex - 1].id);
    } else {
      // Last article of previous chapter
      const chapterIndex = data.chapters.findIndex((c) => c.id === activeChapterId);
      if (chapterIndex > 0) {
        const prevChapter = data.chapters[chapterIndex - 1];
        if (prevChapter.articles.length > 0) {
          setActiveChapterId(prevChapter.id);
          setActiveArticleId(prevChapter.articles[prevChapter.articles.length - 1].id);
        }
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    if (!currentChapter || !currentArticle) return;
    const articleIndex = currentChapter.articles.findIndex((a) => a.id === activeArticleId);
    if (articleIndex < currentChapter.articles.length - 1) {
      // Next article in same chapter
      setActiveArticleId(currentChapter.articles[articleIndex + 1].id);
    } else {
      // First article of next chapter
      const chapterIndex = data.chapters.findIndex((c) => c.id === activeChapterId);
      if (chapterIndex < data.chapters.length - 1) {
        const nextChapter = data.chapters[chapterIndex + 1];
        if (nextChapter.articles.length > 0) {
          setActiveChapterId(nextChapter.id);
          setActiveArticleId(nextChapter.articles[0].id);
        }
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex w-full min-h-[calc(100vh-140px)] relative">
      {/* Desktop Sidebar */}
      <LeftSidebar
        t={t}
        locale={locale}
        chapters={data?.chapters || []}
        activeChapterId={activeChapterId}
        activeArticleId={activeArticleId}
        onSelectArticle={handleSelectArticle}
      />

      {/* Mobile Drawer */}
      <Drawer open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen} direction="left">
        <DrawerContent className="w-80 rounded-none h-full mt-0">
          <DrawerTitle className="sr-only">Contents</DrawerTitle>
          <div className="h-full overflow-y-auto">
            {/* Wrap the sidebar in a non-sticky container for the drawer */}
            <div className="pointer-events-auto h-full flex flex-col">
              <LeftSidebar
                t={t}
                locale={locale}
                chapters={data?.chapters || []}
                activeChapterId={activeChapterId}
                activeArticleId={activeArticleId}
                onSelectArticle={handleSelectArticle}
              />
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Main Reading Area */}
      <CenterReadingArea
        t={t}
        locale={locale}
        chapter={currentChapter}
        article={currentArticle}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Desktop Right Sidebar */}
      <RightSidebar t={t} />
    </div>
  );
}
