import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/user.model.js';

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read jwt from the cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized to access this route, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized to access this route, token not found');
  }
});

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('You are not an admin!');
  }
};

export { protect, admin };
