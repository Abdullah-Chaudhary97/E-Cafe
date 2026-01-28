# E-Cafe Backend Server

Express.js backend server for E-Cafe e-commerce platform with MongoDB.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Configure Environment**
   - The `.env` file is already configured with MongoDB URI
   - Update `JWT_SECRET` in production

3. **Seed Database**
   ```bash
   npm run seed
   ```
   This will populate the database with sample products.

4. **Start Server**
   ```bash
   # Development mode (with nodemon)
   npm run dev
   
   # Production mode
   npm start
   ```

   Server runs on `http://localhost:4000`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search?q=query` - Search products
- `GET /api/products/:id` - Get product by ID
- `GET /user` - Legacy endpoint (returns grouped products)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update profile (protected)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `GET /api/orders/all` - Get all orders (admin only)
- `PUT /api/orders/:id/status` - Update order status (admin only)

### Reservations
- `POST /api/reservations` - Create reservation
- `GET /api/reservations` - Get user reservations (protected)
- `GET /api/reservations/:id` - Get reservation by ID (protected)
- `DELETE /api/reservations/:id` - Cancel reservation (protected)

## Models

### User
- name, email, password, phone
- role (user/admin)
- addresses array

### Product
- title, productTitle, description, price, image
- category (coffee, tea, bakery, beverages, sandwich, desserts)
- inStock, stockQuantity, featured

### Order
- user, items[], subtotal, shipping, total
- shippingMethod, status, shippingAddress

### Reservation
- user, name, email, phone, date, time, guests
- status, specialRequests

## Database

Connected to MongoDB Atlas:
- Cluster: RentABazar
- Database: ECafe
