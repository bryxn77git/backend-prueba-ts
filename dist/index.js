"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const clientes_1 = __importDefault(require("./routes/clientes"));
const tipo_cliente_1 = __importDefault(require("./routes/tipo_cliente"));
const producto_1 = __importDefault(require("./routes/producto"));
const ventas_1 = __importDefault(require("./routes/ventas"));
const detalle_venta_1 = __importDefault(require("./routes/detalle_venta"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(clientes_1.default);
app.use(tipo_cliente_1.default);
app.use(producto_1.default);
app.use(ventas_1.default);
app.use(detalle_venta_1.default);
app.listen(4000, () => {
    console.log('server on port', 4000);
});
