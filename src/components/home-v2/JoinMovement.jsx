"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users } from "lucide-react";

export default function JoinMovement() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Background parallax/zoom
    gsap.fromTo(
      ".join-bg",
      { scale: 1 },
      {
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // Content reveal sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center+=100",
        toggleActions: "play none none reverse",
      },
      defaults: { ease: "power4.out" }
    });

    tl.from(".join-label", { y: 20, opacity: 0, duration: 0.8 })
      .from(".join-heading", { y: 40, opacity: 0, duration: 1 }, "-=0.6")
      .from(".join-desc", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(".join-cta a", { y: 20, opacity: 0, duration: 0.8, stagger: 0.15 }, "-=0.6");
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      aria-labelledby="join-heading"
      className="bg-[#0D2E78] py-16 md:py-20 lg:py-24 relative overflow-hidden"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image 
          src="/v2/4.png" 
          alt="Join NYFN Gandaki" 
          fill 
          className="join-bg object-cover opacity-20 mix-blend-overlay will-change-transform"
          sizes="100vw"
        />
      </div>

      {/* Decorative large numeral watermark */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 text-[300px] font-extrabold text-white/[0.03] leading-none select-none pointer-events-none -mr-16"
      >
        YSN
      </div>

      {/* Diagonal accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-1 h-full bg-[#D71920]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Label */}
          <div className="join-label inline-flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-[#D71920] flex items-center justify-center">
              <Users className="w-4 h-4 text-white" strokeWidth={2} />
            </div>
            <span className="text-white/60 text-xs font-bold uppercase tracking-[0.25em]">
              Join the Movement
            </span>
          </div>

          {/* Headline */}
          <h2
            id="join-heading"
            className="join-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6"
          >
            Be part of something{" "}
            <span className="text-[#D71920]">bigger.</span>
          </h2>

          {/* Description */}
          <p className="join-desc text-white/60 text-base sm:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
            NYFN Gandaki is where youth become leaders. Whether you are a
            student, a professional, or a community worker — there is a place
            for you in this movement.
          </p>

          {/* CTA Buttons */}
          <div className="join-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/en/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[#0D2E78] hover:bg-[#F8FAFC] font-extrabold rounded-full transition-colors duration-200 text-base cursor-pointer w-full sm:w-auto"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/en/committees/executive"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-transparent border border-white/30 text-white hover:bg-white/10 font-bold rounded-full transition-colors duration-200 text-base cursor-pointer w-full sm:w-auto"
            >
              View Our Committee
            </Link>
          </div>

          {/* Trust footnote */}
          <p className="mt-10 text-white/25 text-xs font-medium uppercase tracking-widest">
            Serving Gandaki Province since 2006 · राष्ट्रिय युवा संघ नेपाल
          </p>
        </div>
      </div>
    </section>
  );
}
