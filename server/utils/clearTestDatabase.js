const mongoose = require('mongoose');
require('dotenv').config();

const TEST_MONGODB_URI = 'mongodb+srv://abdullahramy7_db_user:JUsjzjNYrGTbTkP2@rentabazar.bngacqt.mongodb.net/test?retryWrites=true&w=majority&appName=RentABazar';

async function clearTestDatabase() {
  try {
    await mongoose.connect(TEST_MONGODB_URI);
    console.log('✅ Connected to test database');

    const db = mongoose.connection.db;
    
    // Get all collections in the test database
    const collections = await db.listCollections().toArray();
    console.log(`📋 Found ${collections.length} collections in test database`);

    // Delete all collections
    for (const collection of collections) {
      await db.collection(collection.name).deleteMany({});
      console.log(`🗑️  Cleared collection: ${collection.name}`);
    }

    console.log('✅ Successfully cleared test database');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing test database:', error);
    process.exit(1);
  }
}

clearTestDatabase();
