"use server";

import { ConstitutionService } from "@/services/bidhan/constitution.service";
import { ChapterService } from "@/services/bidhan/chapter.service";
import { ArticleService } from "@/services/bidhan/article.service";
import { DocumentService } from "@/services/bidhan/document.service";
import { VersionService } from "@/services/bidhan/version.service";
import { AmendmentService } from "@/services/bidhan/amendment.service";
import { revalidatePath, revalidateTag } from "next/cache";

// Temporary mock user ID for testing until Auth is fully wired
const MOCK_USER_ID = null; 

function apiResponse(success, data = null, message = "", errors = []) {
  // Serialize Mongoose documents to plain objects for Next.js Client Components
  const serializedData = data ? JSON.parse(JSON.stringify(data)) : null;
  return { success, data: serializedData, message, errors };
}

// ----------------------------------------------------------------------
// DASHBOARD
// ----------------------------------------------------------------------

export async function getDashboardStatsAction() {
  try {
    const constitution = await ConstitutionService.getActiveConstitution();
    if (!constitution) {
      return apiResponse(true, { hasConstitution: false }, "No constitution found");
    }
    
    // We can fetch real stats here
    const mongoose = require('mongoose');
    const BidhanChapter = mongoose.models.BidhanChapter || require('@/models/bidhan/Chapter').default;
    const BidhanArticle = mongoose.models.BidhanArticle || require('@/models/bidhan/Article').default;
    const BidhanDocument = mongoose.models.BidhanDocument || require('@/models/bidhan/Document').default;
    
    const [chaptersCount, articlesCount, documentsCount] = await Promise.all([
      BidhanChapter.countDocuments({ constitutionId: constitution._id, isDeleted: false }),
      BidhanArticle.countDocuments({ constitutionId: constitution._id, isDeleted: false }),
      BidhanDocument.countDocuments({ isDeleted: false })
    ]);
    
    return apiResponse(true, {
      hasConstitution: true,
      version: constitution.version || "N/A",
      chaptersCount,
      articlesCount,
      documentsCount
    }, "Stats fetched");
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    return apiResponse(false, null, "Failed to fetch stats", [error.message]);
  }
}

// ----------------------------------------------------------------------
// CONSTITUTION
// ----------------------------------------------------------------------

export async function getActiveConstitutionAction() {
  try {
    const constitution = await ConstitutionService.getActiveConstitution();
    return apiResponse(true, constitution, "Fetched active constitution.");
  } catch (error) {
    console.error("Get Constitution Error:", error);
    return apiResponse(false, null, "Failed to fetch constitution.", [error.message]);
  }
}

export async function saveConstitutionAction(formData) {
  try {
    let constitution;
    if (formData.id) {
      constitution = await ConstitutionService.updateConstitution(formData.id, formData, MOCK_USER_ID);
    } else {
      constitution = await ConstitutionService.createConstitution({
        ...formData,
        status: "Published"
      }, MOCK_USER_ID);
    }
    
    revalidatePath("/admin/bidhan");
    revalidatePath("/admin/bidhan/constitution");
    
    return apiResponse(true, constitution, "Constitution saved successfully.");
  } catch (error) {
    console.error("Save Constitution Error:", error);
    return apiResponse(false, null, "Failed to save constitution.", [error.message]);
  }
}

// ----------------------------------------------------------------------
// CHAPTERS
// ----------------------------------------------------------------------

export async function getChaptersAction() {
  try {
    const constitution = await ConstitutionService.getActiveConstitution();
    if (!constitution) return apiResponse(false, [], "No active constitution found.");
    
    const chapters = await ChapterService.getChaptersByConstitution(constitution._id);
    return apiResponse(true, chapters, "Fetched chapters successfully.");
  } catch (error) {
    console.error("Get Chapters Error:", error);
    return apiResponse(false, null, "Failed to fetch chapters.", [error.message]);
  }
}

export async function createChapterAction(formData) {
  try {
    // Generate a simple slug
    const baseSlug = formData.title?.en?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "chapter";
    const slug = `${baseSlug}-${Date.now()}`;
    
    const chapter = await ChapterService.createChapter({ ...formData, slug }, MOCK_USER_ID);
    revalidatePath("/admin/bidhan/chapters");
    return apiResponse(true, chapter, "Chapter created successfully.");
  } catch (error) {
    console.error("Create Chapter Error:", error);
    return apiResponse(false, null, "Failed to create chapter.", [error.message]);
  }
}

