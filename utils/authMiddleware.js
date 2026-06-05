// utils/authMiddleware.js
import jwt from 'jsonwebtoken';

const verifyToken = (token, next) => {
  if (!token) return next(new Error('No token provided'));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'kirti');
    next(null, decoded);
  } catch (err) {
    next(err);
  }
};

export default verifyToken;
