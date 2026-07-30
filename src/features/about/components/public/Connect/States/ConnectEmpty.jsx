import React from 'react';

export default function ConnectEmpty({ locale = 'en' }) {
  // Gracefully hide the entire Connect section if data is completely missing.
  return null;
}
