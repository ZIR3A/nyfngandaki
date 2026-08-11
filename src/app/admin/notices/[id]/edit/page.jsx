import { NoticeForm } from "@/features/notices/components/NoticeForm";
import { NoticeService } from "@/services/NoticeService";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Notice | Admin CRM",
};

export default async function EditNoticePage({ params }) {
  const { id } = await params;
  
  const notice = await NoticeService.getById(id);
  
  if (!notice) {
    notFound();
  }

  return (
    <div className="p-6 max-w-[1200px] mx-auto">

      <NoticeForm initialData={notice} />
    </div>
  );
}
