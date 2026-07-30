import React from 'react';

export default function StrategyEmpty({ locale = 'en' }) {
  // Gracefully hide the entire Strategy section if data is completely missing.
  return null;
}
