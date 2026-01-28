const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ECafe';

const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Reservation = require('../models/Reservation');

async function checkIdTypes() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB\n');

    // Check Users
    const users = await User.find().limit(5);
    console.log(`📊 Users (showing first ${users.length}):`);
    users.forEach(u => {
      console.log(`   ID: ${u._id} (type: ${typeof u._id}, isObjectId: ${u._id instanceof mongoose.Types.ObjectId})`);
    });

    // Check Products
    const products = await Product.find().limit(5);
    const productsWithUndefinedIds = await Product.countDocuments({ _id: { $exists: false } });
    console.log(`\n📊 Products (showing first ${products.length}, ${productsWithUndefinedIds} with undefined IDs):`);
    products.forEach(p => {
      const idType = p._id === undefined ? 'undefined' : typeof p._id;
      const isObjectId = p._id ? (p._id instanceof mongoose.Types.ObjectId) : false;
      console.log(`   ID: ${p._id} (type: ${idType}, isObjectId: ${isObjectId})`);
    });

    // Check Carts
    const carts = await Cart.find().limit(3);
    console.log(`\n📊 Carts (showing first ${carts.length}):`);
    carts.forEach(c => {
      console.log(`   ID: ${c._id} (type: ${typeof c._id}, user: ${c.user} (type: ${typeof c.user}))`);
    });

    // Check Orders
    const orders = await Order.find().limit(3);
    console.log(`\n📊 Orders (showing first ${orders.length}):`);
    orders.forEach(o => {
      console.log(`   ID: ${o._id} (type: ${typeof o._id}, user: ${o.user} (type: ${typeof o.user}))`);
    });

    // Check Reservations
    const reservations = await Reservation.find().limit(3);
    console.log(`\n📊 Reservations (showing first ${reservations.length}):`);
    reservations.forEach(r => {
      console.log(`   ID: ${r._id} (type: ${typeof r._id}, user: ${r.user} (type: ${typeof r.user}))`);
    });

    // Summary
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalCarts = await Cart.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalReservations = await Reservation.countDocuments();

    console.log(`\n📈 Summary:`);
    console.log(`   Total Users: ${totalUsers}`);
    console.log(`   Total Products: ${totalProducts}`);
    console.log(`   Total Carts: ${totalCarts}`);
    console.log(`   Total Orders: ${totalOrders}`);
    console.log(`   Total Reservations: ${totalReservations}`);

    console.log('\n✅ Check completed!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
}

checkIdTypes();
