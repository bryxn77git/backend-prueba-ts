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
exports.updateVenta = exports.deleteVenta = exports.createVenta = exports.getVentas = void 0;
const database_1 = require("../database");
const getVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM ventas');
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('error');
    }
});
exports.getVentas = getVentas;
const createVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { folio, cliente } = req.body;
        const response = yield database_1.pool.query('INSERT INTO ventas (folio, cliente, fecha_registro) VALUES ($1, $2, now())', [folio, cliente]);
        return res.json({
            message: 'Venta creada correctamente',
            body: {
                cliente: {
                    folio,
                    cliente,
                }
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.createVenta = createVenta;
const deleteVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        yield database_1.pool.query("DELETE FROM ventas WHERE id = $1", [id]);
        return res.json(`Venta ${id} eliminada correctamente`);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.deleteVenta = deleteVenta;
const updateVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { folio, cliente } = req.body;
        yield database_1.pool.query("UPDATE ventas SET folio = $1, cliente = $2 WHERE id = $3", [folio, cliente, id]);
        return res.json(`Venta ${id} actualizada correctamente`);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.updateVenta = updateVenta;
