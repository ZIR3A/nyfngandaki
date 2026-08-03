import { NextResponse } from "next/server";
import { ConstitutionService } from "@/services/bidhan/constitution.service";
import { ChapterService } from "@/services/bidhan/chapter.service";
import { ArticleService } from "@/services/bidhan/article.service";

export async function GET() {
  try {
    // 1. Get the currently active constitution
    const constitution = await ConstitutionService.getActiveConstitution();
    
    if (!constitution) {
      return NextResponse.json({ success: false, message: "No active constitution found" }, { status: 404 });
    }

    // 2. Fetch all chapters for this constitution
    const chapters = await ChapterService.getChaptersByConstitution(constitution._id);

    // 3. Fetch all articles for these chapters in parallel
    const chapterIds = chapters.map(c => c._id);
    const articlesPromises = chapterIds.map(id => ArticleService.getArticlesByChapter(id));
    const allArticlesArrays = await Promise.all(articlesPromises);
    
    // 4. Map articles to their respective chapters
    const chaptersWithArticles = chapters.map((chapter, index) => ({
      ...chapter,
      articles: allArticlesArrays[index]
    }));

    // 5. Construct the final optimized response for the Digital Constitution Reader
    const responseData = {
      constitution,
      chapters: chaptersWithArticles
    };

    return NextResponse.json({ success: true, data: responseData });
  } catch (error) {
    console.error("Public Constitution GET Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
