import express from 'express';
import { getProducts, getProductBySlug, getCategories } from '../controllers/productController';

const router = express.Router();

// Get all products with filtering
router.get('/', getProducts);

// Get all categories
router.get('/categories', getCategories);

// Get single product by slug
router.get('/:slug', getProductBySlug);

export default router;