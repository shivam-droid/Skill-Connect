import express from 'express';
import {
  createServiceType,
  getAllServiceTypes,
  getServiceTypeById,
  deleteServiceType
} from '../controllers/ServiceTypeController.js';

// Optionally add `protect` middleware for admin access
// import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createServiceType);             // Create service
router.get('/', getAllServiceTypes);             // Get all
router.get('/:id', getServiceTypeById);          // Get one
router.delete('/:id', deleteServiceType);        // Delete one

export default router;
