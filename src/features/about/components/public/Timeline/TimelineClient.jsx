'use client';

import React from 'react';
import TimelineHeader from './TimelineHeader';
import TimelineContainer from './TimelineContainer';

export default function TimelineClient({ data, locale }) {
  const { timeline } = data;

  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="w-full">
      <TimelineHeader timelineData={timeline} locale={locale} />
      <TimelineContainer timelineItems={timeline} locale={locale} />
    </div>
  );
}
