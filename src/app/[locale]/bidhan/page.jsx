"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import HeroSection from "@/features/bidhan/components/HeroSection";
import RelatedResources from "@/features/bidhan/components/RelatedResources";
import { 
  getActiveConstitutionAction, 
  getChaptersAction, 
  getArticlesAction, 
  getDocumentsAction, 
  getVersionsAction, 
  getAmendmentsAction 
} from "@/actions/bidhan.actions";
import { Loader2 } from "lucide-react";
export default function BidhanPage() {
  const params = useParams();
  const locale = params?.locale || "en";
  // Simple mock translation function for demo
  const t = (key) => {
    const translations = {
      // English
      "en.common.home": "Home",
      "en.bidhan.title": "Constitution",
      "en.bidhan.currentVersion": "Current Version",
      "en.bidhan.heroTitle": "Official Constitution of NYFN",
      "en.bidhan.heroDescription": "The supreme guiding document that outlines the principles, organizational structure, and operational guidelines of the National Youth Federation Nepal.",
      "en.bidhan.effectiveDate": "Effective:",
      "en.bidhan.publishedDate": "Published:",
      "en.bidhan.readOnline": "Read Constitution",
      "en.bidhan.downloadPdf": "Download PDF",
      "en.bidhan.versionHistory": "Version History",
      "en.bidhan.stats.chapters": "Total Chapters",
      "en.bidhan.stats.articles": "Total Articles",
      "en.bidhan.stats.documents": "Official Documents",
      "en.bidhan.stats.amendments": "Amendments",
      "en.bidhan.tabs.reader": "Digital Constitution",
      "en.bidhan.tabs.documents": "Official Documents",
      "en.bidhan.tabs.versions": "Versions",
      "en.bidhan.tabs.amendments": "Amendments",
      "en.bidhan.searchContents": "Search chapters, articles...",
      "en.bidhan.tableOfContents": "Table of Contents",
      "en.bidhan.chapter": "Chapter",
      "en.bidhan.selectArticle": "Select an article to start reading.",
      "en.bidhan.previous": "Previous",
      "en.bidhan.previousArticle": "Previous Article",
      "en.bidhan.next": "Next",
      "en.bidhan.nextArticle": "Next Article",
      "en.bidhan.readingTools": "Reading Tools",
      "en.bidhan.lightMode": "Light Mode",
      "en.bidhan.darkMode": "Dark Mode",
      "en.bidhan.printDocument": "Print Document",
      "en.bidhan.share": "Share",
      "en.bidhan.copyLink": "Copy Link",
      "en.bidhan.shareSocial": "Share to Socials",
      "en.bidhan.linkCopied": "Link copied to clipboard!",
      "en.bidhan.officialDocuments": "Official Documents",
      "en.bidhan.officialDocumentsDesc": "Browse and download official constitutional documents.",
      "en.bidhan.searchDocuments": "Search documents...",
      "en.bidhan.noDocumentsFound": "No documents found",
      "en.bidhan.tryAdjustingSearch": "Try adjusting your search criteria.",
      "en.bidhan.download": "Download",
      "en.bidhan.versionHistoryDesc": "Track the evolution of the constitution over time.",
      "en.bidhan.current": "Current",
      "en.bidhan.version": "Version",
      "en.bidhan.viewChanges": "View full changes",
      "en.bidhan.amendments": "Amendments",
      "en.bidhan.amendmentsDesc": "Detailed record of all changes made to the constitution.",
      "en.bidhan.affectedChapters": "Affected Chapters:",
      "en.bidhan.viewOriginalDoc": "View Original Document",
      "en.bidhan.expandDetails": "Expand Details",
      "en.bidhan.relatedResources": "Related Resources",
      "en.bidhan.relatedResourcesDesc": "Explore guidelines, circulars, and policies related to the constitution.",
      "en.bidhan.published": "Published",

      // Nepali
      "np.common.home": "गृहपृष्ठ",
      "np.bidhan.title": "विधान",
      "np.bidhan.currentVersion": "वर्तमान संस्करण",
      "np.bidhan.heroTitle": "राष्ट्रिय युवा संघ नेपालको आधिकारिक विधान",
      "np.bidhan.heroDescription": "राष्ट्रिय युवा संघ नेपालको सिद्धान्त, सांगठनिक संरचना र कार्यसञ्चालन निर्देशिकाहरू रूपरेखा गर्ने सर्वोच्च मार्गदर्शक दस्तावेज।",
      "np.bidhan.effectiveDate": "लागू मिति:",
      "np.bidhan.publishedDate": "प्रकाशित मिति:",
      "np.bidhan.readOnline": "विधान पढ्नुहोस्",
      "np.bidhan.downloadPdf": "PDF डाउनलोड",
      "np.bidhan.versionHistory": "संस्करण इतिहास",
      "np.bidhan.stats.chapters": "जम्मा परिच्छेद",
      "np.bidhan.stats.articles": "जम्मा धारा",
      "np.bidhan.stats.documents": "आधिकारिक दस्तावेज",
      "np.bidhan.stats.amendments": "संशोधनहरू",
      "np.bidhan.tabs.reader": "डिजिटल विधान",
      "np.bidhan.tabs.documents": "आधिकारिक दस्तावेज",
      "np.bidhan.tabs.versions": "संस्करणहरू",
      "np.bidhan.tabs.amendments": "संशोधनहरू",
      "np.bidhan.searchContents": "परिच्छेद, धाराहरू खोज्नुहोस्...",
      "np.bidhan.tableOfContents": "विषयसूची",
      "np.bidhan.chapter": "परिच्छेद",
      "np.bidhan.selectArticle": "पढ्नको लागि एउटा धारा चयन गर्नुहोस्।",
      "np.bidhan.previous": "अघिल्लो",
      "np.bidhan.previousArticle": "अघिल्लो धारा",
      "np.bidhan.next": "अर्को",
      "np.bidhan.nextArticle": "अर्को धारा",
      "np.bidhan.readingTools": "पठन सामग्री",
      "np.bidhan.lightMode": "उज्यालो मोड",
      "np.bidhan.darkMode": "अँध्यारो मोड",
      "np.bidhan.printDocument": "कागजात छाप्नुहोस्",
      "np.bidhan.share": "साझेदारी",
      "np.bidhan.copyLink": "लिङ्क प्रतिलिपि गर्नुहोस्",
      "np.bidhan.shareSocial": "सामाजिक सञ्जालमा साझा गर्नुहोस्",
      "np.bidhan.linkCopied": "क्लिपबोर्डमा लिङ्क प्रतिलिपि गरियो!",
      "np.bidhan.officialDocuments": "आधिकारिक दस्तावेज",
      "np.bidhan.officialDocumentsDesc": "आधिकारिक संवैधानिक कागजातहरू ब्राउज गर्नुहोस् र डाउनलोड गर्नुहोस्।",
      "np.bidhan.searchDocuments": "कागजातहरू खोज्नुहोस्...",
      "np.bidhan.noDocumentsFound": "कुनै कागजात फेला परेन",
      "np.bidhan.tryAdjustingSearch": "आफ्नो खोज मापदण्ड समायोजन गर्ने प्रयास गर्नुहोस्।",
      "np.bidhan.download": "डाउनलोड",
      "np.bidhan.versionHistoryDesc": "समयको साथ विधानको विकास ट्र्याक गर्नुहोस्।",
      "np.bidhan.current": "वर्तमान",
      "np.bidhan.version": "संस्करण",
      "np.bidhan.viewChanges": "पूर्ण परिवर्तनहरू हेर्नुहोस्",
      "np.bidhan.amendments": "संशोधनहरू",
      "np.bidhan.amendmentsDesc": "विधानमा गरिएका सबै परिवर्तनहरूको विस्तृत रेकर्ड।",
      "np.bidhan.affectedChapters": "प्रभावित परिच्छेदहरू:",
      "np.bidhan.viewOriginalDoc": "मूल कागजात हेर्नुहोस्",
      "np.bidhan.expandDetails": "विवरण विस्तार गर्नुहोस्",
      "np.bidhan.relatedResources": "सम्बन्धित स्रोतहरू",
      "np.bidhan.relatedResourcesDesc": "विधानसँग सम्बन्धित निर्देशिका, परिपत्र, र नीतिहरू अन्वेषण गर्नुहोस्।",
      "np.bidhan.published": "प्रकाशित",
    };
    return translations[`${locale}.${key}`] || translations[`en.${key}`] || key;
  };

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    constitution: null,
    documents: [],
    resources: []
  });
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [constRes, docRes] = await Promise.all([
        getActiveConstitutionAction(),
        getDocumentsAction()
      ]);

      const cData = constRes.success ? constRes.data : null;
      const dData = docRes.success ? docRes.data : [];

      setData({
        constitution: cData,
        documents: dData,
        resources: []
      });

      setLoading(false);
    };
    loadData();
  }, [locale]);

  // Handle direct file download via server-side proxy (bypasses CORS on mobile)
  const handleDownload = (url, filename) => {
    if (!url) {
      toast.error(t("bidhan.noDocumentsFound") || "No document available to download.");
      return;
    }
    const proxyUrl = `/api/proxy-download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename || "document.pdf")}`;
    const a = document.createElement("a");
    a.href = proxyUrl;
    a.download = filename || "document.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const getViewerUrl = (url) => {
    if (!url) return "";
    if (url.includes("drive.google.com")) {
      return url.replace(/\/view.*$/, "/preview");
    }
    // For GCS or direct PDF links, embed through Google Docs viewer
    return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
  };

  if (loading) {
    return (
      <main className="flex flex-col min-h-screen bg-white dark:bg-slate-950 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </main>
    );
  }

  if (!data.constitution) {
    return (
      <main className="flex flex-col min-h-screen bg-white dark:bg-slate-950 items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Active Constitution</h2>
          <p className="text-slate-500">The constitution data is currently unavailable.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      <HeroSection
        t={t}
        locale={locale}
        version={data.constitution.currentVersion || data.constitution.version || "N/A"}
        effectiveDate={data.constitution.effectiveDate ? new Date(data.constitution.effectiveDate).toISOString().split('T')[0] : "N/A"}
        publishedDate={data.constitution.publishedDate ? new Date(data.constitution.publishedDate).toISOString().split('T')[0] : "N/A"}
        onReadClick={() => {
          if (data.documents.length > 0) {
            setPdfViewerOpen(true);
          } else {
            toast.error(t("bidhan.noDocumentsFound") || "No document available to read.");
          }
        }}
        onDownloadClick={() => {
          if (data.documents.length > 0) {
            handleDownload(data.documents[0].driveUrl, data.documents[0].title?.[locale] || "Constitution_Document");
          } else {
            toast.error(t("bidhan.noDocumentsFound") || "No document available to download.");
          }
        }}
      />
      
      {/* Inline PDF Viewer Dialog */}
      {data.documents.length > 0 && (
        <Dialog open={pdfViewerOpen} onOpenChange={setPdfViewerOpen}>
          <DialogContent className="sm:max-w-[1400px] w-[95vw] h-[95vh] md:h-[90vh] p-0 overflow-hidden flex flex-col rounded-xl">
            <DialogHeader className="p-3 md:p-4 border-b bg-white dark:bg-slate-950 flex-shrink-0">
              <DialogTitle className="text-base md:text-lg font-bold pr-6">
                {data.documents[0].title?.[locale] || data.documents[0].title?.en}
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 w-full bg-slate-100 dark:bg-slate-900">
              {data.documents[0].driveUrl ? (
                <iframe 
                  src={getViewerUrl(data.documents[0].driveUrl)} 
                  className="w-full h-full border-0" 
                  title={data.documents[0].title?.[locale] || "Document viewer"}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-500">
                  No document URL available.
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      <RelatedResources 
        t={t} 
        locale={locale} 
        resources={data.resources} 
      />
    </main>
  );
}
