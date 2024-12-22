import { Request, Response } from 'express';
import LogService from '../services/logService.js';
import { getErrorMessage } from '../utils/errorHelper.js';

export const getLogs = async (req: Request, res: Response) => {
    try {
        const logs = await LogService.getLogs();
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};
