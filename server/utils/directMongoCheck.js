const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ECafe';

async function directMongoCheck() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB\n');

    const db = mongoose.connection.db;
    const productsCollection = db.collection('products');

    // Get raw MongoDB documents (bypassing Mongoose)
    const products = await productsCollection.find({}).limit(5).toArray();
    
    console.log(`📊 Raw MongoDB Products (first ${products.length}):`);
    products.forEach((p, index) => {
      console.log(`\nProduct ${index + 1}:`);
      console.log(`   _id: ${p._id}`);
      console.log(`   _id type: ${typeof p._id}`);
      console.log(`   _id constructor: ${p._id?.constructor?.name}`);
      console.log(`   Is ObjectId: ${p._id instanceof mongoose.Types.ObjectId}`);
      console.log(`   Title: ${p.title || p.productTitle}`);
    });

    // Check total count
    const totalCount = await productsCollection.countDocuments({});
    console.log(`\n📈 Total products in database: ${totalCount}`);

    // Check for documents without _id (shouldn't happen, but check anyway)
    const withoutId = await productsCollection.countDocuments({ _id: { $exists: false } });
    console.log(`📊 Products without _id field: ${withoutId}`);

    // Check for null _id
    const nullId = await productsCollection.countDocuments({ _id: null });
    console.log(`📊 Products with null _id: ${nullId}`);

    console.log('\n✅ Direct MongoDB check completed!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
}

directMongoCheck();