export async function updateChapterAction(id, formData) {
  try {
    const chapter = await ChapterService.updateChapter(id, formData, MOCK_USER_ID);
    revalidatePath("/admin/bidhan/chapters");
    return apiResponse(true, chapter, "Chapter updated successfully.");
  } catch (error) {
    console.error("Update Chapter Error:", error);
    return apiResponse(false, null, "Failed to update chapter.", [error.message]);
  }
}

export async function deleteChapterAction(id) {
  try {
    await ChapterService.softDeleteChapter(id, MOCK_USER_ID);
    revalidatePath("/admin/bidhan/chapters");
    return apiResponse(true, null, "Chapter deleted successfully.");
  } catch (error) {
    console.error("Delete Chapter Error:", error);
    return apiResponse(false, null, "Failed to delete chapter.", [error.message]);
  }
}

// ----------------------------------------------------------------------
// ARTICLES
// ----------------------------------------------------------------------

export async function getArticlesAction() {
  try {
    const constitution = await ConstitutionService.getActiveConstitution();
    if (!constitution) return apiResponse(false, [], "No active constitution found.");
    
    const chapters = await ChapterService.getChaptersByConstitution(constitution._id);
    const chapterIds = chapters.map(c => c._id);
    
    // Fetch all articles for these chapters
    const filter = { chapterId: { $in: chapterIds }, isDeleted: false };
    // Mongoose import needed for $in? No, just an object. 
    // Wait, ArticleService doesn't have a getAll function that accepts an array easily. Let's just use the model directly here or a service wrapper.
    // Actually, I can just query BidhanArticle.find(filter) directly here since it's a simple query.
    // Wait, ArticleService has getArticlesByChapter. I'll just fetch for all chapters if I need to.
    
    // It's cleaner to just fetch all articles that are not deleted and populate chapterId.
    const mongoose = require('mongoose');
    const BidhanArticle = mongoose.models.BidhanArticle || require('@/models/bidhan/Article').default;
    
    const articles = await BidhanArticle.find(filter).populate('chapterId').sort({ order: 1 }).lean();
    
    return apiResponse(true, articles, "Fetched articles successfully.");
  } catch (error) {
    console.error("Get Articles Error:", error);
    return apiResponse(false, null, "Failed to fetch articles.", [error.message]);
  }
}

export async function createArticleAction(formData) {
  try {
    const baseSlug = formData.title?.en?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "article";
    const slug = `${baseSlug}-${Date.now()}`;
    
    const article = await ArticleService.createArticle({ ...formData, slug }, MOCK_USER_ID);
    revalidatePath("/admin/bidhan/articles");
    return apiResponse(true, article, "Article created successfully.");
  } catch (error) {
    console.error("Create Article Error:", error);
    return apiResponse(false, null, "Failed to create article.", [error.message]);
  }
}

export async function updateArticleAction(id, formData) {
  try {
    const article = await ArticleService.updateArticle(id, formData, MOCK_USER_ID);
    revalidatePath("/admin/bidhan/articles");
    return apiResponse(true, article, "Article updated successfully.");
  } catch (error) {
    console.error("Update Article Error:", error);
    return apiResponse(false, null, "Failed to update article.", [error.message]);
  }
}

export async function deleteArticleAction(id) {
  try {
    await ArticleService.softDeleteArticle(id, MOCK_USER_ID);
    revalidatePath("/admin/bidhan/articles");
    return apiResponse(true, null, "Article deleted successfully.");
  } catch (error) {
    console.error("Delete Article Error:", error);
    return apiResponse(false, null, "Failed to delete article.", [error.message]);
  }
}

// ----------------------------------------------------------------------
// DOCUMENTS
// ----------------------------------------------------------------------

export async function getDocumentsAction() {
  try {
    const res = await DocumentService.getAllDocuments({ limit: 100 });
    return apiResponse(true, res.data, "Fetched documents successfully.");
  } catch (error) {
    console.error("Get Documents Error:", error);
    return apiResponse(false, null, "Failed to fetch documents.", [error.message]);
  }
}

export async function createDocumentAction(formData) {
  try {
    const mongoose = require('mongoose');
    const BidhanCategory = mongoose.models.BidhanCategory || require('@/models/bidhan/Category').default;
    
    // Check if category provided, otherwise get/create default "General" category
    let catId = formData.categoryId;
    if (!catId) {
      let defaultCat = await BidhanCategory.findOne({ slug: 'general', isDeleted: false });
      if (!defaultCat) {
        defaultCat = await BidhanCategory.create({
          name: { en: "General", np: "सामान्य" },
          slug: "general",
          type: "Document",
          createdBy: MOCK_USER_ID,
          updatedBy: MOCK_USER_ID
        });
      }
      catId = defaultCat._id;
    }
    
    const documentData = {
      ...formData,
      categoryId: catId,
      status: "Published"
    };
    
    const document = await DocumentService.createDocument(documentData, MOCK_USER_ID);
    revalidatePath("/admin/bidhan/documents");
    return apiResponse(true, document, "Document saved successfully.");
  } catch (error) {
    console.error("Create Document Error:", error);
    return apiResponse(false, null, "Failed to save document.", [error.message]);
  }
}

