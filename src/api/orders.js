import apiClient from './axios';

/**
 * Orders API Service
 * Handles all order-related API calls
 */

export const orderAPI = {
  /**
   * Create a new order
   * @param {Object} orderData - Order data
   */
  createOrder: async (orderData) => {
    try {
      const response = await apiClient.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  /**
   * Get all orders for current user
   */
  getUserOrders: async () => {
    try {
      const response = await apiClient.get('/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  },

  /**
   * Get order by ID
   * @param {string|number} orderId - Order ID
   */
  getOrderById: async (orderId) => {
    try {
      const response = await apiClient.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  /**
   * Update order status (Admin only)
   * @param {string|number} orderId - Order ID
   * @param {string} status - New status
   */
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await apiClient.put(`/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  /**
   * Get all orders (Admin only)
   */
  getAllOrders: async () => {
    try {
      const response = await apiClient.get('/admin/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching all orders:', error);
      throw error;
    }
  },
};

export default orderAPI;
