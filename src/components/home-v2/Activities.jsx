"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ArrowRight, BookOpen, Mic2, HandHelping } from "lucide-react";

const programAreas = [
  {
    icon: BookOpen,
    tag: "Education & Advocacy",
    title: "Youth Policy & Civic Education",
    description:
      "NYFN Gandaki runs province-wide civic education programs, training youth on constitutional rights, democratic participation, and policy advocacy. Our workshops have reached over 800 young people in the past year alone.",
    stat: "800+",
    statSub: "This year",
    color: "#1546B0",
    href: "/en/events",
  },
  {
    icon: Mic2,
    tag: "Leadership Development",
    title: "Provincial Leadership Summits",
    description:
      "Annual leadership summits bring together district committee leaders from across all 11 districts for strategic planning, skills development, and cross-district coordination. A platform for the next generation of Gandaki's leaders.",
    stat: "11",
    statSub: "Represented",
    color: "#D71920",
    href: "/en/events",
  },
  {
    icon: HandHelping,
    tag: "Community Service",
    title: "Social Mobilization Programs",
    description:
      "From disaster relief to environmental campaigns, NYFN Gandaki members mobilize thousands of volunteer hours annually across municipalities and wards — building a culture of service at the grassroots level.",
    stat: "5,000+",
    statSub: "Volunteer Hours",
    color: "#0D2E78",
    href: "/en/events",
  },
];

export default function Activities() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center+=100",
        toggleActions: "play none none reverse",
      },
      defaults: { ease: "power4.out" }
    });

    tl.from(".activities-header", { y: 40, opacity: 0, duration: 1 })
      .from(".activity-card", { y: 50, opacity: 0, duration: 0.8, stagger: 0.15 }, "-=0.6")
      .from(".activities-cta", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4");
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      aria-labelledby="activities-heading"
      className="bg-[#F8FAFC] dark:bg-[#081224] py-16 md:py-20 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="activities-header max-w-2xl mb-16">
          <span className="text-[#1546B0] text-xs font-bold uppercase tracking-[0.25em] mb-4 block">
            What We Do
          </span>
          <h2
            id="activities-heading"
            className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] dark:text-white leading-tight tracking-tight mb-4"
          >
            Programs that make a difference.
          </h2>
          <p className="text-[#475569] dark:text-[#94A3B8] text-base sm:text-lg leading-relaxed">
            Three core program areas that define how NYFN Gandaki serves its
            members and communities across the province.
          </p>
        </div>

        {/* Program cards — editorial magazine layout */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {programAreas.map((program, idx) => {
            const Icon = program.icon;
            return (
              <article
                key={program.title}
                className="activity-card bg-white dark:bg-[#0E1B34] rounded-3xl border border-[#E5E7EB] dark:border-[#22314D] overflow-hidden flex flex-col group hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-shadow duration-300"
              >
                {/* Top color band */}
                <div
                  className="h-1 w-full"
                  style={{ backgroundColor: program.color }}
                />

                <div className="p-8 sm:p-10 flex flex-col flex-1">
                  {/* Icon + tag row */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${program.color}15` }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: program.color }}
                        strokeWidth={2}
                      />
                    </div>
                    <span
                      className="text-xs font-bold uppercase tracking-[0.15em]"
                      style={{ color: program.color }}
                    >
                      {program.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] dark:text-white leading-tight tracking-tight mb-4">
                    {program.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#475569] dark:text-[#94A3B8] text-sm sm:text-base leading-relaxed mb-8 flex-1">
                    {program.description}
                  </p>

                  {/* Stat + CTA row */}
                  <div className="flex items-end justify-between pt-6 border-t border-[#E5E7EB] dark:border-[#22314D]">
                    <div>
                      <p
                        className="text-2xl font-extrabold leading-none"
                        style={{ color: program.color }}
                      >
                        {program.stat}
                      </p>
                      <p className="text-[#6B7280] dark:text-[#64748B] text-xs font-medium mt-1">
                        {program.statSub}
                      </p>
                    </div>

                    <Link
                      href={program.href}
                      className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:gap-4 transition-all duration-200 cursor-pointer"
                      style={{ color: program.color }}
                    >
                      Learn More
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* View all events CTA */}
        <div className="activities-cta mt-12 text-center">
          <Link
            href="/en/events"
            className="inline-flex items-center gap-2 px-8 py-4 border border-[#1546B0] text-[#1546B0] dark:text-blue-400 dark:border-blue-400 font-bold rounded-full hover:bg-[#1546B0] hover:text-white dark:hover:bg-blue-400 dark:hover:text-white transition-colors duration-200 text-sm cursor-pointer"
          >
            View All Programs & Events
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
