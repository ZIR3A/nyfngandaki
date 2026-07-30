"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import StickyContainer from "./StickyContainer";
import Background from "./Background";
import Overlay from "./Overlay";
import VisionBlock from "./VisionBlock";
import MissionBlock from "./MissionBlock";
import LeadershipBlock from "./LeadershipBlock";
import DevelopmentBlock from "./DevelopmentBlock";

export default function VisionMission() {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    // Select all the blocks inside the container
    const blocks = gsap.utils.toArray(".vm-block");
    
    // Ensure all blocks except the first one are hidden initially
    gsap.set(blocks.slice(1), { opacity: 0, y: 50, scale: 0.95, filter: "blur(10px)" });
    gsap.set(blocks[0], { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" });

    // Create a timeline that scrubs through the 400vh container
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    // Sequence the transitions
    blocks.forEach((block, i) => {
      if (i > 0) {
        // Fade out previous block
        tl.to(blocks[i - 1], { 
          opacity: 0, 
          y: -50, 
          scale: 1.05, 
          filter: "blur(10px)",
          duration: 1 
        }, `+=0.5`); // add a small pause before transitioning

        // Fade in current block
        tl.to(block, { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          filter: "blur(0px)",
          duration: 1 
        }, "<0.5"); // start slightly after the previous starts fading out
      }
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      aria-labelledby="vision-mission-heading"
      className="relative w-full h-[400vh] bg-[#081224]"
    >
      <h2 id="vision-mission-heading" className="sr-only">
        Our Vision and Mission
      </h2>

      <StickyContainer>
        <Background />
        <Overlay />

        {/* 
          Absolutely position the blocks on top of each other inside the sticky container.
          GSAP will handle the crossfades as you scroll down the 400vh wrapper.
        */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
          <div className="relative w-full h-full">
            <div className="vm-block absolute inset-0 w-full h-full pointer-events-auto">
              <VisionBlock />
            </div>
            <div className="vm-block absolute inset-0 w-full h-full pointer-events-auto">
              <MissionBlock />
            </div>
            <div className="vm-block absolute inset-0 w-full h-full pointer-events-auto">
              <LeadershipBlock />
            </div>
            <div className="vm-block absolute inset-0 w-full h-full pointer-events-auto">
              <DevelopmentBlock />
            </div>
          </div>
        </div>
      </StickyContainer>
    </section>
  );
}
