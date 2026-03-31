import express from 'express';
import { getAnalytics, getUsers } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/analytics').get(protect, admin, getAnalytics);
router.route('/users').get(protect, admin, getUsers);

export default router;
