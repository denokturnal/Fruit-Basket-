const jwt = require('jsonwebtoken');

/**
 * Authentication Middleware
 * Validates JWT token and extracts userId
 * For guest users, generates a temporary session token
 */
const authMiddleware = (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      // Generate guest session token if no token provided
      const guestId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      req.userId = guestId;
      req.isGuest = true;
      return next();
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
    req.userId = decoded.userId;
    req.isGuest = decoded.isGuest || false;
    next();
  } catch (error) {
    // If token is invalid, treat as guest
    const guestId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    req.userId = guestId;
    req.isGuest = true;
    next();
  }
};

/**
 * Generate JWT token for user session
 */
const generateToken = (userId, isGuest = false) => {
  return jwt.sign(
    { userId, isGuest },
    process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    { expiresIn: '7d' }
  );
};

module.exports = { authMiddleware, generateToken };
