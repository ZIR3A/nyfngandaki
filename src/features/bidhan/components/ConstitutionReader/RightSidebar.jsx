import React from "react";
import { 
  ZoomIn, 
  ZoomOut, 
  Printer, 
  Share2, 
  Link as LinkIcon, 
  Moon, 
  Sun 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { toast } from "sonner"; // Assuming sonner is used for toasts, standard in modern setups like shadcn

export default function RightSidebar({ t }) {
  const { theme, setTheme } = useTheme();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(t("bidhan.linkCopied") || "Link copied to clipboard!");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <aside className="w-64 flex-shrink-0 hidden xl:block h-[calc(100vh-140px)] sticky top-36 border-l border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-4 overflow-y-auto no-scrollbar">
      {/* Reading Tools */}
      <div className="mb-8">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
          {t("bidhan.readingTools") || "Reading Tools"}
        </h3>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl bg-white dark:bg-slate-950">
              <ZoomOut className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </Button>
            <div className="flex-1 text-center text-sm text-slate-600 dark:text-slate-400 font-medium">
              A
            </div>
            <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl bg-white dark:bg-slate-950">
              <ZoomIn className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full justify-start rounded-xl bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 mr-3" />
            ) : (
              <Moon className="w-4 h-4 mr-3" />
            )}
            {theme === "dark" 
              ? (t("bidhan.lightMode") || "Light Mode")
              : (t("bidhan.darkMode") || "Dark Mode")}
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start rounded-xl bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            onClick={handlePrint}
          >
            <Printer className="w-4 h-4 mr-3" />
            {t("bidhan.printDocument") || "Print Document"}
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
          {t("bidhan.share") || "Share"}
        </h3>
        <div className="space-y-2">
          <Button 
            variant="outline" 
            className="w-full justify-start rounded-xl bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            onClick={handleCopyLink}
          >
            <LinkIcon className="w-4 h-4 mr-3" />
            {t("bidhan.copyLink") || "Copy Link"}
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start rounded-xl bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
          >
            <Share2 className="w-4 h-4 mr-3" />
            {t("bidhan.shareSocial") || "Share to Socials"}
          </Button>
        </div>
      </div>
    </aside>
  );
}
