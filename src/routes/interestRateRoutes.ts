import { Router } from 'express';
import {
    getInterestRates,
    getInterestRate,
    createInterestRate,
    updateInterestRate,
    deleteInterestRate,
} from '../controllers/interestRateController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getInterestRates);
router.get('/:id', getInterestRate);
router.post('/', authenticate, authorize('ADMIN'), createInterestRate);
router.put('/:id', authenticate, authorize('ADMIN'), updateInterestRate);
router.delete('/:id', authenticate, authorize('ADMIN'), deleteInterestRate);

export default router;
