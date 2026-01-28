import apiClient from './axios';

/**
 * Cart API Service
 * Handles all cart-related API calls
 */

export const cartAPI = {
  /**
   * Get user's cart
   */
  getCart: async () => {
    try {
      const response = await apiClient.get('/cart');
      return response.data.cart.items || [];
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  /**
   * Add item to cart
   * @param {Object} item - Cart item { productId, quantity, category }
   */
  addToCart: async (item) => {
    try {
      const response = await apiClient.post('/cart/add', {
        productId: item.id || item.productId,
        quantity: item.quantity || 1,
        category: item.category,
      });
      return response.data.cart.items || [];
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  /**
   * Update cart item quantity
   * @param {Object} item - Cart item { productId, quantity, category }
   */
  updateCartItem: async (item) => {
    try {
      const response = await apiClient.put('/cart/update', {
        productId: item.id || item.productId,
        quantity: item.quantity,
        category: item.category,
      });
      return response.data.cart.items || [];
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  },

  /**
   * Remove item from cart
   * @param {Object} item - Cart item { productId, category }
   */
  removeFromCart: async (item) => {
    try {
      const response = await apiClient.delete('/cart/remove', {
        data: {
          productId: item.id || item.productId,
          category: item.category,
        },
      });
      return response.data.cart.items || [];
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  /**
   * Clear cart
   */
  clearCart: async () => {
    try {
      const response = await apiClient.delete('/cart/clear');
      return response.data.cart.items || [];
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },

  /**
   * Merge guest cart with user cart (on login)
   * @param {Array} guestCartItems - Items from localStorage
   */
  mergeCart: async (guestCartItems) => {
    try {
      const response = await apiClient.post('/cart/merge', {
        guestCartItems,
      });
      return response.data.cart.items || [];
    } catch (error) {
      console.error('Error merging cart:', error);
      throw error;
    }
  },
};

export default cartAPI;
