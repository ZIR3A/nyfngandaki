import React, { useState } from "react";
import { FileText, Download, Eye, Search, File as FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function OfficialDocuments({ t, locale, documents }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoc, setSelectedDoc] = useState(null);

  const filteredDocuments = documents.filter((doc) =>
    doc.title[locale].toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFormatIcon = (format = "") => {
    switch (format.toLowerCase()) {
      case "pdf":
        return <FileText className="w-8 h-8 text-red-500" />;
      case "docx":
      case "doc":
        return <FileIcon className="w-8 h-8 text-blue-500" />;
      default:
        return <FileIcon className="w-8 h-8 text-slate-500" />;
    }
  };

  const getViewerUrl = (url) => {
    if (!url) return "";
    if (url.includes("drive.google.com")) {
      return url.replace(/\/view.*$/, "/preview");
    }
    // For direct PDF links (like Google Cloud Storage), use the Google Docs embed viewer
    // which provides a reliable cross-browser PDF reading experience
    return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
  };

  const handleDownload = (url, filename) => {
    if (!url) return;
    // Route through server-side proxy to bypass mobile CORS restrictions
    const proxyUrl = `/api/proxy-download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename || "document.pdf")}`;
    const a = document.createElement("a");
    a.href = proxyUrl;
    a.download = filename || "document.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };


  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {t("bidhan.officialDocuments") || "Official Documents"}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            {t("bidhan.officialDocumentsDesc") || "Browse and download official constitutional documents."}
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={t("bidhan.searchDocuments") || "Search documents..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      {filteredDocuments.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
          <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">
            {t("bidhan.noDocumentsFound") || "No documents found"}
          </h3>
          <p className="text-slate-500 dark:text-slate-400">
            {t("bidhan.tryAdjustingSearch") || "Try adjusting your search criteria."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDocuments.map((doc) => (
            <div
              key={doc._id || Math.random()}
              className="flex flex-col bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  {getFormatIcon(doc.fileType)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs bg-slate-50 dark:bg-slate-900">
                      {doc.categoryId?.name?.[locale] || "General"}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      v{doc.version || "1.0"}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2">
                    {doc.title?.[locale]}
                  </h3>
                </div>
              </div>
              
              <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-6 gap-4">
                <span>{format(new Date(doc.publishDate || doc.createdAt || new Date()), "MMM d, yyyy")}</span>
                <span>•</span>
                <span>{doc.fileSize || "Unknown size"}</span>
                <span>•</span>
                <span className="uppercase">{doc.docLanguage || "BOTH"}</span>
              </div>

              <div className="mt-auto flex gap-3">
                <Button className="flex-1 rounded-xl group/btn" variant="outline" onClick={() => doc.driveUrl && setSelectedDoc(doc)}>
                  <Eye className="w-4 h-4 mr-2 text-slate-400 group-hover/btn:text-primary transition-colors" />
                  {t("bidhan.readOnline") || "Read"}
                </Button>
                <Button className="flex-1 rounded-xl group/btn" variant="outline" onClick={() => handleDownload(doc.driveUrl, doc.title?.[locale] || "Constitution_Document")}>
                  <Download className="w-4 h-4 mr-2 text-slate-400 group-hover/btn:text-primary transition-colors" />
                  {t("bidhan.download") || "Download"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Inline PDF Viewer Dialog */}
      <Dialog open={!!selectedDoc} onOpenChange={(open) => !open && setSelectedDoc(null)}>
        <DialogContent className="sm:max-w-[1400px] w-[95vw] h-[95vh] md:h-[90vh] p-0 overflow-hidden flex flex-col rounded-xl">
          <DialogHeader className="p-3 md:p-4 border-b bg-white dark:bg-slate-950 flex-shrink-0">
            <DialogTitle className="text-base md:text-lg font-bold pr-6">
              {selectedDoc?.title?.[locale] || selectedDoc?.title?.en}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 w-full bg-slate-100 dark:bg-slate-900">
            {selectedDoc?.driveUrl ? (
              <iframe 
                src={getViewerUrl(selectedDoc.driveUrl)} 
                className="w-full h-full border-0" 
                title={selectedDoc?.title?.[locale] || "Document viewer"}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500">
                No document URL available.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
