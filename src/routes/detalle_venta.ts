import {Router} from 'express';

const router = Router();

import {getDetalleVentas, createDetalleVenta, deleteDetalleVenta, updateDetalleVenta} from '../controllers/detalleVentas.controller'

router.get('/detalle_venta', getDetalleVentas)
router.post('/detalle_venta', createDetalleVenta)
router.put('/detalle_venta/:id', deleteDetalleVenta)
router.delete('/detalle_venta/:id', updateDetalleVenta)


export default router;