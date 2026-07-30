import React from 'react';

export default function HeroEmpty({ locale = 'en' }) {
  // If the hero is explicitly disabled or empty, we can return null to collapse it gracefully,
  // or a minimal placeholder if required. For production, returning null is usually best to not break layout.
  return null;
}
