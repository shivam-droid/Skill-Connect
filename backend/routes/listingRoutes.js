import express from 'express';
import { createListing, searchListings } from '../controllers/listingController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createListing);
router.get('/search', searchListings); // Consumer search

export default router;
