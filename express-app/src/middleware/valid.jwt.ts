import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/auth';

// Used for requests that require authentication
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  // reject authentication
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  (req as any).user = decoded; // Explicitly cast to any

  next();
}