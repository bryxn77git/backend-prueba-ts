import { Request, Response } from 'express';
import { QueryResult } from 'pg'

import {pool} from '../database'

type DetalleVenta = {
    id: number,
    venta: number,
    producto: number,
    cantidad: number
}

export const getDetalleVentas = async(req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM detalle_ventas');
        return res.status(200).json(response.rows)   
    } catch (error) {
        console.log(error)
        return res.status(500).json('error')
    }
}

export const createDetalleVenta = async(req: Request, res: Response): Promise<Response> => {
    try {
        const { venta, producto, cantidad }: DetalleVenta = req.body;
        const response: QueryResult = await pool.query('INSERT INTO detalle_ventas (venta, producto, cantidad) VALUES ($1, $2, $3)', [venta, producto, cantidad])
        return res.json({
            message: 'Detalle de venta creado correctamente',
            body:{
                cliente: {
                    venta, producto, cantidad 
                }
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const deleteDetalleVenta = async(req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        await pool.query("DELETE FROM detalle_ventas WHERE id = $1", [id]);
        return res.json(`Detalle de venta ${id} eliminado correctamente`);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const updateDetalleVenta = async(req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        const { venta, producto, cantidad }: DetalleVenta = req.body;
        await pool.query("UPDATE detalle_ventas SET venta = $1, producto = $2, cantidad = $3 WHERE id = $4", [venta, producto, cantidad, id]);
        return res.json(`Detalle de venta ${id} actualizado correctamente`);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}