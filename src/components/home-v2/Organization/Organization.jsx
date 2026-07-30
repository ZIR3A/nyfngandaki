"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { gandakiDistricts } from "@/data/gandakiDistricts";
import Background from "./Background";
import Overlay from "./Overlay";
import SectionHeader from "./SectionHeader";
import ProvinceMap from "./ProvinceMap";
import DistrictPanel from "./DistrictPanel";

export default function Organization() {
  // Default to Kaski (capital district)
  const [activeDistrict, setActiveDistrict] = useState(
    gandakiDistricts.find((d) => d.slug === "kaski") || gandakiDistricts[0]
  );
  
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

    tl.from(".org-header", { y: -30, opacity: 0, duration: 1 })
      .from(".org-map-wrapper", { scale: 0.9, opacity: 0, filter: "blur(10px)", duration: 1.2 }, "-=0.8")
      .from(".org-panel-wrapper", { x: 50, opacity: 0, filter: "blur(10px)", duration: 1 }, "-=1");
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      aria-labelledby="org-heading"
      className="relative w-full min-h-[150vh] bg-[#081224] flex flex-col overflow-hidden"
    >
      <Background />
      <Overlay />
      
      <div className="org-header relative z-20">
        <SectionHeader />
      </div>

      <div className="relative z-20 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-24">
        {/* Two-column layout: Left (Map 45%), Right (Panel 55%) */}
        <div className="grid lg:grid-cols-[45%_55%] gap-12 lg:gap-20 h-full items-center">
          
          <div className="org-map-wrapper order-1 flex flex-col items-center justify-center h-full">
            <ProvinceMap
              activeDistrictId={activeDistrict.id}
              onSelectDistrict={setActiveDistrict}
            />
          </div>

          <div className="org-panel-wrapper order-2 flex flex-col items-start justify-center h-full">
            <DistrictPanel activeDistrict={activeDistrict} />
          </div>
          
        </div>
      </div>
    </section>
  );
}
