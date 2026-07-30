"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Globe, LogIn, ChevronRight, ChevronDown, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

import { Mail, Phone } from "lucide-react";
import { useLanguage } from "@/localization/LanguageContext";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language: locale, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isNepali = locale === "np" || locale === "ne";

  const navLinks = [
    { name: isNepali ? "गृहपृष्ठ" : "Home", href: `/${locale}` },
    { 
      name: isNepali ? "हाम्रो बारे" : "About Us",
      href: `/${locale}/about`,
    },
    { 
      name: isNepali ? "संगठन" : "Organization",
      href: `/${locale}/organization`,
      mega: [
        { name: isNepali ? "संरचना" : "Structure", href: `/${locale}/organization`, desc: isNepali ? "हाम्रो सांगठनिक संरचना" : "Our organizational chart" },
        { name: isNepali ? "प्रदेश समिति" : "Province Committee", href: `/${locale}/committees/executive`, desc: isNepali ? "गण्डकी प्रदेश समिति" : "Gandaki Province Committee" },
        { name: isNepali ? "जिल्ला समितिहरू" : "District Committees", href: `/${locale}/committees/district`, desc: isNepali ? "जिल्ला कमिटी विवरण" : "District-level bodies" }
      ]
    },
    { name: isNepali ? "सदस्यहरू" : "Members", href: `/${locale}/members` },
    { 
      name: isNepali ? "मिडिया" : "Media",
      href: `/${locale}/events`,
      mega: [
        { name: isNepali ? "कार्यक्रमहरू" : "Events", href: `/${locale}/events`, desc: isNepali ? "हाम्रा गतिविधि र कार्यक्रम" : "Our latest activities" },
        { name: isNepali ? "तस्बिर ग्यालरी" : "Photo Gallery", href: `/${locale}/gallery`, desc: isNepali ? "फोटो ग्यालरी" : "Photos from our events" },
        { name: isNepali ? "भिडियोहरू" : "Videos", href: `/${locale}/video-gallery`, desc: isNepali ? "भिडियो संग्रह" : "Video archives" }
      ]
    },
    { 
      name: isNepali ? "स्रोतहरू" : "Resources",
      href: `/${locale}/documents`,
      mega: [
        { name: isNepali ? "कागजातहरू" : "Documents", href: `/${locale}/documents`, desc: isNepali ? "महत्वपूर्ण प्रकाशनहरू" : "Important publications" },
        { name: isNepali ? "विधान" : "Constitution", href: `/${locale}/constitution`, desc: isNepali ? "हाम्रो विधान" : "Our governing rules" },
        { name: isNepali ? "प्राय सोधिने प्रश्न" : "FAQ", href: `/${locale}/faq`, desc: isNepali ? "जिज्ञासा र उत्तर" : "Frequently asked questions" }
      ]
    },
    { name: isNepali ? "सम्पर्क" : "Contact", href: `/${locale}/contact` },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedMobile, setExpandedMobile] = useState(null);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl shadow-sm border-b border-gray-200 dark:border-gray-700"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      {/* Top Bar */}
      <div className={`bg-[#0D2E78] text-white text-[11px] sm:text-xs font-medium transition-all duration-300 overflow-hidden ${scrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'}`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 h-full flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="mailto:info@nyfn-gandaki.org.np" className="flex items-center gap-2 hover:text-white/80 transition-colors">
              <Mail className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">info@nyfn-gandaki.org.np</span>
            </a>
            <a href="tel:+977-61-123456" className="flex items-center gap-2 hover:text-white/80 transition-colors">
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">+977-61-123456</span>
            </a>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Language Switcher */}
              <div className="flex items-center gap-1.5 border-l border-white/20 pl-3 ml-1">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`hover:text-white/80 transition-colors ${locale === 'en' ? 'font-bold underline underline-offset-2' : 'opacity-70'}`}
                >
                  EN
                </button>
                <span className="text-white/30">|</span>
                <button 
                  onClick={() => setLanguage('np')}
                  className={`hover:text-white/80 transition-colors ${locale === 'np' ? 'font-bold underline underline-offset-2' : 'opacity-70'}`}
                >
                  NP
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3 border-l border-white/20 pl-6 hidden sm:flex">
              <a href="#" className="hover:text-white/80 transition-colors">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="hover:text-white/80 transition-colors">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" className="hover:text-white/80 transition-colors">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="hover:text-white/80 transition-colors">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={`max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
        
        {/* Left: Branding */}
        <Link href={`/${locale}`} className="flex items-center gap-2 group shrink-0">
          <div className="relative h-12 w-12 sm:h-14 sm:w-14 transition-transform duration-300 group-hover:scale-105">
            <Image 
              src="/brand-logo.png" 
              alt="NYFN Gandaki Province" 
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-contain object-left" 
              priority
            />
          </div>
          <div className="flex flex-col max-w-[200px] sm:max-w-none">
            <h1 className={`text-xs sm:text-base font-bold leading-tight transition-colors text-[#0D2E78] dark:text-blue-300 truncate`}>
              <span className="hidden sm:inline">National Youth Federation Nepal (NYFN)</span>
              <span className="sm:hidden">NYFN Gandaki</span>
            </h1>
            <h2 className="hidden sm:block text-xs sm:text-sm font-extrabold text-[#D71920] leading-tight truncate">
              Gandaki Province
            </h2>
            <span className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 leading-tight truncate">
              राष्ट्रिय युवा संघ नेपाल – गण्डकी
            </span>
          </div>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-2">
          {navLinks.map((link, idx) => {
            const isActive = pathname === link.href || (link.href !== "#" && pathname.startsWith(link.href) && link.href !== `/${locale}`);
            return (
              <div 
                key={idx} 
                className="relative"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link 
                  href={link.href} 
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all relative flex items-center gap-1 ${
                    isActive
                      ? "text-[#1546B0] dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300 hover:text-[#1546B0] dark:hover:text-blue-400"
                  }`}
                >
                  {link.name}
                  {link.mega && (
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${hoveredIndex === idx ? "rotate-180" : ""}`} />
                  )}
                  {isActive && (
                    <motion.div 
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-4 right-4 h-0.5 bg-[#D71920] rounded-full"
                    />
                  )}
                </Link>

                {/* Mega Menu Dropdown */}
                {link.mega && (
                  <AnimatePresence>
                    {hoveredIndex === idx && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[600px]"
                      >
                        <div className="bg-white dark:bg-gray-800 rounded-[24px] shadow-2xl border border-gray-100 dark:border-gray-700 p-6 grid grid-cols-2 gap-4">
                          {link.mega.map((item, i) => (
                            <Link 
                              key={i} 
                              href={item.href}
                              className="group p-4 rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-gray-700 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-600 flex flex-col"
                            >
                              <span className="text-[#1546B0] dark:text-blue-400 font-extrabold text-sm mb-1 group-hover:translate-x-1 transition-transform">{item.name}</span>
                              <span className="text-gray-500 dark:text-gray-400 text-xs font-medium leading-relaxed">{item.desc}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Dark Mode Toggle */}
          {mounted && (
            <button
              id="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full transition-all duration-300 text-gray-600 dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    <Sun className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    <Moon className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          )}
          
          <Link href={`/${locale}/admin/dashboard`}>
            <Button className={`rounded-[20px] px-6 transition-all ${
              scrolled 
                ? "bg-[#1546B0] hover:bg-[#0D2E78] text-white shadow-sm" 
                : "bg-white dark:bg-gray-800 text-[#1546B0] dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md"
            }`}>
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          </Link>
        </div>

        {/* Mobile: Theme toggle + Hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          {mounted && (
            <button
              id="theme-toggle-mobile"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full transition-all text-gray-600 dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          )}
          <button 
            className={`p-2 rounded-md text-gray-900 dark:text-gray-100`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700 shadow-xl overflow-hidden mt-3"
          >
            <div className="px-6 py-4 flex flex-col gap-2 max-h-[70vh] overflow-y-auto">
              {navLinks.map((link, idx) => (
                <div key={idx} className="flex flex-col">
                  {link.mega ? (
                    <>
                      <button 
                        onClick={() => setExpandedMobile(expandedMobile === idx ? null : idx)}
                        className="text-sm font-bold text-gray-800 dark:text-gray-100 p-3 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-xl transition-colors flex justify-between items-center text-left"
                      >
                        {link.name}
                        <motion.div animate={{ rotate: expandedMobile === idx ? 90 : 0 }}>
                          <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {expandedMobile === idx && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden flex flex-col pl-4 border-l-2 border-gray-100 dark:border-gray-700 ml-4 mb-2 mt-1 gap-2"
                          >
                            {link.mega.map((item, i) => (
                              <Link 
                                key={i}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="text-sm text-gray-600 dark:text-gray-300 hover:text-[#1546B0] dark:hover:text-blue-400 py-2 font-medium"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link 
                      href={link.href} 
                      className="text-sm font-bold text-gray-800 dark:text-gray-100 p-3 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-[#1546B0] dark:hover:text-blue-400 rounded-xl transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 mt-2 border-t dark:border-gray-700 flex flex-col gap-3">
                <Link href={`/${locale}/admin/dashboard`} onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-[#1546B0] hover:bg-[#0D2E78] text-white rounded-[20px] h-12">
                    <LogIn className="h-4 w-4 mr-2" /> Login to Portal
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

