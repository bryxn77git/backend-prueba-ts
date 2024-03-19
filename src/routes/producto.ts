import {Router} from 'express';

const router = Router();

import {getProductos, createProducto, deleteProducto, updateProducto} from '../controllers/producto.controller'

router.get('/productos', getProductos)
router.post('/productos', createProducto)
router.put('/productos/:id', updateProducto)
router.delete('/productos/:id', deleteProducto)


export default router;