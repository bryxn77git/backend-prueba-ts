import {Router} from 'express';

const router = Router();

import {getVentas, createVenta, deleteVenta, updateVenta} from '../controllers/ventas.controller'

router.get('/ventas', getVentas)
router.post('/ventas', createVenta)
router.put('/ventas/:id', updateVenta)
router.delete('/ventas/:id', deleteVenta)


export default router;