export async function deleteDocumentAction(id) {
  try {
    await DocumentService.softDeleteDocument(id, MOCK_USER_ID);
    revalidatePath("/admin/bidhan/documents");
    return apiResponse(true, null, "Document deleted successfully.");
  } catch (error) {
    console.error("Delete Document Error:", error);
    return apiResponse(false, null, "Failed to delete document.", [error.message]);
  }
}

// ----------------------------------------------------------------------
// VERSIONS
// ----------------------------------------------------------------------

export async function getVersionsAction() {
  try {
    const constitution = await ConstitutionService.getActiveConstitution();
    if (!constitution) return apiResponse(false, [], "No active constitution found.");
    
    const versions = await VersionService.getVersionsByConstitution(constitution._id);
    return apiResponse(true, versions, "Fetched versions.");
  } catch (error) {
    console.error("Get Versions Error:", error);
    return apiResponse(false, null, "Failed to fetch versions.", [error.message]);
  }
}

export async function createVersionAction(formData) {
  try {
    const version = await VersionService.createVersion(formData, MOCK_USER_ID);
    revalidatePath("/admin/bidhan/versions");
    return apiResponse(true, version, "Version saved successfully.");
  } catch (error) {
    console.error("Create Version Error:", error);
    return apiResponse(false, null, "Failed to save version.", [error.message]);
  }
}

export async function deleteVersionAction(id) {
  try {
    await VersionService.softDeleteVersion(id, MOCK_USER_ID);
    revalidatePath("/admin/bidhan/versions");
    return apiResponse(true, null, "Version deleted successfully.");
  } catch (error) {
    console.error("Delete Version Error:", error);
    return apiResponse(false, null, "Failed to delete version.", [error.message]);
  }
}

export async function makeVersionCurrentAction(versionId, constitutionId) {
  try {
    const updated = await VersionService.makeVersionCurrent(versionId, constitutionId, MOCK_USER_ID);
    revalidatePath("/admin/bidhan/versions");
    revalidatePath("/[locale]/bidhan", "page");
    return apiResponse(true, updated, "Version is now the current active version.");
  } catch (error) {
    console.error("Make Current Error:", error);
    return apiResponse(false, null, "Failed to make version current.", [error.message]);
  }
}

// ----------------------------------------------------------------------
// AMENDMENTS
// ----------------------------------------------------------------------

export async function getAmendmentsAction() {
  try {
    const constitution = await ConstitutionService.getActiveConstitution();
    if (!constitution) return apiResponse(false, [], "No active constitution found.");
    
    const amendments = await AmendmentService.getAmendmentsByConstitution(constitution._id);
    return apiResponse(true, amendments, "Fetched amendments.");
  } catch (error) {
    console.error("Get Amendments Error:", error);
    return apiResponse(false, null, "Failed to fetch amendments.", [error.message]);
  }
}

export async function createAmendmentAction(formData) {
  try {
    let constitutionId = formData.constitutionId;
    if (!constitutionId) {
      const constitution = await ConstitutionService.getActiveConstitution();
      if (!constitution) throw new Error("No active constitution found.");
      constitutionId = constitution._id;
    }

    const payload = { ...formData, constitutionId };
    const amendment = await AmendmentService.createAmendment(payload, MOCK_USER_ID);
    revalidatePath("/admin/bidhan/amendments");
    return apiResponse(true, amendment, "Amendment saved successfully.");
  } catch (error) {
    console.error("Create Amendment Error:", error);
    return apiResponse(false, null, "Failed to save amendment.", [error.message]);
  }
}

export async function deleteAmendmentAction(id) {
  try {
    await AmendmentService.softDeleteAmendment(id, MOCK_USER_ID);
    revalidatePath("/admin/bidhan/amendments");
    return apiResponse(true, null, "Amendment deleted successfully.");
  } catch (error) {
    console.error("Delete Amendment Error:", error);
    return apiResponse(false, null, "Failed to delete amendment.", [error.message]);
  }
}
