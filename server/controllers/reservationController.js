const Reservation = require('../models/Reservation');

// Create reservation
exports.createReservation = async (req, res) => {
  try {
    const reservation = new Reservation({
      ...req.body,
      user: req.userId || null,
    });
    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user reservations
exports.getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.userId })
      .sort({ date: -1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get reservation by ID
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel reservation
exports.cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
