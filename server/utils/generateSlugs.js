const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ECafe';

const Product = require('../models/Product');

/**
 * Generate slugs for existing products
 */
function generateSlug(title, id) {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  
  return `${slug}-${id}`;
}

async function generateSlugsForProducts() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB\n');

    // Use raw MongoDB collection to get all products
    const db = mongoose.connection.db;
    const productsCollection = db.collection('products');
    const products = await productsCollection.find({}).toArray();
    
    console.log(`📦 Found ${products.length} products to process\n`);

    let updated = 0;
    let skipped = 0;
    for (const product of products) {
      if (!product.slug && product._id) {
        const title = product.productTitle || product.title || 'product';
        const slug = generateSlug(title, product._id);
        
        await productsCollection.updateOne(
          { _id: product._id },
          { $set: { slug: slug } }
        );
        
        console.log(`✅ Generated slug for "${title}": ${slug}`);
        updated++;
      } else if (product.slug) {
        skipped++;
        if (skipped <= 3) {
          console.log(`⏭️  Skipping "${product.productTitle || product.title}" - already has slug: ${product.slug}`);
        }
      } else {
        console.log(`⚠️  Skipping product with no _id: ${JSON.stringify({ title: product.title, _id: product._id })}`);
      }
    }
    
    if (skipped > 3) {
      console.log(`⏭️  ... and ${skipped - 3} more products already have slugs`);
    }

    console.log(`\n✅ Slug generation completed!`);
    console.log(`📊 Updated ${updated} products with slugs`);

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
  generateSlugsForProducts()
    .then(() => {
      console.log('\n✨ Script finished');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Script failed:', error);
      process.exit(1);
    });
}

module.exports = generateSlugsForProducts;
