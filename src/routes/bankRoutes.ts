import { Router } from 'express';
import {
    getBanks,
    getBank,
    createBank,
    updateBank,
    deleteBank,
} from '../controllers/bankController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getBanks);
router.get('/:id', getBank);
router.post('/', authenticate, authorize('ADMIN'), createBank);
router.put('/:id', authenticate, authorize('ADMIN'), updateBank);
router.delete('/:id', authenticate, authorize('ADMIN'), deleteBank);

export default router;
