const express = require('express');
const router = express.Router();
const {
  createReservation,
  getUserReservations,
  getReservationById,
  cancelReservation,
} = require('../controllers/reservationController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', createReservation);
router.get('/', protect, getUserReservations);
router.get('/:id', protect, getReservationById);
router.delete('/:id', protect, cancelReservation);

module.exports = router;
