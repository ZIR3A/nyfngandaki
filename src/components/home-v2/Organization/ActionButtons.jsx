import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function ActionButtons({ districtSlug }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-10">
      <Link
        href={`/en/districts/${districtSlug}`}
        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1546B0] hover:bg-[#0D2E78] text-white font-bold rounded-full transition-colors duration-200 cursor-pointer text-sm shadow-sm"
      >
        View District Committee
        <ArrowRight className="w-4 h-4" />
      </Link>
      <Link
        href="/en/members"
        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent border border-white/20 hover:bg-white/5 text-white font-bold rounded-full transition-colors duration-200 cursor-pointer text-sm"
      >
        Explore Members
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
