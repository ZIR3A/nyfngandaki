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
      <div className="mb-8 md:mb-10 text-center md:text-left">
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

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Office Information */}
        <div className="order-2 lg:order-1 lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 md:p-8">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            {dict.contact.location.office}
          </h3>

          <div className="space-y-6">
            {address && (
              <div className="flex gap-4">
                <MapPin className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">{dict.contact.location.address}</h4>
                  <p className="text-slate-900 dark:text-white font-medium whitespace-pre-wrap">{address}</p>
                </div>
              </div>
            )}

            {primaryPhone && (
              <div className="flex gap-4">
                <Phone className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">{dict.contact.location.phone}</h4>
                  <a href={`tel:${primaryPhone.number}`} className="text-slate-900 dark:text-white font-bold hover:text-blue-600 transition-colors">
                    {primaryPhone.number}
                  </a>
                </div>
              </div>
            )}

            {hasOfficeHours && (
              <div className="flex gap-4">
                <Clock className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
                <div className="w-full">
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">{dict.contact.location.officeHours}</h4>
                  <ul className="space-y-1 w-full">
                    {daysOfWeek.map((day) => (
                      <li key={day} className="flex justify-between items-center text-sm">
                        <span className="text-slate-600 dark:text-slate-400">{getDayName(day)}</span>
                        {officeHours[day]?.enabled ? (
                          <span className="text-slate-900 dark:text-white font-medium">
                            {officeHours[day].open} – {officeHours[day].close}
                          </span>
                        ) : (
                          <span className="text-slate-500 font-medium">
                            {getStatusText(false)}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {mapUrl && (
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                <Button 
                  asChild
                  variant="outline"
                  className="w-full sm:w-auto font-medium"
                >
                  <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                    <Navigation className="w-4 h-4 mr-2" />
                    {dict.contact.location.getDirections}
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Map */}
        <div className="order-1 lg:order-2 lg:col-span-7 h-full min-h-[350px] lg:min-h-[450px]">
          <div className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm relative">
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

      </div>
    </section>
  );
}
