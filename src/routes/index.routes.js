import { Router } from 'express';

import {
	renderProducts,
	createProducts,
	renderProductsEdit,
	productsEdit,
	deleteProduct,
	productToggleDone,
} from '../controllers/product.controller';
import {
	getAllProducts,
	getProduct,
	createProduct,
	EditProduct,
	deleteProductApi,
} from '../controllers/apiProduct.controller';

const router = Router();

// Visual App ------------------------------------
router.get('/', renderProducts);
router.post('/product/add', createProducts);
router.get('/product/:id/toggleDone', productToggleDone);
router.get('/product/:id/edit', renderProductsEdit);
router.post('/product/:id/edit', productsEdit);
router.get('/product/:id/delete', deleteProduct);
// Visual App ------------------------------------

// Api App ------------------------------------
router.get('/api/products', getAllProducts);
router.get('/api/products/:id', getProduct);
router.post('/api/products', createProduct);
router.put('/api/products/:id', EditProduct);
router.delete('/api/products/:id', deleteProductApi);
// Api App ------------------------------------

export default router;
