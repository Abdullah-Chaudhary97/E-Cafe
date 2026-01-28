const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ECafe';

// Import models
const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Reservation = require('../models/Reservation');
const { Sequence } = require('../models/Sequence');

/**
 * Migration script to convert ObjectIds to numeric IDs
 * WARNING: This will modify your database. Backup first!
 */
async function migrateToNumericIds() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Create mapping collections to store old ObjectId -> new numeric ID
    const userMap = new Map();
    const productMap = new Map();

    // Step 1: Migrate Users
    console.log('\n📦 Step 1: Migrating Users...');
    const users = await User.find();
    const usersToMigrate = users.filter(u => u._id && typeof u._id !== 'number');
    console.log(`Found ${usersToMigrate.length} users to migrate (out of ${users.length} total)`);

    for (const user of usersToMigrate) {
      if (!user._id) {
        console.log('⚠️  Skipping user with no _id');
        continue;
      }
      const oldId = user._id.toString ? user._id.toString() : String(user._id);
      const newId = await getNextSequence('users');
      userMap.set(oldId, newId);
      
      // Create new user with numeric ID
      const newUser = new User({
        _id: newId,
        name: user.name,
        email: user.email,
        password: user.password,
        phone: user.phone,
        role: user.role,
        addresses: user.addresses,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
      
      await newUser.save();
      await User.deleteOne({ _id: oldId });
      console.log(`Migrated user: ${oldId} -> ${newId}`);
    }

    // Step 2: Migrate Products
    console.log('\n📦 Step 2: Migrating Products...');
    const products = await Product.find();
    const productsToMigrate = products.filter(p => p._id && typeof p._id !== 'number');
    console.log(`Found ${productsToMigrate.length} products to migrate (out of ${products.length} total)`);

    for (const product of productsToMigrate) {
      if (!product._id) {
        console.log('⚠️  Skipping product with no _id');
        continue;
      }
      const oldId = product._id.toString ? product._id.toString() : String(product._id);
      const newId = await getNextSequence('products');
      productMap.set(oldId, newId);
      
      const newProduct = new Product({
        _id: newId,
        title: product.title,
        productTitle: product.productTitle,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        inStock: product.inStock,
        stockQuantity: product.stockQuantity,
        featured: product.featured,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      });
      
      await newProduct.save();
      await Product.deleteOne({ _id: oldId });
      console.log(`Migrated product: ${oldId} -> ${newId}`);
    }

    // Step 3: Migrate Carts (update references)
    console.log('\n📦 Step 3: Migrating Carts...');
    const carts = await Cart.find();
    const cartsToMigrate = carts.filter(c => c._id && typeof c._id !== 'number');
    console.log(`Found ${cartsToMigrate.length} carts to migrate (out of ${carts.length} total)`);

    for (const cart of cartsToMigrate) {
      if (!cart._id) {
        console.log('⚠️  Skipping cart with no _id');
        continue;
      }
      const oldCartId = cart._id.toString ? cart._id.toString() : String(cart._id);
      const newCartId = await getNextSequence('carts');
      const userKey = cart.user ? (cart.user.toString ? cart.user.toString() : String(cart.user)) : null;
      const newUserId = userKey ? userMap.get(userKey) : null;
      
      if (!newUserId) {
        console.log(`⚠️  Skipping cart ${oldCartId}: user not found`);
        continue;
      }

      const updatedItems = cart.items.map(item => {
        const productKey = item.product ? (item.product.toString ? item.product.toString() : String(item.product)) : null;
        return {
          product: productKey ? (productMap.get(productKey) || item.product) : item.product,
          quantity: item.quantity,
          price: item.price,
          category: item.category,
        };
      });

      const newCart = new Cart({
        _id: newCartId,
        user: newUserId,
        items: updatedItems,
        updatedAt: cart.updatedAt,
        createdAt: cart.createdAt,
      });
      
      await newCart.save();
      await Cart.deleteOne({ _id: oldCartId });
      console.log(`Migrated cart: ${oldCartId} -> ${newCartId}`);
    }

    // Step 4: Migrate Orders (update references)
    console.log('\n📦 Step 4: Migrating Orders...');
    const orders = await Order.find();
    const ordersToMigrate = orders.filter(o => o._id && typeof o._id !== 'number');
    console.log(`Found ${ordersToMigrate.length} orders to migrate (out of ${orders.length} total)`);

    for (const order of ordersToMigrate) {
      if (!order._id) {
        console.log('⚠️  Skipping order with no _id');
        continue;
      }
      const oldOrderId = order._id.toString ? order._id.toString() : String(order._id);
      const newOrderId = await getNextSequence('orders');
      const userKey = order.user ? (order.user.toString ? order.user.toString() : String(order.user)) : null;
      const newUserId = userKey ? userMap.get(userKey) : null;
      
      if (!newUserId) {
        console.log(`⚠️  Skipping order ${oldOrderId}: user not found`);
        continue;
      }

      const updatedItems = order.items.map(item => ({
        product: productMap.get(item.product.toString()) || item.product,
        quantity: item.quantity,
        price: item.price,
      }));

      const newOrder = new Order({
        _id: newOrderId,
        user: newUserId,
        items: updatedItems,
        subtotal: order.subtotal,
        shipping: order.shipping,
        total: order.total,
        shippingMethod: order.shippingMethod,
        status: order.status,
        shippingAddress: order.shippingAddress,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      });
      
      await newOrder.save();
      await Order.deleteOne({ _id: oldOrderId });
      console.log(`Migrated order: ${oldOrderId} -> ${newOrderId}`);
    }

    // Step 5: Migrate Reservations (update references)
    console.log('\n📦 Step 5: Migrating Reservations...');
    const reservations = await Reservation.find();
    const reservationsToMigrate = reservations.filter(r => r._id && typeof r._id !== 'number');
    console.log(`Found ${reservationsToMigrate.length} reservations to migrate (out of ${reservations.length} total)`);

    for (const reservation of reservationsToMigrate) {
      if (!reservation._id) {
        console.log('⚠️  Skipping reservation with no _id');
        continue;
      }
      const oldReservationId = reservation._id.toString ? reservation._id.toString() : String(reservation._id);
      const newReservationId = await getNextSequence('reservations');
      const userKey = reservation.user ? (reservation.user.toString ? reservation.user.toString() : String(reservation.user)) : null;
      const newUserId = userKey ? userMap.get(userKey) : null;
      
      const newReservation = new Reservation({
        _id: newReservationId,
        user: newUserId,
        name: reservation.name,
        email: reservation.email,
        phone: reservation.phone,
        date: reservation.date,
        time: reservation.time,
        guests: reservation.guests,
        status: reservation.status,
        specialRequests: reservation.specialRequests,
        createdAt: reservation.createdAt,
        updatedAt: reservation.updatedAt,
      });
      
      await newReservation.save();
      await Reservation.deleteOne({ _id: oldReservationId });
      console.log(`Migrated reservation: ${oldReservationId} -> ${newReservationId}`);
    }

    console.log('\n✅ Migration completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Users migrated: ${userMap.size}`);
    console.log(`   - Products migrated: ${productMap.size}`);
    console.log(`   - Carts migrated: ${cartsToMigrate.length}`);
    console.log(`   - Orders migrated: ${ordersToMigrate.length}`);
    console.log(`   - Reservations migrated: ${reservationsToMigrate.length}`);

  } catch (error) {
    console.error('❌ Migration error:', error);
    throw error;
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
}

// Helper function to get next sequence (same as in Sequence model)
async function getNextSequence(collectionName) {
  const sequence = await Sequence.findByIdAndUpdate(
    collectionName,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return sequence.seq;
}

// Run migration if called directly
if (require.main === module) {
  migrateToNumericIds()
    .then(() => {
      console.log('\n✨ Migration script finished');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Migration failed:', error);
      process.exit(1);
    });
}

module.exports = migrateToNumericIds;
