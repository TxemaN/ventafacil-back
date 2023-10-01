const { querieCats } = require('./categoryQueries.js');
const { pool } = require('../utils/connectPool');

/**
 * Obtiene todas las categorías de la base de datos.
 *
 * @async
 * @returns {Array<Object>} Un arreglo de objetos, donde cada objeto representa una categoría.
 * @throws {Error} Lanza un error si no se pueden recuperar las categorías.
 */
const getAllCategories = async () => {
    let client, result;
    try {
      client = await pool.connect();
      const data = await client.query(querieCats.byTodas);
      result = await data.rows;
    } catch (error) {
      console.log(error);
      throw new Error('error');
    } finally {
      client.release();
    }
    return result;
};

/**
 * Obtiene una categoría por nombre.
 *
 * @async
 * @param {string} nombre - El nombre de la categoría que se desea buscar.
 * @returns {Array<Object>} Un arreglo de objetos, donde cada objeto representa una categoría con el nombre especificado.
 * @throws {Error} Lanza un error si no se puede recuperar la categoría por nombre o si la categoría no se encuentra.
 */
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
    return result;
};


/**
 * Crea una nueva categoría en la base de datos.
 *
 * @async
 * @param {string} nombre - El nombre de la nueva categoría.
 * @param {string} descripcion - La descripción de la nueva categoría.
 * @returns {Object} Un objeto que representa la nueva categoría creada.
 * @throws {Error} Lanza un error si hay un problema al crear la categoría.
 */
const postCats = async (nombre, descripcion) => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(querieCats.byInsertCat, [nombre, descripcion]);
    result = data.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear categoría');
  } finally {
    client.release();
  }
  return result;
};

/**
* Borra una categoría de la base de datos por su id.
*
* @async
* @param {number} id_categoria - El ID de la categoría que se desea borrar.
* @returns {Object} Un objeto que representa el resultado de la operación de borrado.
* @throws {Error} Lanza un error si hay un problema al borrar la categoría.
*/
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