import {Router} from 'express';

const router = Router();

import {getClientes, createCliente, deleteCliente, updateCliente} from '../controllers/cliente.controller'

router.get('/clientes', getClientes)
router.post('/clientes', createCliente)
router.put('/clientes/:id', updateCliente)
router.delete('/clientes/:id', deleteCliente)


export default router;