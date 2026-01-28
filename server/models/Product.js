const mongoose = require('mongoose');
const { getNextSequence } = require('./Sequence');

const productSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true,
  },
  productTitle: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  price: {
    type: String,
    required: [true, 'Product price is required'],
  },
  image: {
    type: String,
    required: [true, 'Product image is required'],
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['coffee', 'tea', 'bakery', 'beverages', 'sandwich', 'desserts'],
    lowercase: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  stockQuantity: {
    type: Number,
    default: 100,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  slug: {
    type: String,
    unique: true,
    sparse: true,
  },
}, {
  timestamps: true,
});

// Generate slug from title
function generateSlug(title, id) {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  
  return `${slug}-${id}`;
}

// Generate numeric ID and slug before saving
productSchema.pre('save', async function(next) {
  if (this.isNew && !this._id) {
    try {
      this._id = await getNextSequence('products');
    } catch (error) {
      return next(error);
    }
  }
  
  // Generate slug if not set or if title changed
  if (!this.slug || this.isModified('title') || this.isModified('productTitle')) {
    const title = this.productTitle || this.title || 'product';
    this.slug = generateSlug(title, this._id);
  }
  
  next();
});

// Index for faster queries
productSchema.index({ category: 1 });
productSchema.index({ title: 'text', description: 'text' });
productSchema.index({ slug: 1 });

module.exports = mongoose.model('Product', productSchema);
