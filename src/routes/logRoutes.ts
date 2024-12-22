import { Router } from 'express';
import { getLogs } from '../controllers/logController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', authenticate, authorize('ADMIN'), getLogs);

export default router;
