import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { getAllUsers,getUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', protect, getUserProfile);
router.get('/',getAllUsers)

export default router;
