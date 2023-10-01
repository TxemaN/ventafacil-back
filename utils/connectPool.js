/**
 * Módulo para establecer y configurar una conexión de base de datos Postgred.
 *
 * @module pool
 */

const { Pool } = require('pg');


/**
 * Configuración y creación de una instancia de conexión a la base de datos Postgred.
 *
 */
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'ventaFacil',
    password: '1234'
});

module.exports = { pool };
