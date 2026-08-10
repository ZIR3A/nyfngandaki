import { NoticeForm } from "@/features/notices/components/NoticeForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = {
  title: "Create Notice | Admin CRM",
};

export default function CreateNoticePage() {
  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="mb-8">
        <Link 
          href="/admin/notices" 
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-4 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Notices
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create Notice</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Create a new announcement for the public website.</p>
      </div>

      <NoticeForm />
    </div>
  );
}
