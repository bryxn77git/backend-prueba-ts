import express from 'express';

const app = express();

import clientesRoutes from './routes/clientes';
import tipoClienteRoutes from './routes/tipo_cliente';
import ProductosRoutes from './routes/producto';
import VentasRoutes from './routes/ventas';
import DetalleVentasRoutes from './routes/detalle_venta';

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(clientesRoutes);
app.use(tipoClienteRoutes);
app.use(ProductosRoutes);
app.use(VentasRoutes);
app.use(DetalleVentasRoutes);

app.listen(4000, () => {
    console.log('server on port', 4000
    )
})