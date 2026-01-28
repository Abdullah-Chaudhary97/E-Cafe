# E-Cafe E-Commerce Platform

A modern, full-featured e-commerce platform for a cafe/restaurant built with React.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Available Scripts](#available-scripts)
- [Project Status](#project-status)
- [Next Steps](#next-steps)

## ✨ Features

### ✅ Implemented

- **Product Catalog**: Browse products by category (Coffee, Tea, Bakery, Beverages, Sandwiches, Desserts)
- **Shopping Cart**: Add/remove items, update quantities, persistent cart storage
- **User Authentication**: Login and registration (UI ready, backend integration pending)
- **Responsive Design**: Mobile-friendly interface with Bootstrap
- **Admin Dashboard**: Order management interface
- **Table Reservations**: Book a table functionality
- **Professional Architecture**: Clean code structure with Context API, API service layer

### 🚧 In Progress / Planned

- Product detail pages
- Checkout process
- Order placement and confirmation
- Payment integration (Stripe/PayPal)
- User profile and order history
- Product search and filtering
- Email notifications
- Order tracking

## 📁 Project Structure

```
E-Cafe/
├── public/                 # Static assets
├── src/
│   ├── api/               # API service layer
│   │   ├── axios.js       # Axios configuration
│   │   ├── products.js    # Product API calls
│   │   ├── auth.js        # Authentication API
│   │   ├── orders.js      # Orders API
│   │   └── reservations.js # Reservations API
│   │
│   ├── components/        # React components
│   │   ├── common/        # Reusable UI components
│   │   │   ├── Button/
│   │   │   └── Loading/
│   │   ├── layout/        # Layout components
│   │   │   ├── Header/
│   │   │   ├── NavBar/
│   │   │   └── Footer/
│   │   ├── features/      # Feature components
│   │   └── [existing components]
│   │
│   ├── contexts/          # React Context providers
│   │   ├── CartContext.jsx
│   │   └── AuthContext.jsx
│   │
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   │   ├── formatters.js
│   │   ├── validators.js
│   │   └── constants.js
│   │
│   ├── config/            # Configuration files
│   │   └── routes.js
│   │
│   ├── App.js             # Main app component
│   └── index.js           # Entry point
│
├── .env                   # Environment variables
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API server running on `http://localhost:4000` (or configure in `.env`)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd E-Cafe
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy .env.example to .env (if exists) or create .env file
# See Environment Variables section below
```

4. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:4000
REACT_APP_API_TIMEOUT=10000

# Application Configuration
REACT_APP_ENVIRONMENT=development
REACT_APP_APP_NAME=E-Cafe

# Payment Gateway (Add when integrating)
# REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
# REACT_APP_PAYPAL_CLIENT_ID=your_paypal_client_id

# Database (Will be configured later)
# REACT_APP_DB_CONNECTION_STRING=your_database_connection_string
```

## 🔌 API Integration

### API Service Layer

The project uses a centralized API service layer located in `src/api/`:

- **axios.js**: Configured axios instance with interceptors
- **products.js**: Product-related API calls
- **auth.js**: Authentication API calls
- **orders.js**: Order management API calls
- **reservations.js**: Reservation API calls

### Expected API Endpoints

#### Products
- `GET /user` - Get all products (returns object with categories)

#### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `GET /auth/me` - Get current user

#### Orders
- `POST /orders` - Create new order
- `GET /orders` - Get user orders
- `GET /orders/:id` - Get order by ID

#### Reservations
- `POST /reservations` - Create reservation
- `GET /reservations` - Get user reservations

## 🗂️ State Management

### Cart Context

Manages shopping cart state with localStorage persistence:

```javascript
import { useCart } from './contexts/CartContext';

const { 
  items,           // Cart items array
  addToCart,       // Add product to cart
  removeFromCart,  // Remove product from cart
  updateQuantity,  // Update item quantity
  clearCart,       // Clear entire cart
  getCartTotal,    // Calculate total price
  getCartItemCount // Get total item count
} = useCart();
```

### Auth Context

Manages user authentication state:

```javascript
import { useAuth } from './contexts/AuthContext';

const {
  user,            // Current user object
  isAuthenticated, // Boolean auth status
  loading,         // Loading state
  login,           // Login function
  register,        // Register function
  logout,          // Logout function
  updateUser       // Update user profile
} = useAuth();
```

## 📜 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 📊 Project Status

### Current State

✅ **Completed:**
- Project structure reorganization
- API service layer
- Context API for Cart and Auth
- Environment variables setup
- Common UI components (Button, Loading)
- Updated Coffee component to use new structure

🔄 **In Progress:**
- Updating remaining menu components
- Cart functionality integration
- Checkout flow

⏭️ **Next Steps:**
- Complete all menu components update
- Implement checkout process
- Add product detail pages
- Connect authentication to backend
- Add order history
- Payment integration

## 🎯 Next Steps

1. **Update Remaining Components**
   - Update all menu components (Tea, Bakery, etc.) to use new API and Cart context
   - Add cart badge to NavBar
   - Update Cart page to use Cart context

2. **Checkout Flow**
   - Create Checkout page
   - Add shipping address form
   - Integrate payment gateway
   - Order confirmation page

3. **Product Features**
   - Product detail pages
   - Product search
   - Product filtering/sorting

4. **User Features**
   - Complete authentication flow
   - User profile page
   - Order history
   - Order tracking

5. **Backend Integration**
   - Connect to database
   - Implement API endpoints
   - Add authentication middleware
   - Set up payment processing

## 📝 Notes

- The project uses React Router v6 for routing
- Bootstrap 5 is used for styling
- All API calls are centralized in the `api/` directory
- Cart state persists in localStorage
- Environment variables are prefixed with `REACT_APP_` for Create React App

## 🤝 Contributing

1. Follow the existing code structure
2. Use the API service layer for all API calls
3. Use Context API for state management
4. Follow React best practices
5. Add proper error handling

## 📄 License

[Add your license here]

---

**Built with ❤️ using React**
