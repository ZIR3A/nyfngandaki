"use client";

import { MapPin, Calendar, Clock, Building2, Phone, Mail, Globe, Map } from "lucide-react";

export default function EventInfoCard({ event, locale }) {
  const isNepali = locale === "np";
  
  // Clean values with fallback
  const startDate = event.startDate ? new Date(event.startDate).toLocaleDateString(isNepali ? 'ne-NP' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : null;
  
  const time = event.time;
  
  const duration = isNepali 
    ? event.duration?.np || event.duration?.en 
    : event.duration?.en;
    
  const venue = isNepali 
    ? event.venue?.name?.np || event.venue?.name?.en 
    : event.venue?.name?.en;
    
  const districtName = event.district 
    ? (isNepali ? event.district.name?.np || event.district.name?.en : event.district.name?.en) 
    : null;
    
  const organizer = isNepali 
    ? event.organizer?.np || event.organizer?.en 
    : event.organizer?.en;

  const contact = event.contact;
  
  const hasContact = contact?.phone || contact?.email || contact?.website;

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm sticky top-[120px]">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        {isNepali ? "कार्यक्रम विवरण" : "Event Details"}
      </h3>
      
      <div className="space-y-6">
        
        {/* Date & Time */}
        {(startDate || time) && (
          <div className="flex gap-4">
            <div className="w-12 h-12 shrink-0 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-[#1546B0] dark:text-blue-400">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
                {isNepali ? "मिति र समय" : "Date & Time"}
              </p>
              {startDate && <p className="font-medium text-slate-900 dark:text-white">{startDate}</p>}
              {time && <p className="text-slate-600 dark:text-slate-300 mt-1">{time}</p>}
              {duration && <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5"><Clock className="w-4 h-4" /> {duration}</p>}
            </div>
          </div>
        )}

        {/* Location */}
        {(venue || districtName) && (
          <div className="flex gap-4">
            <div className="w-12 h-12 shrink-0 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
                {isNepali ? "स्थान" : "Location"}
              </p>
              {venue && <p className="font-medium text-slate-900 dark:text-white">{venue}</p>}
              {districtName && (
                <div className="flex items-center gap-1.5 mt-1 text-slate-600 dark:text-slate-300">
                  <Map className="w-4 h-4" />
                  <span>{districtName}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Organizer */}
        {organizer && (
          <div className="flex gap-4">
            <div className="w-12 h-12 shrink-0 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
                {isNepali ? "आयोजक" : "Organizer"}
              </p>
              <p className="font-medium text-slate-900 dark:text-white">{organizer}</p>
            </div>
          </div>
        )}
        
        {/* Contact Information */}
        {hasContact && (
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
              {isNepali ? "सम्पर्क जानकारी" : "Contact Information"}
            </p>
            <div className="space-y-3">
              {contact.phone && (
                <a href={"tel:" + contact.phone} className="flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-[#1546B0] transition-colors group">
                  <Phone className="w-5 h-5 text-slate-400 group-hover:text-[#1546B0]" />
                  <span>{contact.phone}</span>
                </a>
              )}
              {contact.email && (
                <a href={"mailto:" + contact.email} className="flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-[#1546B0] transition-colors group">
                  <Mail className="w-5 h-5 text-slate-400 group-hover:text-[#1546B0]" />
                  <span>{contact.email}</span>
                </a>
              )}
              {contact.website && (
                <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-[#1546B0] transition-colors group">
                  <Globe className="w-5 h-5 text-slate-400 group-hover:text-[#1546B0]" />
                  <span className="truncate">{contact.website.replace(/^https?:\/\//, '')}</span>
                </a>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
