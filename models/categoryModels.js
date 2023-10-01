const { querieCats } = require('./categoryQueries.js')
const { pool } = require('../utils/connectPool')

const getAllCategories = async () => {
    let client, result;
    try {
      client = await pool.connect();
      const data = await client.query(querieCats.byTodas);
      result = await data.rows
    } catch (error) {
      console.log(error);
      throw new Error('error')
    } finally {
      client.release()
    }
    return result;
  };

  const getByNombre = async (nombre) => {
    let client, result;
    try {
      client = await pool.connect();
  
      const data = await client.query(querieCats.byName, [nombre]);
  
      if (data.rows.length === 0) {
        throw new Error('No se encontró la entrada con el NOMBRE proporcionado');
      }
  
      result = await data.rows;
    } catch (error) {
      console.error(error);
      throw new Error('Error al buscar la entrada por NOMBRE');
    } finally {
      client.release();
    }
    return result
  };

  const postCats = async (nombre, descripcion, ruta_foto) => {
    let client, result;
    try {
      client = await pool.connect();
  
  
      const data = await client.query(querieCats.byInsertCat, [nombre, descripcion, ruta_foto]);
  
      result = data.rows[0];
  
    } catch (error) {
      console.error(error);
      throw new Error('Error al crear categoría');
    } finally {
      client.release();
    }
    return result;
  };

  const borrarCat = async (id_categoria) => {
    let client, result;
    try {
      client = await pool.connect();
  
      const data = await client.query(querieCats.byBorrarUna, [id_categoria]);
      result = data;
    } catch (error) {
      console.error(error);
      throw new Error('No está borrando la query');
    } finally {
      client.release();
    }
    return result;
  };


module.exports = {
    getAllCategories,
    getByNombre,
    postCats,
    borrarCat

  }