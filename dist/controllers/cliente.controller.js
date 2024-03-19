"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCliente = exports.deleteCliente = exports.createCliente = exports.getClientes = void 0;
const database_1 = require("../database");
const getClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM clientes');
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('error');
    }
});
exports.getClientes = getClientes;
const createCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, direccion, tipo_cliente, } = req.body;
        const response = yield database_1.pool.query('INSERT INTO clientes (nombre, direccion, tipo_cliente, fecha_alta) VALUES ($1, $2, $3, now())', [nombre, direccion, tipo_cliente]);
        return res.json({
            message: 'Cliente creado correctamente',
            body: {
                cliente: {
                    nombre,
                    direccion,
                    tipo_cliente
                }
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.createCliente = createCliente;
const deleteCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        yield database_1.pool.query("DELETE FROM clientes WHERE id = $1", [id]);
        return res.json(`Cliente ${id} eliminado correctamente`);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.deleteCliente = deleteCliente;
const updateCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { nombre, direccion, tipo_cliente } = req.body;
        yield database_1.pool.query("UPDATE clientes SET nombre = $1, direccion = $2, tipo_cliente = $3 WHERE id = $4", [nombre, direccion, tipo_cliente, id]);
        return res.json(`Cliente ${id} actualizado correctamente`);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.updateCliente = updateCliente;
