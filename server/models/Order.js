const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: String,
      required: true,
    },
  }],
  subtotal: {
    type: Number,
    required: true,
  },
  shipping: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    required: true,
  },
  shippingMethod: {
    type: String,
    enum: ['next_day', 'standard', 'pickup'],
    default: 'standard',
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
}, {
  timestamps: true,
});

// Generate numeric ID before saving
orderSchema.pre('save', async function(next) {
  if (this.isNew && !this._id) {
    try {
      this._id = await getNextSequence('orders');
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
