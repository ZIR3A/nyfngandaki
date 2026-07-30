import React from 'react';

export default function DocumentsEmpty({ locale = 'en' }) {
  // Gracefully hide the entire Documents section if data is completely missing.
  return null;
}
