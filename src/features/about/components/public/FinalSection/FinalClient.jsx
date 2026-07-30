'use client';

import React from 'react';
import FinalCTA from './FinalCTA/FinalCTA';

export default function FinalClient({ data, locale = 'en' }) {
  const { cta } = data;

  return (
    <div className="w-full relative z-10 bg-white dark:bg-slate-950">
      {/* Final Membership CTA */}
      <FinalCTA cta={cta} locale={locale} />
    </div>
  );
}
