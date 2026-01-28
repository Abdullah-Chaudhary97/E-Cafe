const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ error: 'Not authorized, no token' });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      
      // Get user from token
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      req.userId = user._id;
      req.userRole = user.role;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Not authorized, token failed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
