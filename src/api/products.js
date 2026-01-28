import apiClient from './axios';

/**
 * Product API Service
 * Handles all product-related API calls
 */

export const productAPI = {
  /**
   * Get all products
   */
  getAllProducts: async () => {
    try {
      const response = await apiClient.get('/user');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  /**
   * Get products by category
   * @param {string} category - Category name (coffee, tea, bakery, beverages, sandwich, desserts)
   */
  getProductsByCategory: async (category) => {
    try {
      let products = [];
      
      // Try new API endpoint first
      try {
        const response = await apiClient.get(`/api/products/category/${category}`);
        products = response.data || [];
      } catch (apiError) {
        // Fallback to legacy endpoint
        const response = await apiClient.get('/user');
        const categoryMap = {
          coffee: 'coffee',
          tea: 'teas',
          bakery: 'bakery',
          beverages: 'beverages',
          sandwich: 'sandwich',
          desserts: 'desserts',
        };
        const categoryKey = categoryMap[category] || category;
        products = response.data[categoryKey] || [];
      }
      
      // Normalize product IDs (convert _id to id for consistency)
      return products.map(product => {
        const id = product._id || product.id;
        const title = product.productTitle || product.title;
        
        // Generate slug if not present
        let slug = product.slug;
        if (!slug && title && id) {
          slug = title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '') + `-${id}`;
        }
        
        return {
          ...product,
          id: id,
          productId: id || product.productId,
          slug: slug || id?.toString() || '',
        };
      });
    } catch (error) {
      console.error(`Error fetching ${category} products:`, error);
      throw error;
    }
  },

  /**
   * Get single product by ID
   * @param {string|number} productId - Product ID
   */
  getProductById: async (productId) => {
    try {
      // Try new API endpoint first
      try {
        const response = await apiClient.get(`/api/products/${productId}`);
        return {
          ...response.data,
          id: response.data._id || response.data.id,
          productId: response.data._id || response.data.id || response.data.productId,
        };
      } catch (apiError) {
        // Fallback to legacy endpoint
        const response = await apiClient.get('/user');
        const categories = ['coffee', 'teas', 'bakery', 'beverages', 'sandwich', 'desserts'];
        for (const category of categories) {
          const products = response.data[category] || [];
          const product = products.find((p) => (p.id === productId) || (p._id === productId));
          if (product) {
            return {
              ...product,
              id: product._id || product.id,
              productId: product._id || product.id || product.productId,
            };
          }
        }
        throw new Error('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  /**
   * Search products
   * @param {string} query - Search query
   */
  searchProducts: async (query) => {
    try {
      const response = await apiClient.get('/user');
      const categories = ['coffee', 'teas', 'bakery', 'beverages', 'sandwich', 'desserts'];
      const results = [];
      
      categories.forEach((category) => {
        const products = response.data[category] || [];
        const matched = products.filter((product) => {
          const title = product.title || product.productTitle || '';
          const description = product.description || '';
          const searchText = `${title} ${description}`.toLowerCase();
          return searchText.includes(query.toLowerCase());
        });
        results.push(...matched);
      });
      
      return results;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },
};

export default productAPI;
