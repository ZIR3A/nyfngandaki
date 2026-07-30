"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Sun, Moon, LogIn } from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "Home", href: "/en" },
  { label: "About", href: "/en/about" },
  { label: "Organization", href: "/en/organization" },
  { label: "Members", href: "/en/members" },
  { label: "Events", href: "/en/events" },
  { label: "Contact", href: "/en/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "pt-4 px-4 sm:px-6" : "pt-0 px-0"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto transition-all duration-300 ${
            scrolled
              ? "bg-white/70 dark:bg-[#040D1C]/70 backdrop-blur-xl border border-white/20 dark:border-white/[0.06] shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-full px-6 lg:px-8"
              : "bg-transparent px-4 sm:px-6 lg:px-12 border border-transparent"
          }`}
        >
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled ? "py-2" : "py-5"
            }`}
          >
            {/* Logo */}
            <Link
              href="/home-v2"
              className="flex items-center gap-3 shrink-0 cursor-pointer"
              aria-label="NYFN Gandaki — Home"
            >
              <div className="relative h-10 w-10">
                <Image
                  src="/brand-logo.png"
                  alt="NYFN Gandaki Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div
                className={`transition-colors duration-300 ${
                  scrolled ? "" : "hidden sm:block"
                }`}
              >
                <p
                  className={`font-extrabold text-sm leading-tight transition-colors duration-300 ${
                    scrolled
                      ? "text-[#0D2E78] dark:text-white"
                      : "text-white"
                  }`}
                >
                  NYFN Gandaki
                </p>
                <p
                  className={`text-xs transition-colors duration-300 ${
                    scrolled
                      ? "text-[#6B7280] dark:text-white/50"
                      : "text-white/60"
                  }`}
                >
                  राष्ट्रिय युवा संघ नेपाल
                </p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Primary navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                    scrolled
                      ? "text-[#475569] dark:text-white/70 hover:text-[#1546B0] dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-white/10"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              {mounted && (
                <button
                  id="home-v2-theme-toggle"
                  onClick={toggleTheme}
                  aria-label={
                    theme === "dark"
                      ? "Switch to light mode"
                      : "Switch to dark mode"
                  }
                  className={`p-2 rounded-full transition-colors duration-200 cursor-pointer ${
                    scrolled
                      ? "text-[#475569] dark:text-white/70 hover:bg-[#F1F5F9] dark:hover:bg-white/10"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4" strokeWidth={2} />
                  ) : (
                    <Moon className="w-4 h-4" strokeWidth={2} />
                  )}
                </button>
              )}

              {/* Login — desktop only */}
              <Link
                href="/admin"
                className={`hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-colors duration-200 cursor-pointer ${
                  scrolled
                    ? "bg-[#1546B0] hover:bg-[#0D2E78] text-white"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                }`}
              >
                <LogIn className="w-3.5 h-3.5" strokeWidth={2} />
                Login
              </Link>

              {/* Mobile menu toggle */}
              <button
                id="home-v2-mobile-menu-toggle"
                className={`lg:hidden p-2 rounded-full transition-colors duration-200 cursor-pointer ${
                  scrolled
                    ? "text-[#475569] dark:text-white/70 hover:bg-[#F1F5F9] dark:hover:bg-white/10"
                    : "text-white hover:bg-white/10"
                }`}
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="home-v2-mobile-menu"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" strokeWidth={2} />
                ) : (
                  <Menu className="w-5 h-5" strokeWidth={2} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            id="home-v2-mobile-menu"
            className="lg:hidden bg-white dark:bg-[#040D1C] border-t border-[#E5E7EB] dark:border-white/[0.06] shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-semibold text-[#0F172A] dark:text-white hover:bg-[#F1F5F9] dark:hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 mt-2 border-t border-[#E5E7EB] dark:border-white/[0.06]">
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#1546B0] hover:bg-[#0D2E78] text-white font-bold rounded-xl text-sm transition-colors duration-200 cursor-pointer"
                >
                  <LogIn className="w-4 h-4" strokeWidth={2} />
                  Login to Portal
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
