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
exports.updateDetalleVenta = exports.deleteDetalleVenta = exports.createDetalleVenta = exports.getDetalleVentas = void 0;
const database_1 = require("../database");
const getDetalleVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM detalle_ventas');
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('error');
    }
});
exports.getDetalleVentas = getDetalleVentas;
const createDetalleVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { venta, producto, cantidad } = req.body;
        const response = yield database_1.pool.query('INSERT INTO detalle_ventas (venta, producto, cantidad) VALUES ($1, $2, $3)', [venta, producto, cantidad]);
        return res.json({
            message: 'Detalle de venta creado correctamente',
            body: {
                cliente: {
                    venta, producto, cantidad
                }
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.createDetalleVenta = createDetalleVenta;
const deleteDetalleVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        yield database_1.pool.query("DELETE FROM detalle_ventas WHERE id = $1", [id]);
        return res.json(`Detalle de venta ${id} eliminado correctamente`);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.deleteDetalleVenta = deleteDetalleVenta;
const updateDetalleVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { venta, producto, cantidad } = req.body;
        yield database_1.pool.query("UPDATE detalle_ventas SET venta = $1, producto = $2, cantidad = $3 WHERE id = $4", [venta, producto, cantidad, id]);
        return res.json(`Detalle de venta ${id} actualizado correctamente`);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.updateDetalleVenta = updateDetalleVenta;
