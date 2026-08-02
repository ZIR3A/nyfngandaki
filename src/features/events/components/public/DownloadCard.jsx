import { Download } from "lucide-react";

export default function DownloadCard({ title, size }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
      <div>
        <h4 className="font-semibold text-slate-900 dark:text-white">{title || "Document Title"}</h4>
        <p className="text-xs text-slate-500">{size || "2.4 MB PDF"}</p>
      </div>
      <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 hover:text-[#1546B0] transition-colors">
        <Download className="w-5 h-5" />
      </button>
    </div>
  );
}
