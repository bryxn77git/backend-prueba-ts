import { Pool } from 'pg';

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '244889',
    database: 'postgres',
    port: 5432,
})