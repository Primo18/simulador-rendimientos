import { Router } from 'express';
import {
    getBanks,
    getBank,
    createBank,
    updateBank,
    deleteBank,
} from '../controllers/bankController.js';

const router = Router();

router.get('/', getBanks);
router.get('/:id', getBank);
router.post('/', createBank);
router.put('/:id', updateBank);
router.delete('/:id', deleteBank);

export default router;
