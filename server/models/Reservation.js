const mongoose = require('mongoose');
const { getNextSequence } = require('./Sequence');

const reservationSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  user: {
    type: Number,
    ref: 'User',
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  time: {
    type: String,
    required: [true, 'Time is required'],
  },
  guests: {
    type: Number,
    required: [true, 'Number of guests is required'],
    min: 1,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  specialRequests: {
    type: String,
  },
}, {
  timestamps: true,
});

// Generate numeric ID before saving
reservationSchema.pre('save', async function(next) {
  if (this.isNew && !this._id) {
    try {
      this._id = await getNextSequence('reservations');
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model('Reservation', reservationSchema);
