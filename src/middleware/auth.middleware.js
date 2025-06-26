import jwt from 'jsonwebtoken';
import ApiError from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import User from '../model/user.model.js'

export const auth = asyncHandler(async (req, res, next) => {
  let token;

  // Get token from Authorization header or cookies
  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  // No token provided
  if (!token) {
    throw new ApiError(401, 'Unauthorized: No token provided');
  }

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);


  // get user from token
  const user = await User.findById(decoded.id).select('-password');

  if (!user) {
    throw new ApiError(401, 'Unauthorized: User not found');
  }

  // Attach user to request
  req.user = user;

  next();
});
