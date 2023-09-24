const { pool } = require('../utils/connectPool')
const { queriePics } = require('./queries.js')

const postPics = async (id_anuncio, ruta_foto) => {
    let client, result;
    try {
      client = await pool.connect();
  
  
      const data = await client.query(queriePics.byInsertQuery, [id_anuncio, ruta_foto]);
  
      result = data.rows[0];
  
    } catch (error) {
      console.error(error);
      throw new Error('Error al subir la foto');
    } finally {
      client.release();
    }
    return result;
  };

  module.exports = {
    postPics
  }