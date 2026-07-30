import React from 'react';

export default function WhoWeAreEmpty({ locale = 'en' }) {
  // Graceful degradation when the content is completely missing or disabled from CMS
  return null;
}
