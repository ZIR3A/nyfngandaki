"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ScrollProgress() {
  const progressRef = useRef(null);

  useGSAP(() => {
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Page scroll progress"
      className="fixed top-0 left-0 z-[9999] w-full h-[3px] bg-black/20 dark:bg-white/10 pointer-events-none"
    >
      <div
        ref={progressRef}
        className="w-full h-full bg-[#D71920] origin-left scale-x-0"
      />
    </div>
  );
}
