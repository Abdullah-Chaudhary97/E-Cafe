const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));

// Legacy route for backward compatibility
app.get('/user', async (req, res) => {
  try {
    // Use raw MongoDB to get all products (bypass Mongoose schema filtering)
    const db = mongoose.connection.db;
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    const productsCollection = db.collection('products');
    const allProducts = await productsCollection.find({}).toArray();
    
    // Group products by category
    const groupedProducts = {
      coffee: allProducts.filter(p => p.category === 'coffee'),
      teas: allProducts.filter(p => p.category === 'tea'),
      bakery: allProducts.filter(p => p.category === 'bakery'),
      beverages: allProducts.filter(p => p.category === 'beverages'),
      sandwich: allProducts.filter(p => p.category === 'sandwich'),
      desserts: allProducts.filter(p => p.category === 'desserts'),
    };
    
    res.json(groupedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ECafe';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;
