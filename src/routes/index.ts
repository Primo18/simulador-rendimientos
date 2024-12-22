import { Router } from 'express';
import bankRoutes from './bankRoutes.js';
import interestRateRoutes from './interestRateRoutes.js';
import simulationRoutes from './simulationRoutes.js';
import userRoutes from './userRoutes.js';
import logRoutes from './logRoutes.js';

const router = Router();

router.use('/banks', bankRoutes);
router.use('/interest-rates', interestRateRoutes);
router.use('/simulation', simulationRoutes);
router.use('/users', userRoutes);
router.use('/logs', logRoutes);

export default router;
