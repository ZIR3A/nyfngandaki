"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function GSAPRegistry() {
  useLayoutEffect(() => {
    // Register plugins once globally
    gsap.registerPlugin(useGSAP, ScrollTrigger);

    // Optional: Global defaults for smoother feel across the whole site
    gsap.defaults({
      ease: "power3.out",
      duration: 1
    });
    
    // Refresh ScrollTrigger after a slight delay to ensure all DOM elements and images are parsed
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);
    
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return null;
}
