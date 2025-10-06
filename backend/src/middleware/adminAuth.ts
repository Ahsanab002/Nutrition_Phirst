import { Request, Response, NextFunction } from 'express';
import { verifyToken, JwtPayload } from '../utils/jwt';
import prisma from '../config/database';

export interface AdminRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
    role: 'CUSTOMER' | 'ADMIN' | 'SUPER_ADMIN';
  };
}

export const authenticateAdmin = async (
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    // Check for local admin mode in development
    const isLocalAdminRequest = req.headers['x-local-admin'] === 'true';
    const isDevelopment = process.env.NODE_ENV !== 'production';

    if (isDevelopment && isLocalAdminRequest) {
      // For local admin in development, create a mock admin user
      req.user = {
        id: 'local-admin',
        email: 'admin@yourshop.com',
        name: 'Local Admin',
        role: 'ADMIN' as const
      };
      return next();
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    const decoded: JwtPayload = verifyToken(token);
    
    // Verify user still exists in database and get role
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, name: true, role: true, isActive: true }
    });

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'User not found or inactive'
      });
    }

    // Check if user has admin privileges
    if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

export const authenticateSuperAdmin = async (
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    const decoded: JwtPayload = verifyToken(token);
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, name: true, role: true, isActive: true }
    });

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'User not found or inactive'
      });
    }

    // Check if user has super admin privileges
    if (user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Super admin access required'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};
