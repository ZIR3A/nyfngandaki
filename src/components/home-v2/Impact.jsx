"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const impactStats = [
  {
    value: "2,500+",
    label: "Active Members",
    subtext: "Across all 11 districts",
  },
  {
    value: "85+",
    label: "Committees",
    subtext: "Province, District & Local",
  },
  {
    value: "230+",
    label: "Programs Hosted",
    subtext: "Youth development initiatives",
  },
  {
    value: "11",
    label: "Districts Covered",
    subtext: "Entire Gandaki Province",
  },
];

export default function Impact() {
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

    tl.from(".impact-heading", { y: 30, opacity: 0, duration: 1 })
      .from(".impact-card", { y: 40, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.6");
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      aria-labelledby="impact-heading"
      className="bg-[#081224] py-16 md:py-20 lg:py-24 overflow-hidden relative"
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="impact-heading text-center mb-16 lg:mb-20">
          <span className="text-white/40 text-xs font-bold uppercase tracking-[0.25em] mb-4 block">
            Our Impact
          </span>
          <h2
            id="impact-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight"
          >
            Numbers that speak.
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-3xl overflow-hidden border border-white/10">
          {impactStats.map((stat, idx) => (
            <div
              key={stat.label}
              className="impact-card relative bg-[#081224] px-8 py-12 sm:py-16 flex flex-col items-center text-center group hover:bg-[#0E1B34] transition-colors duration-200"
            >
              {/* Large numeral */}
              <p className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-none mb-3 tracking-tight">
                {stat.value}
              </p>

              {/* Accent dot */}
              <div className="w-1.5 h-1.5 rounded-full bg-[#D71920] mb-3" />

              {/* Label */}
              <p className="text-white/80 font-bold text-sm sm:text-base mb-1.5">
                {stat.label}
              </p>
              <p className="text-white/35 text-xs sm:text-sm font-medium">
                {stat.subtext}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom annotation */}
        <p className="text-center text-white/25 text-xs font-medium mt-8 uppercase tracking-widest">
          NYFN Gandaki Province — Annual Report 2024
        </p>
      </div>
    </section>
  );
}
