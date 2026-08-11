import { NoticeForm } from "@/features/notices/components/NoticeForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = {
  title: "Create Notice | Admin CRM",
};

export default function CreateNoticePage() {
  return (
    <div className="p-6 max-w-[1200px] mx-auto">

      <NoticeForm />
    </div>
  );
}
