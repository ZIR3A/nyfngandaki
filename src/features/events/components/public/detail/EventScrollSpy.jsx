"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function EventScrollSpy({ sections, locale }) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for sticky header

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Account for header and spy bar
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="sticky top-[72px] z-40 bg-white/80 dark:bg-[#0A0F1C]/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 transition-all duration-300 hidden md:block">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center gap-8 overflow-x-auto overflow-y-hidden no-scrollbar py-4">
          {sections.map((section) => (
            <li key={section.id} className="shrink-0">
              <button
                onClick={() => scrollTo(section.id)}
                className={cn(
                  "text-sm font-bold uppercase tracking-wider transition-colors py-1 relative",
                  activeSection === section.id
                    ? "text-[#1546B0] dark:text-blue-400"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                {locale === "np" ? section.labelNp : section.labelEn}
                {activeSection === section.id && (
                  <span className="absolute -bottom-[17px] left-0 w-full h-[3px] bg-[#1546B0] dark:bg-blue-400 rounded-t-full" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
