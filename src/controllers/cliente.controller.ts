import { Request, Response } from 'express';
import { QueryResult } from 'pg'

import {pool} from '../database'

type Cliente = {
    id: number,
    nombre: string,
    direccion: string,
    tipo_cliente: number,
    fecha_alta: string,
}

export const getClientes = async(req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM clientes');
        return res.status(200).json(response.rows)   
    } catch (error) {
        console.log(error)
        return res.status(500).json('error')
    }
}

export const createCliente = async(req: Request, res: Response): Promise<Response> => {
    try {
        const { nombre, direccion, tipo_cliente, }: Cliente = req.body;
        const response: QueryResult = await pool.query('INSERT INTO clientes (nombre, direccion, tipo_cliente, fecha_alta) VALUES ($1, $2, $3, now())', [nombre, direccion, tipo_cliente])
        return res.json({
            message: 'Cliente creado correctamente',
            body:{
                cliente: {
                    nombre, 
                    direccion, 
                    tipo_cliente
                }
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const deleteCliente = async(req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        await pool.query("DELETE FROM clientes WHERE id = $1", [id]);
        return res.json(`Cliente ${id} eliminado correctamente`);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const updateCliente = async(req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        const { nombre, direccion, tipo_cliente }: Cliente = req.body;
        await pool.query("UPDATE clientes SET nombre = $1, direccion = $2, tipo_cliente = $3 WHERE id = $4", [nombre, direccion, tipo_cliente, id]);
        return res.json(`Cliente ${id} actualizado correctamente`);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}