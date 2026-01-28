const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ECafe';

const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Reservation = require('../models/Reservation');
const { getNextSequence } = require('../models/Sequence');

/**
 * Fix documents with undefined IDs by assigning numeric IDs
 */
async function fixUndefinedIds() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB\n');

    // Fix Products with undefined IDs or ObjectIds
    console.log('📦 Fixing Products with ObjectIds or undefined IDs...');
    
    // Use raw MongoDB collection to find ALL products (bypass Mongoose schema filtering)
    const db = mongoose.connection.db;
    const productsCollection = db.collection('products');
    const allProducts = await productsCollection.find({}).toArray();
    
    // Filter products that don't have numeric IDs (ObjectIds or undefined)
    const productsToFix = allProducts.filter(p => {
      const id = p._id;
      // Check if it's NOT a number (ObjectIds are objects, undefined is undefined)
      if (!id) return true; // undefined or null
      if (typeof id === 'number') return false; // Already numeric, skip
      // It's an ObjectId or other non-numeric type
      return true;
    });
    
    console.log(`Found ${productsToFix.length} products to fix (out of ${allProducts.length} total)`);
    
    if (productsToFix.length === 0 && allProducts.length > 0) {
      console.log('ℹ️  All products already have numeric IDs. Checking if slugs need generation...');
      const productsWithoutSlugs = allProducts.filter(p => !p.slug && typeof p._id === 'number');
      if (productsWithoutSlugs.length > 0) {
        console.log(`   Found ${productsWithoutSlugs.length} products without slugs. Run "npm run generate-slugs" to add them.`);
      }
    }

    for (const product of productsToFix) {
      const oldId = product._id;
      const oldIdString = oldId?.toString ? oldId.toString() : String(oldId);
      const newId = await getNextSequence('products');
      
      // Generate slug for the product
      const title = product.productTitle || product.title || 'product';
      const slug = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '') + `-${newId}`;
      
      // Create new product with numeric ID using raw collection insert
      const newProductDoc = {
        _id: newId,
        title: product.title,
        productTitle: product.productTitle,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        inStock: product.inStock !== undefined ? product.inStock : true,
        stockQuantity: product.stockQuantity !== undefined ? product.stockQuantity : 100,
        featured: product.featured !== undefined ? product.featured : false,
        slug: slug,
        createdAt: product.createdAt || new Date(),
        updatedAt: product.updatedAt || new Date(),
      };
      
      await productsCollection.insertOne(newProductDoc);
      
      // Delete old product using raw collection
      await productsCollection.deleteOne({ _id: oldId });
      
      console.log(`Fixed product: ${oldIdString} -> ${newId} ("${title}") - slug: ${slug}`);
    }

    // Fix Users with undefined IDs
    console.log('\n📦 Fixing Users with undefined IDs...');
    const users = await User.find({ $or: [
      { _id: null },
      { _id: { $exists: false } }
    ]});
    console.log(`Found ${users.length} users with undefined/null IDs`);

    for (const user of users) {
      const newId = await getNextSequence('users');
      
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
      
      if (user._id) {
        await User.deleteOne({ _id: user._id });
      } else {
        await User.deleteOne({ email: user.email, _id: { $exists: false } });
      }
      
      console.log(`Fixed user: assigned ID ${newId} to "${user.email}"`);
    }

    // Fix Carts with undefined IDs
    console.log('\n📦 Fixing Carts with undefined IDs...');
    const carts = await Cart.find({ $or: [
      { _id: null },
      { _id: { $exists: false } }
    ]});
    console.log(`Found ${carts.length} carts with undefined/null IDs`);

    for (const cart of carts) {
      const newId = await getNextSequence('carts');
      
      const newCart = new Cart({
        _id: newId,
        user: cart.user,
        items: cart.items,
        updatedAt: cart.updatedAt,
        createdAt: cart.createdAt,
      });
      
      await newCart.save();
      
      if (cart._id) {
        await Cart.deleteOne({ _id: cart._id });
      } else {
        await Cart.deleteOne({ user: cart.user, _id: { $exists: false } });
      }
      
      console.log(`Fixed cart: assigned ID ${newId}`);
    }

    // Fix Orders with undefined IDs
    console.log('\n📦 Fixing Orders with undefined IDs...');
    const orders = await Order.find({ $or: [
      { _id: null },
      { _id: { $exists: false } }
    ]});
    console.log(`Found ${orders.length} orders with undefined/null IDs`);

    for (const order of orders) {
      const newId = await getNextSequence('orders');
      
      const newOrder = new Order({
        _id: newId,
        user: order.user,
        items: order.items,
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
      
      if (order._id) {
        await Order.deleteOne({ _id: order._id });
      } else {
        await Order.deleteOne({ user: order.user, createdAt: order.createdAt, _id: { $exists: false } });
      }
      
      console.log(`Fixed order: assigned ID ${newId}`);
    }

    // Fix Reservations with undefined IDs
    console.log('\n📦 Fixing Reservations with undefined IDs...');
    const reservations = await Reservation.find({ $or: [
      { _id: null },
      { _id: { $exists: false } }
    ]});
    console.log(`Found ${reservations.length} reservations with undefined/null IDs`);

    for (const reservation of reservations) {
      const newId = await getNextSequence('reservations');
      
      const newReservation = new Reservation({
        _id: newId,
        user: reservation.user,
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
      
      if (reservation._id) {
        await Reservation.deleteOne({ _id: reservation._id });
      } else {
        await Reservation.deleteOne({ 
          email: reservation.email, 
          date: reservation.date, 
          time: reservation.time,
          _id: { $exists: false } 
        });
      }
      
      console.log(`Fixed reservation: assigned ID ${newId}`);
    }

    console.log('\n✅ Fix completed successfully!');

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
}

// Run if called directly
if (require.main === module) {
  fixUndefinedIds()
    .then(() => {
      console.log('\n✨ Fix script finished');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Fix failed:', error);
      process.exit(1);
    });
}

module.exports = fixUndefinedIds;
