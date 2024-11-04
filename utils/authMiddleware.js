// utils/authMiddleware.js
import jwt from 'jsonwebtoken';

const verifyToken = (token, next) => {

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    // Replace 'your_jwt_secret' with your actual JWT secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'kirti');
    req.data = decoded; // Set the decoded user data in the request
    next(); // Proceed to the next middleware/handler
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid token.' });
  }
};

export default verifyToken;
