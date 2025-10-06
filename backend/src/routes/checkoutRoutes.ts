import express from 'express';
import { createOrder } from '../controllers/checkoutController';

const router = express.Router();

// Public checkout endpoint
router.post('/', createOrder);

export default router;

