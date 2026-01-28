const mongoose = require('mongoose');
const { getNextSequence } = require('./Sequence');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: Number,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
}, { _id: false });

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  items: [cartItemSchema],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Generate numeric ID before saving
cartSchema.pre('save', async function(next) {
  if (this.isNew && !this._id) {
    try {
      this._id = await getNextSequence('carts');
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Update updatedAt on save
cartSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for faster queries
cartSchema.index({ user: 1 });

module.exports = mongoose.model('Cart', cartSchema);
