import apiClient from './axios';

/**
 * Reservation API Service
 * Handles all reservation-related API calls
 */

export const reservationAPI = {
  /**
   * Create a new reservation
   * @param {Object} reservationData - Reservation data (name, email, phone, date, time, guests, specialRequests)
   */
  createReservation: async (reservationData) => {
    try {
      const response = await apiClient.post('/api/reservations', reservationData);
      return response.data;
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  },

  /**
   * Get user's reservations (requires authentication)
   */
  getUserReservations: async () => {
    try {
      const response = await apiClient.get('/api/reservations');
      return response.data;
    } catch (error) {
      console.error('Error fetching reservations:', error);
      throw error;
    }
  },

  /**
   * Get reservation by ID (requires authentication)
   * @param {string} reservationId - Reservation ID
   */
  getReservationById: async (reservationId) => {
    try {
      const response = await apiClient.get(`/api/reservations/${reservationId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching reservation:', error);
      throw error;
    }
  },

  /**
   * Cancel a reservation (requires authentication)
   * @param {string} reservationId - Reservation ID
   */
  cancelReservation: async (reservationId) => {
    try {
      const response = await apiClient.delete(`/api/reservations/${reservationId}`);
      return response.data;
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      throw error;
    }
  },
};

export default reservationAPI;
