import { Request, Response } from 'express';
import SimulationService from '../services/simulationService.js';
import { getErrorMessage } from '../utils/errorHelper.js';

export const simulateSavings = async (req: Request, res: Response): Promise<void> => {
    try {
        const { bankId, principal, years } = req.body;

        if (!bankId || !principal || !years) {
            res.status(400).json({ error: 'bankId, principal, and years are required' });
            return;
        }

        const result = await SimulationService.simulateSavings(bankId, principal, years);
        res.json({
            bankId,
            principal,
            years,
            annualPercentage: result.annualPercentage,
            earnings: result.earnings,
            finalAmount: result.finalAmount,
        });
    } catch (error) {
        res.status(400).json({ error: getErrorMessage(error) });
    }
};