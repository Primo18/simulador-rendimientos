import { Request, Response } from 'express';
import InterestRateService from '../services/interestRateService.js';
import { getErrorMessage } from '../utils/errorHelper.js';
import LogService from '../services/logService.js';

export const getInterestRates = async (req: Request, res: Response) => {
    try {
        const rates = await InterestRateService.getAllInterestRates();
        res.json(rates);
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

export const getInterestRate = async (req: Request, res: Response) => {
    try {
        const rate = await InterestRateService.getInterestRateById(Number(req.params.id));
        res.json(rate);
    } catch (error) {
        res.status(404).json({ error: getErrorMessage(error) });
    }
};

export const createInterestRate = async (req: Request, res: Response) => {
    try {
        const rate = await InterestRateService.createInterestRate(req.body);
        res.status(201).json(rate);
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

export const updateInterestRate = async (req: Request, res: Response) => {
    try {
        const rate = await InterestRateService.updateInterestRate(Number(req.params.id), req.body);

        await LogService.createLog(
            'UPDATE_INTEREST_RATE',
            req.body.user.id,
            { rate: rate.previous('rate'), type: rate.previous('type') },
            req.body
        );

        res.json(rate);
    } catch (error) {
        res.status(404).json({ error: getErrorMessage(error) });
    }
};

export const deleteInterestRate = async (req: Request, res: Response) => {
    try {
        const rate = await InterestRateService.deleteInterestRate(Number(req.params.id));

        await LogService.createLog('DELETE_INTEREST_RATE', req.body.user.id, rate);

        res.json(rate);
    } catch (error) {
        res.status(404).json({ error: getErrorMessage(error) });
    }
};
