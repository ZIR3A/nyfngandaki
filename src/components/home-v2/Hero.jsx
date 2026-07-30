"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const badgeRef = useRef(null);
  const headlineRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);

  useGSAP(() => {
    // 1. Initial Load Animations
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Ensure elements start invisible
    gsap.set([badgeRef.current, headlineRef.current, contentRef.current, ctaRef.current, statsRef.current, scrollIndicatorRef.current], { 
      opacity: 0,
      y: 30
    });

    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 1, delay: 0.2 })
      .to(headlineRef.current, { opacity: 1, y: 0, duration: 1 }, "-=0.6")
      .to(contentRef.current, { opacity: 1, y: 0, duration: 1 }, "-=0.6")
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 1 }, "-=0.6")
      .to(statsRef.current, { opacity: 1, y: 0, duration: 1 }, "-=0.6")
      .to(scrollIndicatorRef.current, { opacity: 1, y: 0, duration: 1 }, "-=0.6");

    // 2. Scroll-driven Animations
    // Background scaling while scrolling down
    gsap.to(bgRef.current, {
      scale: 1.08,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col bg-[#081224] overflow-hidden"
      aria-label="NYFN Gandaki Province — Hero"
    >
      {/* Background Image Layer */}
      <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform">
        <Image
          src="/v2/1.png"
          alt="NYFN Gandaki Province — Youth Leadership"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#081224]/95 via-[#081224]/75 to-[#081224]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081224] via-transparent to-[#081224]/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 py-32 lg:py-40">
          <div className="max-w-3xl">

            {/* Organization badge */}
            <div ref={badgeRef} className="inline-flex items-center gap-3 mb-8">
              <div className="relative h-10 w-10 shrink-0">
                <Image
                  src="/brand-logo.png"
                  alt="NYFN Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="h-6 w-px bg-white/30" />
              <span className="text-white/70 text-xs sm:text-sm font-bold uppercase tracking-[0.2em]">
                National Youth Federation Nepal
              </span>
            </div>

            {/* Main headline */}
            <h1 ref={headlineRef} className="text-[42px] sm:text-6xl lg:text-7xl xl:text-[80px] font-extrabold text-white leading-[1.05] tracking-tight mb-6">
              Youth Leadership{" "}
              <span className="block text-[#D71920]">for Nepal.</span>
            </h1>

            {/* Sub-tagline */}
            <p ref={contentRef} className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-xl mb-10">
              The Gandaki Province Committee of the National Youth Federation
              Nepal — uniting over 2,500 members across 11 districts in the
              pursuit of democratic values and social progress.
            </p>

            {/* CTA row */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/en/committees/executive"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1546B0] hover:bg-[#0D2E78] text-white font-bold rounded-full transition-colors duration-200 cursor-pointer text-sm sm:text-base"
              >
                View Province Committee
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/en/events"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/30 hover:bg-white/10 text-white font-bold rounded-full transition-colors duration-200 cursor-pointer text-sm sm:text-base"
              >
                Explore Events
              </Link>
            </div>

            {/* Horizontal stats strip */}
            <div ref={statsRef} className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { value: "2,500+", label: "Active Members" },
                { value: "11", label: "Districts" },
                { value: "85+", label: "Committees" },
                { value: "230+", label: "Programs Hosted" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl sm:text-4xl font-extrabold text-white leading-none">
                    {stat.value}
                  </p>
                  <p className="text-white/50 text-xs sm:text-sm font-medium mt-1 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndicatorRef} className="relative z-10 flex justify-center pb-8">
        <div className="flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs font-medium uppercase tracking-[0.2em]">
            Scroll
          </span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </section>
  );
}
