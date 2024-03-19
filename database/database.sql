CREATE DATABASE practicats;

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(40),
    direccion VARCHAR(100),
    tipo_cliente INT,
    fecha_alta DATE,
    FOREIGN KEY (tipo_cliente) REFERENCES tipo_cliente(id)
);

CREATE TABLE tipo_cliente (
    id SERIAL PRIMARY KEY,
    clave VARCHAR(10),
    descripcion VARCHAR(100)
);
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    clave VARCHAR(10),
    descripcion VARCHAR(100
)
);

CREATE TABLE ventas (
    id SERIAL PRIMARY KEY,
    folio VARCHAR(20),
    cliente INT,
    fecha_registro DATE,
    FOREIGN KEY (cliente) REFERENCES clientes(id)
);

CREATE TABLE detalle_ventas (
    id SERIAL PRIMARY KEY,
    venta INT,
    producto INT,
    cantidad INT,
    FOREIGN KEY (venta) REFERENCES ventas(id),
    FOREIGN KEY (producto) REFERENCES productos(id)
);