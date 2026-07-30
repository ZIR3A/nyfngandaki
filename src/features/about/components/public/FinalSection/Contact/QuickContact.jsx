'use client';

import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function QuickContact({ contact, locale = 'en' }) {
  if (!contact) return null;

  const isNp = locale === 'np';

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm h-full">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 font-serif">
        {isNp ? 'à¤¸à¤®à¥à¤ªà¤°à¥à¤• à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€' : 'Quick Contact'}
      </h3>
      
      <div className="space-y-6">
        {contact.office && (
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-50 dark:bg-slate-800 rounded-lg text-primary-blue flex-shrink-0 mt-1">
              <MapPin size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{isNp ? 'à¤•à¤¾à¤°à¥à¤¯à¤¾à¤²à¤¯' : 'Office Address'}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{contact.office?.[locale]}</p>
            </div>
          </div>
        )}

        {(contact.phone || contact.email) && (
          <div className="flex flex-col sm:flex-row gap-6">
            {contact.phone && (
              <div className="flex items-center gap-4 flex-1">
                <div className="p-2 bg-blue-50 dark:bg-slate-800 rounded-lg text-primary-blue flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{isNp ? 'à¤«à¥‹à¤¨' : 'Phone'}</p>
                  <a href={`tel:${contact.phone}`} className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-blue transition-colors">
                    {contact.phone}
                  </a>
                </div>
              </div>
            )}
            
            {contact.email && (
              <div className="flex items-center gap-4 flex-1">
                <div className="p-2 bg-blue-50 dark:bg-slate-800 rounded-lg text-primary-blue flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{isNp ? 'à¤‡à¤®à¥‡à¤²' : 'Email'}</p>
                  <a href={`mailto:${contact.email}`} className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-blue transition-colors break-all">
                    {contact.email}
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {contact.hours && (
           <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-50 dark:bg-slate-800 rounded-lg text-primary-blue flex-shrink-0">
              <Clock size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{isNp ? 'à¤–à¥à¤²à¤¾ à¤°à¤¹à¤¨à¥‡ à¤¸à¤®à¤¯' : 'Working Hours'}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{contact.hours?.[locale]}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
