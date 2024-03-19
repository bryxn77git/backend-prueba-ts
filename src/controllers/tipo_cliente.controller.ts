import { Request, Response } from 'express';
import { QueryResult } from 'pg'

import {pool} from '../database';

type TipoCliente = {
    id: number,
    clave: string,
    descripcion: string,
}

export const getTiposCliente = async(req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM tipo_cliente');
        return res.status(200).json(response.rows)   
    } catch (error) {
        console.log(error)
        return res.status(500).json('error')
    }
}

export const createTipoCliente = async(req: Request, res: Response): Promise<Response> => {
    try {
        const { clave, descripcion }: TipoCliente = req.body;
        const response: QueryResult = await pool.query('INSERT INTO tipo_cliente (clave, descripcion) VALUES ($1, $2)', [clave, descripcion])
        return res.json({
            message: 'Tipo cliente creado correctamente',
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

export const deleteTipoCliente = async(req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        await pool.query("DELETE FROM tipo_cliente WHERE id = $1", [id]);
        return res.json(`Tipo cliente ${id} eliminado correctamente`);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const updateTipoCliente = async(req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        const { clave, descripcion }: TipoCliente = req.body;
        await pool.query("UPDATE tipo_cliente SET clave = $1, descripcion = $2 WHERE id = $3", [clave, descripcion, id]);
        return res.json(`Tipo cliente ${id} actualizado correctamente`);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}