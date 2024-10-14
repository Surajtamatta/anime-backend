import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const protect = async (req, res, next) => {
  const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
console.log(req.cookies?.accessToken );

  if (!token) {
      return res.status(401).json({ error: 'Unauthorized Request' });
  }

  try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded?._id).select("-password -refreshToken");

      // Check if user exists
      if (!user) {
          return res.status(401).json({ error: 'Invalid Access Token' });
      }

      req.user = user; // Attach user to request
      next(); // Proceed to the next middleware
  } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ message: 'Unauthorized, invalid token' });
  }
};


