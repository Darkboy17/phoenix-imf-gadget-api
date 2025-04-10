import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Middleware to authenticate JWT tokens
// This middleware checks for a valid JWT token in the request headers
export const authenticate = (req, res, next) => {

  // Check if the request has an authorization header
  // If not, send a 401 Unauthorized response
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  try {
    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If the token is valid, attach the decoded user information to the request object
    req.user = decoded;

    // Call the next middleware function in the stack
    next();
  } catch {
    // If the token is invalid or expired, send a 403 Forbidden response
    // This indicates that the user is not authorized to access the requested resource
    res.sendStatus(403);
  }
};
