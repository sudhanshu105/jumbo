import express from 'express';
import { ProductController } from '../controllers/productController';
import { validateProduct } from '../middlewares/validation';

const router = express.Router();

router.get('/products', ProductController.getProducts);
router.get('/products/:id', ProductController.getProductById);
router.post('/products', validateProduct, ProductController.createProduct);
router.put('/products/:id', validateProduct, ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);

export default router;
