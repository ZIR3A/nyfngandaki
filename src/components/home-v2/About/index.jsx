"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Background from "./Background";
import Image from "./Image";
import Content from "./Content";

export default function About() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Image Parallax (Targeting the img inside the Image component)
    gsap.fromTo(
      "img",
      { yPercent: 20, scale: 1.1 },
      {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // 2. Content Reveal Sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center+=100",
        toggleActions: "play none none reverse",
      },
      defaults: { ease: "power3.out" }
    });

    // Heading fade upward
    tl.from("h2", { y: 50, opacity: 0, duration: 1 })
      // Description slide upward (targets both p tags)
      .from("p", { y: 30, opacity: 0, duration: 1, stagger: 0.15 }, "-=0.7")
      // Buttons stagger reveal (targets the Link a tags)
      .from("a", { y: 20, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.8");
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      aria-labelledby="about-heading"
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <Background />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 py-16 md:py-20 lg:py-24 h-full">
        {/* Two-column layout on desktop, stacked on mobile */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 h-full items-stretch">
          {/* Left: Large cinematic image */}
          <div className="order-1 lg:order-1 flex flex-col h-full">
            <Image />
          </div>

          {/* Right: Editorial content */}
          <div className="order-2 lg:order-2 flex flex-col h-full">
            <Content />
          </div>
        </div>
      </div>
    </section>
  );
}
