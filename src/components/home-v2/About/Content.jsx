import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function Content() {
  return (
    <div className="flex flex-col justify-center h-full max-w-xl xl:max-w-2xl py-12 lg:py-24">
      {/* Section label */}
      <div className="mb-6 lg:mb-8">
        <span className="text-[#1546B0] dark:text-[#4F84F6] text-xs font-bold uppercase tracking-[0.25em]">
          Who We Are
        </span>
      </div>

      {/* Heading */}
      <h2
        id="about-heading"
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] dark:text-white leading-[1.1] tracking-tight mb-8"
      >
        Gandaki&apos;s <span className="text-[#1546B0]">youth voice</span>{" "}
        since 2006.
      </h2>

      {/* Short introduction */}
      <p className="text-lg sm:text-xl text-[#0F172A] dark:text-[#E2E8F0] font-medium leading-relaxed mb-6">
        The National Youth Federation Nepal (NYFN) — Gandaki Province Committee
        is the official provincial body of Nepal's largest youth organization,
        representing the aspirations of over 2,500 young men and women.
      </p>

      {/* Mission summary */}
      <p className="text-base sm:text-lg text-[#475569] dark:text-[#94A3B8] leading-relaxed mb-12">
        From the mountain peaks of Manang and Mustang to the fertile valleys of
        Kaski and Syangja, we unite youth under a shared vision of democratic
        values, social justice, and economic prosperity. We are a movement
        rooted in community, driven by purpose, and guided by the belief that
        empowered youth transform nations.
      </p>

      {/* Two CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/en/about"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1546B0] hover:bg-[#0D2E78] text-white font-bold rounded-full transition-colors duration-200 cursor-pointer text-sm sm:text-base shadow-sm"
        >
          Read Our History
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/en/organization"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155] hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A] text-[#0F172A] dark:text-white font-bold rounded-full transition-colors duration-200 cursor-pointer text-sm sm:text-base shadow-sm"
        >
          View Structure
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
