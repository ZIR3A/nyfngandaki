/**
 * Event utilities
 */

/**
 * Format event date range
 */
export const formatEventDate = (startDate, endDate, language = 'en') => {
  if (!startDate) return '';
  const start = new Date(startDate);
  
  if (!endDate) {
    return start.toLocaleDateString(language === 'en' ? 'en-US' : 'ne-NP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  const end = new Date(endDate);
  
  // If same day
  if (start.toDateString() === end.toDateString()) {
    return start.toLocaleDateString(language === 'en' ? 'en-US' : 'ne-NP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  // If different days
  return `${start.toLocaleDateString(language === 'en' ? 'en-US' : 'ne-NP', {
    month: 'short',
    day: 'numeric',
  })} - ${end.toLocaleDateString(language === 'en' ? 'en-US' : 'ne-NP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })}`;
};
