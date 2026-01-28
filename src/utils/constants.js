/**
 * Application Constants
 */

// Product Categories
export const PRODUCT_CATEGORIES = {
  COFFEE: 'coffee',
  TEA: 'tea',
  BAKERY: 'bakery',
  BEVERAGES: 'beverages',
  SANDWICH: 'sandwich',
  DESSERTS: 'desserts',
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
  REFUNDED: 'Refunded',
};

// Reservation Status
export const RESERVATION_STATUS = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  CANCELLED: 'Cancelled',
  COMPLETED: 'Completed',
};

// Shipping Methods
export const SHIPPING_METHODS = {
  NEXT_DAY: {
    id: 'next_day',
    name: 'Next Day Delivery',
    price: 4.99,
  },
  STANDARD: {
    id: 'standard',
    name: 'Standard Delivery',
    price: 1.99,
  },
  PICKUP: {
    id: 'pickup',
    name: 'Personal Pickup',
    price: 0,
  },
};

// Local Storage Keys
export const STORAGE_KEYS = {
  CART: 'cart',
  USER: 'user',
  AUTH_TOKEN: 'authToken',
  THEME: 'theme',
};

// API Endpoints (for reference)
export const API_ENDPOINTS = {
  PRODUCTS: '/user',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
  },
  ORDERS: {
    BASE: '/orders',
    CREATE: '/orders',
    GET_USER_ORDERS: '/orders',
    GET_ORDER: (id) => `/orders/${id}`,
  },
  RESERVATIONS: {
    BASE: '/reservations',
    CREATE: '/reservations',
    GET_USER_RESERVATIONS: '/reservations',
    GET_RESERVATION: (id) => `/reservations/${id}`,
  },
};
