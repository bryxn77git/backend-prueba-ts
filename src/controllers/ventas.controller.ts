import { Request, Response } from 'express';
import { QueryResult } from 'pg'

import {pool} from '../database'

type Ventas = {
    id: number,
    folio: string,
    cliente: number,
    fecha_registro: string
}

export const getVentas = async(req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM ventas');
        return res.status(200).json(response.rows)   
    } catch (error) {
        console.log(error)
        return res.status(500).json('error')
    }
}

export const createVenta = async(req: Request, res: Response): Promise<Response> => {
    try {
        const { folio, cliente }: Ventas = req.body;
        const response: QueryResult = await pool.query('INSERT INTO ventas (folio, cliente, fecha_registro) VALUES ($1, $2, now())', [folio, cliente])
        return res.json({
            message: 'Venta creada correctamente',
            body:{
                cliente: {
                    folio, 
                    cliente, 
                }
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const deleteVenta = async(req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        await pool.query("DELETE FROM ventas WHERE id = $1", [id]);
        return res.json(`Venta ${id} eliminada correctamente`);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const updateVenta = async(req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        const { folio, cliente }: Ventas = req.body;
        await pool.query("UPDATE ventas SET folio = $1, cliente = $2 WHERE id = $3", [folio, cliente, id]);
        return res.json(`Venta ${id} actualizada correctamente`);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}