/**
 * Application Routes Configuration
 */

export const ROUTES = {
  // Public Routes
  HOME: '/',
  PRODUCTS: '/Product',
  PRODUCT_DETAIL: '/product/:id',
  CART: '/Cart',
  CHECKOUT: '/Checkout',
  ABOUT: '/AboutUs',
  RESERVATION: '/Reservation',
  
  // Auth Routes
  LOGIN: '/LogIn',
  SIGNUP: '/SignUp',
  
  // Protected Routes
  PROFILE: '/Profile',
  ORDERS: '/Orders',
  ORDER_DETAIL: '/Orders/:id',
  
  // Admin Routes
  ADMIN: '/admin',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_USERS: '/admin/users',
};

// Route categories for navigation
export const ROUTE_CATEGORIES = {
  PUBLIC: [
    { path: ROUTES.HOME, label: 'Home' },
    { path: ROUTES.PRODUCTS, label: 'Menu' },
    { path: ROUTES.ABOUT, label: 'About' },
  ],
  AUTH: [
    { path: ROUTES.LOGIN, label: 'Login' },
    { path: ROUTES.SIGNUP, label: 'SignUp' },
  ],
};
