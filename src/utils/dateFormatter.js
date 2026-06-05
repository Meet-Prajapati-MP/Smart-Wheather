/**
 * Formats a UTC timestamp into local time of the target city based on its timezone offset.
 * 
 * @param {number} utcSeconds - The UTC timestamp in seconds
 * @param {number} timezoneOffsetSeconds - The timezone offset of the city in seconds
 * @returns {string} The formatted local time (e.g. "06:12 AM")
 */
export const formatLocalTime = (utcSeconds, timezoneOffsetSeconds) => {
  if (utcSeconds === undefined || utcSeconds === null) return 'N/A';
  
  // Calculate local time for the target city
  const utcMs = utcSeconds * 1000;
  const localMs = utcMs + (timezoneOffsetSeconds * 1000);
  const date = new Date(localMs);
  
  // Use UTC methods to read components since we manually offset the milliseconds
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
  return `${displayHours}:${displayMinutes} ${ampm}`;
};

/**
 * Formats a UTC timestamp into a human-readable last updated string.
 * 
 * @param {number} utcSeconds - The UTC timestamp in seconds
 * @returns {string} Formatted string (e.g., "Just now" or "10:14 AM")
 */
export const formatLastUpdated = (utcSeconds) => {
  if (!utcSeconds) return 'N/A';
  const date = new Date(utcSeconds * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${displayHours}:${displayMinutes} ${ampm}`;
};
