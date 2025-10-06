import express from 'express';
import { authenticateAdmin, authenticateSuperAdmin } from '../middleware/adminAuth';
import {
  getDashboardStats,
  getAllOrders,
  updateOrderStatus,
  getAllUsers,
  updateUserStatus,
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts,
  publishProduct,
  unpublishProduct,
  publishCategory,
  unpublishCategory,
  getAllCategories
} from '../controllers/adminController';

const router = express.Router();

// All routes require admin authentication
router.use(authenticateAdmin);

// Dashboard Analytics
router.get('/dashboard/stats', getDashboardStats);

// Order Management
router.get('/orders', getAllOrders);
router.put('/orders/:orderId', updateOrderStatus);

// User Management (Super Admin only for sensitive operations)
router.get('/users', getAllUsers);
router.put('/users/:userId', updateUserStatus);

// Product Management
router.get('/products', getAdminProducts);
router.post('/products', createProduct);
router.put('/products/:productId', updateProduct);
router.delete('/products/:productId', deleteProduct);
// Publish / Unpublish
router.post('/products/:productId/publish', publishProduct);
router.post('/products/:productId/unpublish', unpublishProduct);

// Categories Management
router.get('/categories', getAllCategories);
router.post('/categories/:categoryId/publish', publishCategory);
router.post('/categories/:categoryId/unpublish', unpublishCategory);

// Super Admin only routes
router.put('/users/:userId/role', authenticateSuperAdmin, updateUserStatus);

export default router;
