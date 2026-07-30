"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/en" },
  { label: "About Us", href: "/en/about" },
  { label: "Province Committee", href: "/en/committees/executive" },
  { label: "Districts", href: "/en/districts" },
  { label: "Members", href: "/en/members" },
  { label: "Events", href: "/en/events" },
  { label: "Contact", href: "/en/contact" },
];

const importantLinks = [
  { label: "Constitution", href: "/en/constitution" },
  { label: "Documents", href: "/en/documents" },
  { label: "Privacy Policy", href: "/en/privacy" },
  { label: "Terms of Service", href: "/en/terms" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg
        className="w-4 h-4"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg
        className="w-4 h-4"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg
        className="w-4 h-4"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".footer-col", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom-=50",
        toggleActions: "play none none reverse",
      }
    });

    gsap.from(".footer-bottom", {
      opacity: 0,
      duration: 1,
      delay: 0.4,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom-=50",
        toggleActions: "play none none reverse",
      }
    });
  }, { scope: containerRef });

  return (
    <footer
      ref={containerRef}
      className="bg-[#040D1C] text-white relative"
      aria-label="NYFN Gandaki Province Footer"
    >
      {/* Decorative gradient top border (replaces complex wave) */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">

          {/* Column 1 — Branding (wider) */}
          <div className="footer-col sm:col-span-2 lg:col-span-4">
            {/* Logo + Name */}
            <Link href="/en" className="flex items-center gap-3 mb-6 cursor-pointer w-fit">
              <div className="relative h-12 w-12 shrink-0">
                <Image
                  src="/brand-logo.png"
                  alt="NYFN Gandaki Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-extrabold text-white text-sm leading-tight">
                  NYFN Gandaki
                </p>
                <p className="text-white/40 text-xs mt-0.5">
                  राष्ट्रिय युवा संघ नेपाल – गण्डकी
                </p>
              </div>
            </Link>

            <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-8">
              The official digital platform of the National Youth Federation
              Nepal — Gandaki Province Committee. Building responsible and
              patriotic youth for a democratic Nepal.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#1546B0] flex items-center justify-center text-white/50 hover:text-white transition-colors duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="footer-col lg:col-span-2 lg:col-start-6">
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Important Links */}
          <div className="footer-col lg:col-span-2">
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">
              Resources
            </h3>
            <ul className="space-y-3">
              {importantLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div className="footer-col lg:col-span-3">
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin
                  className="w-4 h-4 text-[#1546B0] mt-0.5 shrink-0"
                  strokeWidth={2}
                />
                <span className="text-white/50 text-sm leading-relaxed">
                  Pokhara Metropolitan City,
                  <br />
                  Kaski, Gandaki Province, Nepal
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone
                  className="w-4 h-4 text-[#1546B0] shrink-0"
                  strokeWidth={2}
                />
                <a
                  href="tel:+97761123456"
                  className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                >
                  +977-61-123456
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail
                  className="w-4 h-4 text-[#1546B0] shrink-0"
                  strokeWidth={2}
                />
                <a
                  href="mailto:info@nyfn-gandaki.org.np"
                  className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                >
                  info@nyfn-gandaki.org.np
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            &copy; {currentYear} National Youth Federation Nepal — Gandaki
            Province. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Designed for NYFN Gandaki Province
          </p>
        </div>
      </div>
    </footer>
  );
}
