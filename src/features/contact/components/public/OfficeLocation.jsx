"use client";

import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OfficeLocation({ dict, settings, locale }) {
  const address = settings?.contact?.address?.[locale] || settings?.contact?.address?.en || "";
  const phones = settings?.contact?.phones || [];
  const officeHours = settings?.officeHours || {};
  
  const latitude = settings?.contact?.location?.latitude;
  const longitude = settings?.contact?.location?.longitude;
  const hasCoordinates = latitude && longitude;

  const getMapUrl = () => {
    if (!hasCoordinates) return null;
    return `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=16/${latitude}/${longitude}`;
  };

  const getEmbedUrl = () => {
    if (!hasCoordinates) return null;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${longitude-0.01}%2C${latitude-0.01}%2C${longitude+0.01}%2C${latitude+0.01}&layer=mapnik&marker=${latitude}%2C${longitude}`;
  };

  const mapUrl = getMapUrl();
  const embedUrl = getEmbedUrl();

  const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const getDayName = (day) => {
    const map = {
      en: { sunday: "Sunday", monday: "Monday", tuesday: "Tuesday", wednesday: "Wednesday", thursday: "Thursday", friday: "Friday", saturday: "Saturday" },
      np: { sunday: "आइतबार", monday: "सोमबार", tuesday: "मंगलबार", wednesday: "बुधबार", thursday: "बिहीबार", friday: "शुक्रबार", saturday: "शनिबार" }
    };
    return map[locale]?.[day] || map.en[day];
  };

  const getStatusText = (isOpen) => {
    if (locale === "np") return isOpen ? "खुला" : "बन्द";
    return isOpen ? "Open" : "Closed";
  };

  const primaryPhone = phones.length > 0 ? phones[0] : null;
  const hasOfficeHours = Object.keys(officeHours).length > 0;

  return (
    <section id="office-location" className="scroll-mt-24 w-full">
      {/* Section Header */}
      <div className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 text-center md:text-left">
        <div>
          <div className="text-xs font-extrabold text-primary-red uppercase tracking-widest mb-3">
            {dict.contact.location.eyebrow}
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            {dict.contact.location.heading}
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            {dict.contact.location.description}
          </p>
        </div>
        {mapUrl && (
          <div className="shrink-0">
            <Button 
              asChild
              className="w-full sm:w-auto font-medium bg-[#1546B0] hover:bg-[#0D2E78] text-white"
            >
              <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                <Navigation className="w-4 h-4 mr-2" />
                {dict.contact.location.getDirections}
              </a>
            </Button>
          </div>
        )}
      </div>

      {/* Full Width Map */}
      <div className="w-full">
        <div className="w-full min-h-[400px] lg:min-h-[500px] bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm relative">
          {hasCoordinates ? (
            <iframe 
              title={dict.contact.location.eyebrow}
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-slate-500 dark:text-slate-400">
              <MapPin className="w-12 h-12 mb-4 text-slate-300 dark:text-slate-600" />
              <p className="font-medium max-w-sm">
                {dict.contact.location.mapUnavailable}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
