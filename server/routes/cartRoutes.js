const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  mergeCart,
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

// All cart routes require authentication
router.use(protect);

router.get('/', getCart);
router.post('/add', addToCart);
router.put('/update', updateCartItem);
router.delete('/remove', removeFromCart);
router.delete('/clear', clearCart);
router.post('/merge', mergeCart);

module.exports = router;
