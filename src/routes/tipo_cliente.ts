import {Router} from 'express';

const router = Router();

import {getTiposCliente, createTipoCliente, deleteTipoCliente, updateTipoCliente} from '../controllers/tipo_cliente.controller'

router.get('/tipo_cliente', getTiposCliente)
router.post('/tipo_cliente', createTipoCliente)
router.put('/tipo_cliente/:id', updateTipoCliente)
router.delete('/tipo_cliente/:id', deleteTipoCliente)


export default router;