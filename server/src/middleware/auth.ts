import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { AppError } from './errorHandler';

interface JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new AppError('Not authorized to access this route', 401);
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    ) as JwtPayload;

    // Get user from token
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    next(new AppError('Not authorized to access this route', 401));
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Not authorized to access this route', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }

    next();
  };
}; 