"use client";

import { Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactClosingCTA({ dict, settings }) {
  const primaryPhone = settings?.contact?.phones?.find(p => p.isPrimary) || settings?.contact?.phones?.[0];
  const primaryEmail = settings?.contact?.emails?.find(e => e.isPrimary) || settings?.contact?.emails?.[0];

  const hasPhone = !!primaryPhone;
  const hasEmail = !!primaryEmail;

  if (!hasPhone && !hasEmail) {
    return null;
  }

  return (
    <section className="w-full mt-12 md:mt-20">
      <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl border border-blue-100 dark:border-slate-800 p-8 md:p-10 lg:p-12 relative overflow-hidden">
        {/* Subtle decorative background detail */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-70 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-50 dark:bg-red-900/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 opacity-50 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          
          <div className="md:w-2/3 lg:w-7/12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-primary-red"></div>
              <span className="text-xs font-extrabold text-primary-red uppercase tracking-widest">
                {dict.contact.cta.eyebrow}
              </span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              {dict.contact.cta.heading}
            </h2>
            
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
              {dict.contact.cta.description}
            </p>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 shrink-0">
            {hasPhone && (
              <Button asChild className="w-full sm:w-auto px-8 py-6 text-base bg-primary-blue hover:bg-blue-700 text-white shadow-sm">
                <a href={`tel:${primaryPhone.number}`}>
                  <Phone className="w-5 h-5 mr-3" />
                  {dict.contact.cta.callUs}
                </a>
              </Button>
            )}

            {hasEmail && (
              <Button asChild variant="outline" className="w-full sm:w-auto px-8 py-6 text-base bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900">
                <a href={`mailto:${primaryEmail.address}`}>
                  <Mail className="w-5 h-5 mr-3" />
                  {dict.contact.cta.emailUs}
                </a>
              </Button>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
