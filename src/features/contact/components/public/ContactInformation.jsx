"use client";

import { MapPin, Phone, Mail, Clock, Globe } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import Link from "next/link";

export function ContactInformation({ dict, settings, locale }) {
  const address = settings?.contact?.address?.[locale] || settings?.contact?.address?.en || "";
  const phones = settings?.contact?.phones || [];
  const emails = settings?.contact?.emails || [];
  const website = settings?.contact?.website || "";
  const officeHours = settings?.officeHours || {};
  const socialLinks = settings?.socialLinks || {};

  const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  const getDayName = (day) => {
    const map = {
      en: {
        sunday: "Sunday",
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday"
      },
      np: {
        sunday: "आइतबार",
        monday: "सोमबार",
        tuesday: "मंगलबार",
        wednesday: "बुधबार",
        thursday: "बिहीबार",
        friday: "शुक्रबार",
        saturday: "शनिबार"
      }
    };
    return map[locale]?.[day] || map.en[day];
  };

  const getStatusText = (isOpen) => {
    if (locale === "np") return isOpen ? "खुला" : "बन्द";
    return isOpen ? "Open" : "Closed";
  };

  const hasOfficeHours = Object.keys(officeHours).length > 0;
  const hasSocials = socialLinks.facebook || socialLinks.twitter || socialLinks.instagram || socialLinks.youtube || socialLinks.tiktok;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 md:p-8 h-full">
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {dict.contact.info.heading}
        </h2>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
          {dict.contact.info.description}
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Office */}
        {address && (
          <div className="flex items-start gap-4 pb-6 border-b border-slate-100 dark:border-slate-800/60">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                {dict.contact.info.office}
              </h3>
              <p className="text-slate-900 dark:text-white font-medium whitespace-pre-wrap">
                {address}
              </p>
            </div>
          </div>
        )}
        
        {/* Phone */}
        {phones.length > 0 && (
          <div className="flex items-start gap-4 pb-6 border-b border-slate-100 dark:border-slate-800/60">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                {dict.contact.info.phone}
              </h3>
              <div className="space-y-4">
                {phones.map((p, idx) => (
                  <div key={idx} className="flex flex-col items-start gap-1">
                    <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                      {p.label?.[locale] || p.label?.en || "Phone"}
                    </span>
                    <div className="flex flex-wrap items-center justify-between w-full gap-2">
                      <span className="text-slate-900 dark:text-white font-bold">{p.number}</span>
                      <a href={`tel:${p.number}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
                        {dict.contact.info.callOffice} &rarr;
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Email */}
        {emails.length > 0 && (
          <div className="flex items-start gap-4 pb-6 border-b border-slate-100 dark:border-slate-800/60">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                {dict.contact.info.email}
              </h3>
              <div className="space-y-4">
                {emails.map((em, idx) => (
                  <div key={idx} className="flex flex-col items-start gap-1">
                    <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                      {em.label?.[locale] || em.label?.en || "Email"}
                    </span>
                    <div className="flex flex-wrap items-center justify-between w-full gap-2">
                      <span className="text-slate-900 dark:text-white font-bold break-all">{em.email}</span>
                      <a href={`mailto:${em.email}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium shrink-0">
                        {dict.contact.info.sendEmail} &rarr;
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Office Hours */}
        {hasOfficeHours && (
          <div className="flex items-start gap-4 pb-6 border-b border-slate-100 dark:border-slate-800/60">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                {dict.contact.info.officeHours}
              </h3>
              <ul className="space-y-2">
                {daysOfWeek.map((day) => (
                  <li key={day} className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{getDayName(day)}</span>
                    {officeHours[day]?.enabled ? (
                      <span className="text-slate-600 dark:text-slate-400 font-mono">
                        {officeHours[day].open} – {officeHours[day].close}
                      </span>
                    ) : (
                      <span className="text-slate-500 dark:text-slate-500 font-bold text-xs uppercase tracking-wider">
                        {getStatusText(false)}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Social Media */}
        {hasSocials && (
          <div className="flex flex-col gap-3 pt-2">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              {dict.contact.info.socialMedia}
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 hover:bg-blue-600 text-blue-600 hover:text-white dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-blue-600 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center">
                  <FaFacebook className="w-4 h-4" />
                </a>
              )}
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 hover:bg-blue-400 text-blue-400 hover:text-white dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-blue-400 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center">
                  <FaTwitter className="w-4 h-4" />
                </a>
              )}
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 hover:bg-pink-600 text-pink-600 hover:text-white dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-pink-600 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center">
                  <FaInstagram className="w-4 h-4" />
                </a>
              )}
              {socialLinks.youtube && (
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 hover:bg-red-600 text-red-600 hover:text-white dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-red-600 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center">
                  <FaYoutube className="w-4 h-4" />
                </a>
              )}
              {socialLinks.tiktok && (
                <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-900 text-slate-900 hover:text-white dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-black dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
