import apiClient from './axios';

/**
 * Authentication API Service
 * Handles all authentication-related API calls
 */

export const authAPI = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.name - User name
   * @param {string} userData.email - User email
   * @param {string} userData.password - User password
   * @param {string} userData.phone - User phone number
   */
  register: async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },

  /**
   * Login user
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.email - User email
   * @param {string} credentials.password - User password
   */
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout: async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  },

  /**
   * Get current user profile
   */
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  /**
   * Update user profile
   * @param {Object} userData - Updated user data
   */
  updateProfile: async (userData) => {
    try {
      const response = await apiClient.put('/auth/profile', userData);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },
};

export default authAPI;
