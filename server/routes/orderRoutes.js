import express from 'express';
import { addOrderItems, getMyOrders, getOrders, updateOrderStatus, getOrderById } from '../controllers/orderController.js';
import { protect, staff } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/mine').get(protect, getMyOrders);
router.route('/all').get(protect, staff, getOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/status').put(protect, staff, updateOrderStatus);

export default router;
