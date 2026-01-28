/**
 * Utility functions for formatting data
 */

/**
 * Format price to currency
 * @param {number|string} price - Price value
 * @param {string} currency - Currency symbol (default: $)
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, currency = '$') => {
  const numPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : price;
  if (isNaN(numPrice)) return `${currency}0.00`;
  return `${currency}${numPrice.toFixed(2)}`;
};

/**
 * Format date to readable string
 * @param {string|Date} date - Date value
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format date and time
 * @param {string|Date} date - Date value
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
