import { Router, Request, Response } from 'express';
import { simulateSavings } from '../controllers/simulationController.js';

const router = Router();

router.post('/simulate', simulateSavings);

export default router;
