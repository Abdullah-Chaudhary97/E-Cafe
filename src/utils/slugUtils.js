/**
 * Generate slug from product title and ID
 * @param {string} title - Product title
 * @param {number|string} id - Product ID
 * @returns {string} - Slug in format "productname-id"
 */
export function generateProductSlug(title, id) {
  if (!title || !id) return null;
  
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  
  return `${slug}-${id}`;
}

/**
 * Get product slug from product object
 * @param {object} product - Product object
 * @returns {string} - Slug or generated slug
 */
export function getProductSlug(product) {
  if (!product) return '';
  
  // Use existing slug if available
  if (product.slug) {
    return product.slug;
  }
  
  // Generate slug from title and ID
  const title = product.productTitle || product.title;
  const id = product.id || product._id;
  
  if (title && id) {
    return generateProductSlug(title, id);
  }
  
  // Fallback to ID if no title
  if (id) {
    return id.toString();
  }
  
  return '';
}
