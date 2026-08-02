import { Facebook, Twitter, Link as LinkIcon } from "lucide-react";

export default function ShareButtons() {
  return (
    <div className="flex gap-2">
      <button className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full hover:bg-blue-100 hover:text-[#1546B0] transition-colors">
        <Facebook className="w-5 h-5" />
      </button>
      <button className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full hover:bg-blue-100 hover:text-[#1546B0] transition-colors">
        <Twitter className="w-5 h-5" />
      </button>
      <button className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full hover:bg-blue-100 hover:text-[#1546B0] transition-colors">
        <LinkIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
