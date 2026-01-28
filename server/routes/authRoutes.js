const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  getCurrentUser,
  updateProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, getCurrentUser);
router.put('/profile', protect, updateProfile);

module.exports = router;
