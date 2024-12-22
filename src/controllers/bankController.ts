import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/errorHelper.js';
import BankService from '../services/bankService.js';
import LogService from '../services/logService.js';

export const getBanks = async (req: Request, res: Response) => {
    try {
        const banks = await BankService.getAllBanks();
        res.json(banks);
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

export const getBank = async (req: Request, res: Response) => {
    try {
        const bank = await BankService.getBankById(Number(req.params.id));
        res.json(bank);
    } catch (error) {
        res.status(404).json({ error: getErrorMessage(error) });
    }
};

export const createBank = async (req: Request, res: Response) => {
    try {
        const bank = await BankService.createBank(req.body);
        res.status(201).json(bank);
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

export const updateBank = async (req: Request, res: Response) => {
    try {
        const bank = await BankService.updateBank(Number(req.params.id), req.body);

        // Registrar el log
        await LogService.createLog(
            'UPDATE_BANK',
            req.body.user.id,
            { name: bank.previous('name'), address: bank.previous('address'), contact: bank.previous('contact') },
            req.body
        );

        res.json(bank);
    } catch (error) {
        res.status(404).json({ error: getErrorMessage(error) });
    }
};

export const deleteBank = async (req: Request, res: Response) => {
    try {
        const bank = await BankService.deleteBank(Number(req.params.id));

        // Registrar el log
        await LogService.createLog('DELETE_BANK', req.body.user.id, bank);

        res.json(bank);
    } catch (error) {
        res.status(404).json({ error: getErrorMessage(error) });
    }
};
