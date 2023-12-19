import { Router } from 'express';
import { 
    getSalesTransactions, 
    addSalesTransaction 
} from '../controllers/sale.controller.js';

const router = Router();

router.route('/').get(getSalesTransactions);
router.route('/').post(addSalesTransaction);

export default router;