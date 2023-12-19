import { Router } from 'express';
import { 
    getProducts,
    getProductsByCategory, 
    addProduct, 
    updateProduct, 
    deleteProduct 
} from '../controllers/product.controller.js';

const router = Router();

router.route('/').get(getProducts);
router.route('/').post(addProduct);
router.route('/search').get(getProductsByCategory);
router.route('/:itemcode').put(updateProduct);
router.route('/:itemcode').delete(deleteProduct);

export default router;