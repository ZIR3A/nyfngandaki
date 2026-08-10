"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export function ContactIntro({ dict, settings, locale }) {
  const address = settings?.contact?.address?.[locale] || settings?.contact?.address?.en || "";
  const phones = settings?.contact?.phones || [];
  const emails = settings?.contact?.emails || [];

  // Get primary or first phone/email
  const phone = phones.find(p => p.primary)?.number || phones[0]?.number;
  const email = emails.find(e => e.primary)?.email || emails[0]?.email;

  const hasPhone = !!phone;
  const hasEmail = !!email;
  const hasAddress = !!address;

  if (!hasPhone && !hasEmail && !hasAddress) {
    return null;
  }

  return (
    <section className="pt-12 md:pt-16 pb-14 md:pb-18">
      <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
        {/* Highlights Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
          
          {/* Phone Highlight */}
          {hasPhone && (
            <a 
              href={`tel:${phone}`} 
              className="flex flex-col items-center text-center group p-4 lg:p-6 transition-transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white text-blue-600 dark:text-blue-400 transition-colors">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                {dict.contact.intro.callUs}
              </h3>
              <p className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {phone}
              </p>
            </a>
          )}

          {/* Email Highlight */}
          {hasEmail && (
            <a 
              href={`mailto:${email}`} 
              className="flex flex-col items-center text-center group p-4 lg:p-6 transition-transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white text-blue-600 dark:text-blue-400 transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                {dict.contact.intro.emailUs}
              </h3>
              <p className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors break-all">
                {email}
              </p>
            </a>
          )}

          {/* Office Highlight */}
          {hasAddress && (
            <Link 
              href="#office-location" 
              className="flex flex-col items-center text-center group p-4 lg:p-6 transition-transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white text-blue-600 dark:text-blue-400 transition-colors">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                {dict.contact.intro.visitUs}
              </h3>
              <p className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {address}
              </p>
            </Link>
          )}

        </div>
      </div>
    </section>
  );
}
