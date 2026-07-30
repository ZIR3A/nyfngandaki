"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Intro from "./Intro";
import StickySection from "./StickySection";
import Background from "./Background";
import Overlay from "./Overlay";
import ProgressIndicator from "./ProgressIndicator";
import ValueContent from "./ValueContent";
import ValueNumber from "./ValueNumber";
import ValueTitle from "./ValueTitle";
import ValueDescription from "./ValueDescription";

const VALUES = [
  {
    id: "value-1",
    number: "01",
    title: "Innovation",
    subtitle: "Pioneering the future.",
    description: "We embrace modern solutions, encouraging youth to pioneer new ideas in technology, policy, and community building.",
    align: "left"
  },
  {
    id: "value-2",
    number: "02",
    title: "Leadership",
    subtitle: "Empowering others.",
    description: "True power lies in empowering others. We develop leaders who serve with integrity, vision, and deep humility.",
    align: "right"
  },
  {
    id: "value-3",
    number: "03",
    title: "Unity",
    subtitle: "Strength in diversity.",
    description: "Strength in numbers, power in diversity. We bridge divides across Gandaki to unite our generation under a common goal.",
    align: "left"
  },
  {
    id: "value-4",
    number: "04",
    title: "Service",
    subtitle: "Dedication to the people.",
    description: "To lead is to serve. Our foundation is built upon active community engagement and unwavering dedication to the people.",
    align: "right"
  }
];

export default function CoreValues() {
  const [activeValueIndex, setActiveValueIndex] = useState(0);
  const containerRef = useRef(null);
  const contentWrapperRef = useRef(null);
  
  // Refs for tracking state inside GSAP without causing re-renders/trigger destruction
  const activeIndexRef = useRef(0);
  const isAnimating = useRef(false);

  useGSAP(() => {
    // ScrollTrigger to scrub through the 400vh container and swap values
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const progress = self.progress;
        let newIndex = Math.floor(progress * VALUES.length);
        
        // Edge case safety
        if (newIndex >= VALUES.length) newIndex = VALUES.length - 1;
        if (newIndex < 0) newIndex = 0;
        
        if (newIndex !== activeIndexRef.current && !isAnimating.current) {
          isAnimating.current = true;
          activeIndexRef.current = newIndex;
          
          // 1. Fade out, blur, and scale up the current value
          gsap.to(contentWrapperRef.current, {
            opacity: 0,
            scale: 1.05,
            filter: "blur(12px)",
            duration: 0.3,
            ease: "power3.out",
            onComplete: () => {
              // 2. Swap the React state to render the next value
              setActiveValueIndex(newIndex);
              
              // 3. Fade in, unblur, and scale down the new value
              gsap.fromTo(contentWrapperRef.current, 
                { opacity: 0, scale: 0.95, filter: "blur(12px)" },
                { 
                  opacity: 1, 
                  scale: 1, 
                  filter: "blur(0px)", 
                  duration: 0.4, 
                  ease: "power3.out",
                  onComplete: () => { isAnimating.current = false; } 
                }
              );
            }
          });
        }
      }
    });
  }, { scope: containerRef });
  
  const activeValue = VALUES[activeValueIndex];

  return (
    <section
      aria-labelledby="core-values-heading"
      className="relative w-full bg-[#081224]"
    >
      <h2 id="core-values-heading" className="sr-only">
        Our Core Values
      </h2>

      {/* 
        1. Intro Section 
        Stands alone before the sticky pinned area.
      */}
      <Intro />

      {/* 
        2. Massive 400vh Scroll Container
        This will allow the user to scroll for 4 viewports 
        while the StickySection remains pinned.
      */}
      <div ref={containerRef} className="relative w-full h-[400vh]">
        <StickySection>
          <Background />
          <Overlay />

          {/* 
            Render ONLY the active value based on state. 
            GSAP animates the wrapper in and out smoothly on state change.
          */}
          <div ref={contentWrapperRef} className="absolute inset-0 z-20 pointer-events-auto">
            <ValueContent id={activeValue.id} align={activeValue.align} zIndex={20}>
              <ValueNumber number={activeValue.number} />
              <ValueTitle title={activeValue.title} subtitle={activeValue.subtitle} />
              <ValueDescription>
                {activeValue.description}
              </ValueDescription>
            </ValueContent>
          </div>

          <ProgressIndicator current={activeValueIndex + 1} total={VALUES.length} />
        </StickySection>
      </div>
      
      {/* 
        Smooth blend into Organization Structure section.
      */}
      <div className="w-full h-48 bg-gradient-to-b from-[#081224] to-[#F8FAFC] dark:to-[#081224]" />
    </section>
  );
}
