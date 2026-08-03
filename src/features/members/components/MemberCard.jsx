"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import {
  QrCode, Share2, User, MapPin, Copy, Download, X, Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

// ─────────────────────────────────────────────────────────────────────────────
// Position → Badge Color Map
// Add future positions here without touching card logic.
// ─────────────────────────────────────────────────────────────────────────────
const POSITION_COLOR_MAP = [
  { keywords: ["president", "अध्यक्ष"],         bg: "bg-blue-100 dark:bg-blue-900/40",   text: "text-blue-700 dark:text-blue-300",   dot: "bg-blue-500" },
  { keywords: ["presedent", "अध्यक्ष"],         bg: "bg-blue-100 dark:bg-blue-900/40",   text: "text-blue-700 dark:text-blue-300",   dot: "bg-blue-500" },
  { keywords: ["vice", "उपाध्यक्ष"],             bg: "bg-purple-100 dark:bg-purple-900/40", text: "text-purple-700 dark:text-purple-300", dot: "bg-purple-500" },
  { keywords: ["secretary", "सचिव"],             bg: "bg-orange-100 dark:bg-orange-900/40", text: "text-orange-700 dark:text-orange-300", dot: "bg-orange-500" },
  { keywords: ["joint", "सह-सचिव", "sahsachiv"], bg: "bg-green-100 dark:bg-green-900/40",   text: "text-green-700 dark:text-green-300",   dot: "bg-green-500" },
  { keywords: ["treasurer", "कोषाध्यक्ष"],       bg: "bg-pink-100 dark:bg-pink-900/40",    text: "text-pink-700 dark:text-pink-300",    dot: "bg-pink-500" },
  { keywords: ["coordinator", "संयोजक"],         bg: "bg-indigo-100 dark:bg-indigo-900/40", text: "text-indigo-700 dark:text-indigo-300", dot: "bg-indigo-500" },
  { keywords: ["advisor", "सल्लाहकार", "सल्लाह"],bg: "bg-slate-100 dark:bg-slate-800",    text: "text-slate-600 dark:text-slate-300",  dot: "bg-slate-400" },
  { keywords: ["member", "सदस्य"],               bg: "bg-cyan-100 dark:bg-cyan-900/40",    text: "text-cyan-700 dark:text-cyan-300",    dot: "bg-cyan-500" },
];
const DEFAULT_COLOR = { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-600 dark:text-gray-300", dot: "bg-gray-400" };

function getPositionColor(positionStr = "") {
  const lower = positionStr.toLowerCase();
  return POSITION_COLOR_MAP.find(p => p.keywords.some(k => lower.includes(k.toLowerCase()))) || DEFAULT_COLOR;
}

// ─────────────────────────────────────────────────────────────────────────────
// Data helpers
// ─────────────────────────────────────────────────────────────────────────────
function resolveName(member, isNepali) {
  return isNepali ? member.name?.np || member.name?.en : member.name?.en;
}

function resolvePosition(member, isNepali) {
  if (member.position_id?.name) {
    return isNepali
      ? member.position_id.name.np || member.position_id.name.en
      : member.position_id.name.en;
  }
  if (member.position) {
    return isNepali
      ? member.position.np || member.position.en
      : member.position.en;
  }
  return "";
}

function resolveDistrict(member, isNepali) {
  if (member.district?.name) {
    return isNepali
      ? member.district.name.np || member.district.name.en
      : member.district.name.en;
  }
  return null;
}

function buildProfileUrl(member, isNepali) {
  return `/${isNepali ? "np" : "en"}/members/${member.slug || member._id}`;
}

function buildAbsoluteUrl(member) {
  const origin = typeof window !== "undefined" ? window.location.origin : "https://nyfngandaki.org.np";
  return `${origin}/en/members/${member.slug || member._id}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Localization strings
// ─────────────────────────────────────────────────────────────────────────────
const L = {
  qrCode:     { en: "QR Code",         np: "QR कोड" },
  share:      { en: "Share",           np: "साझा गर्नुहोस्" },
  scan:       { en: "Scan to view profile", np: "प्रोफाइल हेर्न स्क्यान गर्नुहोस्" },
  copyLink:   { en: "Copy Link",       np: "लिङ्क प्रतिलिपि" },
  dlPNG:      { en: "Download PNG",    np: "PNG डाउनलोड" },
  dlSVG:      { en: "Download SVG",    np: "SVG डाउनलोड" },
  shareTitle: { en: "Share Profile",   np: "प्रोफाइल साझा गर्नुहोस्" },
  copy:       { en: "Copy",            np: "प्रतिलिपि" },
  copied:     { en: "Copied!",         np: "प्रतिलिपि गरियो!" },
};
const t = (key, isNepali) => isNepali ? L[key].np : L[key].en;

// ─────────────────────────────────────────────────────────────────────────────
// QR Modal
// ─────────────────────────────────────────────────────────────────────────────
function QRModal({ member, isNepali, onClose }) {
  const [copied, setCopied] = useState(false);
  const profileUrl = buildAbsoluteUrl(member);
  const name = resolveName(member, isNepali);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    toast.success(t("copied", isNepali));
    setTimeout(() => setCopied(false), 2000);
  }, [profileUrl, isNepali]);

  const handleDownloadSVG = useCallback(() => {
    const svg = document.getElementById("nyfn-qr-svg");
    if (!svg) return;
    const blob = new Blob([new XMLSerializer().serializeToString(svg)], { type: "image/svg+xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${member.slug || member._id}-qr.svg`;
    a.click();
    URL.revokeObjectURL(a.href);
  }, [member]);

  const handleDownloadPNG = useCallback(() => {
    const svg = document.getElementById("nyfn-qr-svg");
    if (!svg) return;
    const size = 320;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);
    const svgStr = new XMLSerializer().serializeToString(svg);
    const img = new window.Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `${member.slug || member._id}-qr.png`;
      a.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgStr)));
  }, [member]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 16 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className="bg-white dark:bg-gray-900 rounded-3xl p-6 max-w-xs w-full shadow-2xl border border-gray-100 dark:border-gray-800"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#1546B0]" />
            <span className="font-bold text-gray-900 dark:text-white text-sm">{t("qrCode", isNepali)}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* QR — always white bg for scanning */}
        <div className="flex flex-col items-center gap-3">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <QRCodeSVG
              id="nyfn-qr-svg"
              value={profileUrl}
              size={180}
              bgColor="#ffffff"
              fgColor="#0D2E78"
              level="M"
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center font-medium">{t("scan", isNepali)}</p>
          <p className="text-sm font-bold text-gray-800 dark:text-gray-100 text-center line-clamp-1">{name}</p>
        </div>

        {/* Actions */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            { label: t("copyLink", isNepali), icon: copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />, action: handleCopy },
            { label: t("dlPNG", isNepali),   icon: <Download className="w-4 h-4" />, action: handleDownloadPNG },
            { label: t("dlSVG", isNepali),   icon: <Download className="w-4 h-4" />, action: handleDownloadSVG },
          ].map(btn => (
            <button
              key={btn.label}
              onClick={btn.action}
              className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-500 dark:text-gray-400 hover:text-[#1546B0] dark:hover:text-blue-400 transition-all"
            >
              {btn.icon}
              <span className="text-[9px] font-semibold text-center leading-tight">{btn.label}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Share Sheet
// ─────────────────────────────────────────────────────────────────────────────
const SOCIAL = (url, text) => [
  {
    label: "Facebook",
    color: "hover:bg-[#1877F2]/10 hover:text-[#1877F2]",
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  },
  {
    label: "WhatsApp",
    color: "hover:bg-[#25D366]/10 hover:text-[#25D366]",
    href: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.659 1.438 5.168L2 22l4.998-1.309A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.522 2 12 2z"/></svg>,
  },
  {
    label: "X",
    color: "hover:bg-gray-900/10 hover:text-gray-900 dark:hover:text-white",
    href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.261 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>,
  },
  {
    label: "Telegram",
    color: "hover:bg-[#229ED9]/10 hover:text-[#229ED9]",
    href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>,
  },
  {
    label: "LinkedIn",
    color: "hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]",
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
];

function ShareSheet({ member, isNepali, onClose }) {
  const [copied, setCopied] = useState(false);
  const url = buildAbsoluteUrl(member);
  const name = resolveName(member, isNepali);
  const text = isNepali
    ? `${name} - युवा संघ नेपाल, गण्डकी प्रदेश`
    : `${name} - NYFN Gandaki Province`;

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success(t("copied", isNepali));
    setTimeout(() => setCopied(false), 2000);
  }, [url, isNepali]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className="bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl p-6 w-full sm:max-w-sm shadow-2xl border border-gray-100 dark:border-gray-800"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#1546B0]" />
            <span className="font-bold text-gray-900 dark:text-white text-sm">{t("shareTitle", isNepali)}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-5 gap-3 mb-4">
          {SOCIAL(url, text).map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              title={s.label}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition-all ${s.color}`}
            >
              {s.icon}
              <span className="text-[9px] font-semibold">{s.label}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-2xl px-3 py-2.5">
          <p className="flex-1 text-xs text-gray-400 dark:text-gray-500 truncate font-medium">{url}</p>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs font-bold text-[#1546B0] dark:text-blue-400 hover:text-[#0D2E78] shrink-0 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? t("copied", isNepali) : t("copy", isNepali)}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MemberCard — THE single unified card
// ─────────────────────────────────────────────────────────────────────────────
export function MemberCard({ member, isNepali }) {
  const [showQR, setShowQR] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const name     = resolveName(member, isNepali);
  const position = resolvePosition(member, isNepali);
  const district = resolveDistrict(member, isNepali);
  const href     = buildProfileUrl(member, isNepali);
  const color    = getPositionColor(position);

  return (
    <>
      <motion.div
        whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(0,0,0,0.12)" }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="relative bg-white dark:bg-gray-900 rounded-[20px] border border-gray-100 dark:border-gray-800 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:border-[#1546B0]/20 dark:hover:border-[#1546B0]/30 flex flex-col overflow-hidden group cursor-pointer transition-colors duration-300"
      >
        {/* ── Entire top area → profile link ─────────────────────────────── */}
        <Link href={href} className="flex flex-col text-center h-full" tabIndex={0}>

          {/* Full Width Photo */}
          <div className="relative w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0">
            {member.photo ? (
              <Image
                src={member.photo}
                alt={name || "Member"}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 250px"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-12 h-12 text-gray-300 dark:text-gray-600" />
              </div>
            )}

            {/* Position Badge Overlay */}
            {position && (
              <div className="absolute top-3 right-3 z-10">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold shadow-sm backdrop-blur-md ${color.bg} ${color.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${color.dot}`} />
                  {position}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col flex-1 p-4 justify-center">
            {/* Name */}
            <h3 className="text-[17px] sm:text-lg font-black text-gray-900 dark:text-white group-hover:text-[#1546B0] dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug mb-1">
              {name}
            </h3>

            {/* District */}
            {district && (
              <div className="flex items-center justify-center gap-1.5 mt-2 text-[12px] text-gray-500 dark:text-gray-400 font-medium">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span className="line-clamp-1">{district}</span>
              </div>
            )}
          </div>
        </Link>

        {/* ── Divider ─────────────────────────────────────────────────────── */}
        <div className="border-t border-gray-100 dark:border-gray-800" />

        {/* ── Action Bar ──────────────────────────────────────────────────── */}
        <div className="flex divide-x divide-gray-100 dark:divide-gray-800 mt-auto">
          <button
            onClick={e => { e.stopPropagation(); e.preventDefault(); setShowQR(true); }}
            aria-label={t("qrCode", isNepali)}
            className="flex-1 flex flex-col items-center gap-1 py-3 hover:bg-blue-50/60 dark:hover:bg-blue-900/10 transition-all rounded-bl-[20px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1546B0] group/btn"
          >
            <div className="p-1.5 rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover/btn:scale-110 transition-transform">
              <QrCode className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 group-hover/btn:text-blue-600 dark:group-hover/btn:text-blue-400 transition-colors">{t("qrCode", isNepali)}</span>
          </button>
          <button
            onClick={e => { e.stopPropagation(); e.preventDefault(); setShowShare(true); }}
            aria-label={t("share", isNepali)}
            className="flex-1 flex flex-col items-center gap-1 py-3 hover:bg-purple-50/60 dark:hover:bg-purple-900/10 transition-all rounded-br-[20px] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 group/btn"
          >
            <div className="p-1.5 rounded-full bg-purple-100/50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 group-hover/btn:scale-110 transition-transform">
              <Share2 className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 group-hover/btn:text-purple-600 dark:group-hover/btn:text-purple-400 transition-colors">{t("share", isNepali)}</span>
          </button>
        </div>
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {showQR && <QRModal member={member} isNepali={isNepali} onClose={() => setShowQR(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showShare && <ShareSheet member={member} isNepali={isNepali} onClose={() => setShowShare(false)} />}
      </AnimatePresence>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FeaturedLeaderCard — Larger focus card for President/Leader
// ─────────────────────────────────────────────────────────────────────────────
export function FeaturedLeaderCard({ member, isNepali }) {
  const [showQR, setShowQR] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const name     = resolveName(member, isNepali);
  const position = resolvePosition(member, isNepali);
  const district = resolveDistrict(member, isNepali);
  const href     = buildProfileUrl(member, isNepali);
  const color    = getPositionColor(position);

  return (
    <>
      <motion.div
        className="relative flex flex-col items-center group cursor-pointer"
      >
        <Link href={href} className="flex flex-col items-center text-center outline-none" tabIndex={0}>
          {/* Large Circular Photo with Shadow and White Border */}
          <div className="relative mb-4">
            <div className="w-48 h-48 md:w-56 md:h-56 relative rounded-full overflow-hidden border-[6px] border-white shadow-xl z-10 transition-transform duration-500 group-hover:scale-105 bg-gray-100 flex-shrink-0">
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={name || "Member"}
                  fill
                  sizes="(max-width: 768px) 180px, 220px"
                  className="object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-20 h-20 text-gray-300 dark:text-gray-600" />
                </div>
              )}
            </div>

            {/* Position Badge overlapping the bottom center */}
            {position && (
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
                <span className={`inline-flex items-center px-5 py-1.5 rounded-full text-[12px] font-black uppercase tracking-widest shadow-md border border-white/40 ${color.bg} ${color.text}`}>
                  {position}
                </span>
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-col items-center">
            <h3 className="text-2xl sm:text-[28px] font-black text-[#0f172a] dark:text-white group-hover:text-[#1546B0] dark:group-hover:text-blue-400 transition-colors tracking-tight leading-tight mb-1">
              {name}
            </h3>
            {district && (
              <p className="text-[15px] font-bold text-slate-500 dark:text-slate-400">
                {district}
              </p>
            )}
          </div>
        </Link>

        {/* Minimal Action Buttons (QR & Share) */}
        <div className="flex items-center justify-center gap-3 mt-5">
          <button
            onClick={e => { e.stopPropagation(); e.preventDefault(); setShowQR(true); }}
            className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 hover:scale-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label={t("qrCode", isNepali)}
            title={t("qrCode", isNepali)}
          >
            <QrCode className="w-4 h-4" />
          </button>
          <button
            onClick={e => { e.stopPropagation(); e.preventDefault(); setShowShare(true); }}
            className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-200 hover:scale-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            aria-label={t("share", isNepali)}
            title={t("share", isNepali)}
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showQR && <QRModal member={member} isNepali={isNepali} onClose={() => setShowQR(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showShare && <ShareSheet member={member} isNepali={isNepali} onClose={() => setShowShare(false)} />}
      </AnimatePresence>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Skeleton
// ─────────────────────────────────────────────────────────────────────────────
export function MemberCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-[20px] border border-gray-100 dark:border-gray-800 shadow-[0_2px_12px_rgba(0,0,0,0.06)] animate-pulse flex flex-col overflow-hidden">
      <div className="flex flex-col items-center pt-6 pb-4 px-4 gap-3">
        <div className="h-5 w-24 bg-gray-100 dark:bg-gray-800 rounded-full" />
        <div className="w-[90px] h-[90px] rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        <div className="h-3 w-20 bg-gray-100 dark:bg-gray-800 rounded-lg" />
      </div>
      <div className="mx-4 border-t border-gray-100 dark:border-gray-800" />
      <div className="flex divide-x divide-gray-100 dark:divide-gray-800">
        <div className="flex-1 h-12 bg-gray-50 dark:bg-gray-800/50 rounded-bl-[20px]" />
        <div className="flex-1 h-12 bg-gray-50 dark:bg-gray-800/50 rounded-br-[20px]" />
      </div>
    </div>
  );
}
