import { Request, Response } from 'express';
import { QueryResult } from 'pg'

import {pool} from '../database'

type Producto = {
    id: number,
    clave: string,
    descripcion: string,
}

export const getProductos = async(req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM productos');
        return res.status(200).json(response.rows)   
    } catch (error) {
        console.log(error)
        return res.status(500).json('error')
    }
}

export const createProducto = async(req: Request, res: Response): Promise<Response> => {
    try {
        const { clave, descripcion }: Producto = req.body;
        const response: QueryResult = await pool.query('INSERT INTO productos (clave, descripcion) VALUES ($1, $2)', [clave, descripcion])
        return res.json({
            message: 'Producto creado correctamente',
            body:{
                cliente: {
                    clave, 
                    descripcion, 
                }
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const deleteProducto = async(req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        await pool.query("DELETE FROM productos WHERE id = $1", [id]);
        return res.json(`Producto ${id} eliminado correctamente`);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const updateProducto = async(req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        const { clave, descripcion, }: Producto = req.body;
        await pool.query("UPDATE producto SET clave = $1, descripcion = $2 WHERE id = $3", [clave, descripcion, id]);
        return res.json(`Producto ${id} actualizado correctamente`);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}