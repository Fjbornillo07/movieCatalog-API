const jwt = require('jsonwebtoken');
const SECRET_KEY = 'supersecretkey123';

// Middleware: Authenticate user
const authenticate = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // decoded = { userId, isAdmin }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Middleware: Check if user is admin
const authorizeAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  next();
};

module.exports = {
  authenticate,
  authorizeAdmin
};
