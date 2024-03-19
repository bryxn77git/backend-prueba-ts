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
exports.updateTipoCliente = exports.deleteTipoCliente = exports.createTipoCliente = exports.getTiposCliente = void 0;
const database_1 = require("../database");
const getTiposCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM tipo_cliente');
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('error');
    }
});
exports.getTiposCliente = getTiposCliente;
const createTipoCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clave, descripcion } = req.body;
        const response = yield database_1.pool.query('INSERT INTO tipo_cliente (clave, descripcion) VALUES ($1, $2)', [clave, descripcion]);
        return res.json({
            message: 'Tipo cliente creado correctamente',
            body: {
                cliente: {
                    clave,
                    descripcion,
                }
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.createTipoCliente = createTipoCliente;
const deleteTipoCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        yield database_1.pool.query("DELETE FROM tipo_cliente WHERE id = $1", [id]);
        return res.json(`Tipo cliente ${id} eliminado correctamente`);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.deleteTipoCliente = deleteTipoCliente;
const updateTipoCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { clave, descripcion } = req.body;
        yield database_1.pool.query("UPDATE tipo_cliente SET clave = $1, descripcion = $2 WHERE id = $3", [clave, descripcion, id]);
        return res.json(`Tipo cliente ${id} actualizado correctamente`);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.updateTipoCliente = updateTipoCliente;
