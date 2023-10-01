/**
 * Importación de las consultas SQL y la configuración de la conexión a la base de datos.
 * @module
 */
const { querieAds } = require('./queries.js')
const { pool } = require('../utils/connectPool')

/**
 * Función asíncrona que obtiene todos los anuncios de la base de datos.
 *
 * @async
 * @function
 * @throws {Error} Lanza un error en caso de que ocurra un problema durante la consulta.
 * @return {Promise<Array>} Devuelve una promesa que se resuelve en un array de anuncios.
 */
const getAllAds = async () => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(querieAds.byAll);
    result = await data.rows
  } catch (error) {
    console.log(error);
    throw new Error('error')
  } finally {
    client.release()
  }
  return result;
};

/**
 * Función asíncrona que obtiene un anuncio específico de la base de datos usando su ID.
 *
 * @async
 * @function
 * @param {number} id_anuncio - El ID del anuncio.
 * @throws {Error} Lanza un error si no se encuentra el anuncio o si ocurre un problema durante la consulta.
 * @return {Promise<Object>} Devuelve una promesa que se resuelve en el anuncio encontrado.
 */
const getById = async (id_anuncio) => {
  let client, result;
  try {
    client = await pool.connect();

    const data = await client.query(querieAds.byId, [id_anuncio]);

    if (data.rows.length === 0) {
      throw new Error('No se encontró la entrada con el ID proporcionado');
    }

    result = await data.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('Error al buscar la entrada por ID');
  } finally {
    client.release();
  }
  return result
};

/**
 * Función asíncrona que obtiene anuncios de la base de datos basados en el nombre del producto.
 *
 * @async
 * @function
 * @param {string} Producto - El nombre del producto.
 * @throws {Error} Lanza un error si no se encuentran anuncios o si ocurre un problema durante la consulta.
 * @return {Promise<Array>} Devuelve una promesa que se resuelve en un array de anuncios encontrados.
 */
const getByNombre = async (Producto) => {
  let client, result;
  try {
    client = await pool.connect();

    const data = await client.query(querieAds.byName, [Producto]);

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

/**
 * Función asíncrona que obtiene anuncios de la base de datos basados en el nombre del vendedor.
 *
 * @async
 * @function
 * @param {string} Nombre_Vendedor - El nombre del vendedor.
 * @throws {Error} Lanza un error si no se encuentran anuncios o si ocurre un problema durante la consulta.
 * @return {Promise<Array>} Devuelve una promesa que se resuelve en un array de anuncios encontrados.
 */
const getByNombreUsuario = async (Nombre_Vendedor) => {
  let client, result;
  try {
    client = await pool.connect();

    const data = await client.query(querieAds.byUserName, [Nombre_Vendedor]);

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

/**
 * Función asíncrona que obtiene anuncios de la base de datos basados en el ID del vendedor.
 *
 * @async
 * @function
 * @param {number} id_vendedor - El ID del vendedor.
 * @throws {Error} Lanza un error si no se encuentran anuncios o si ocurre un problema durante la consulta.
 * @return {Promise<Array>} Devuelve una promesa que se resuelve en un array de anuncios encontrados.
 */
const getByIdUsuario = async (id_vendedor) => {
  let client, result;
  try {
    client = await pool.connect();

    const data = await client.query(querieAds.byUserID, [id_vendedor]);

    if (data.rows.length === 0) {
      throw new Error('No se encontró la entrada con el ID proporcionado');
    }

    result = await data.rows;
  } catch (error) {
    console.error(error);
    throw new Error('Error al buscar la entrada por ID');
  } finally {
    client.release();
  }
  return result
};

/**
 * Función asíncrona que obtiene anuncios de la base de datos basados en la categoría del producto.
 *
 * @async
 * @function
 * @param {string} Categoria - La categoría del producto.
 * @throws {Error} Lanza un error si no se encuentran anuncios o si ocurre un problema durante la consulta.
 * @return {Promise<Array>} Devuelve una promesa que se resuelve en un array de anuncios encontrados.
 */
const getByCategoria = async (Categoria) => {
  let client, result;
  try {
    client = await pool.connect();

    const data = await client.query(querieAds.byCategoria, [Categoria]);

    if (data.rows.length === 0) {
      throw new Error('No se encontró la entrada con la CATEGORÍA proporcionada');
    }

    result = await data.rows;
  } catch (error) {
    console.error(error);
    throw new Error('Error al buscar la entrada por CATEGORÍA');
  } finally {
    client.release();
  }
  return result
};

/**
 * Función asíncrona para crear un nuevo anuncio en la base de datos.
 *
 * @async
 * @function
 * @param {string} Producto - Nombre del producto.
 * @param {string} Descripcion - Descripción del producto.
 * @param {number} Precio - Precio del producto.
 * @param {string} Categoria - Categoría del producto.
 * @param {string} Zona_Geografica - Zona geográfica del vendedor.
 * @param {number} ID_Vendedor - ID del vendedor.
 * @param {string} Ruta_foto - Ruta de la foto del producto.
 * @param {number} Precio_Stripe - Precio del producto para Stripe.
 * @param {string} Producto_Stripe - Identificación del producto en Stripe.
 * @param {number} Producto_Latitude - Latitud de la ubicación del producto.
 * @param {number} Producto_Longitude - Longitud de la ubicación del producto.
 * @param {string} Nombre_Vendedor - Nombre del vendedor.
 * @param {string} Enlace_Pago - Enlace de pago del producto.
 * @throws {Error} Lanza un error si hay un problema al crear el anuncio.
 * @return {Promise<Object>} Devuelve una promesa que se resuelve en el objeto del anuncio creado.
 */
const postAds = async (Producto, Descripcion, Precio, Categoria, Zona_Geografica, ID_Vendedor, Ruta_foto, Precio_Stripe, Producto_Stripe, Producto_Latitude, Producto_Longitude, Nombre_Vendedor, Enlace_Pago) => {
  let client, result;
  try {
    client = await pool.connect();

    const data = await client.query(querieAds.byInsertQuery, [Producto, Descripcion, Precio, Categoria, Zona_Geografica, ID_Vendedor, Ruta_foto, Precio_Stripe, Producto_Stripe, Producto_Latitude, Producto_Longitude, Nombre_Vendedor, Enlace_Pago]);

    result = data.rows[0];

  } catch (error) {
    console.error(error);
    throw new Error('Error al crear anuncio');
  } finally {
    client.release();
  }
  return result;
};

/**
 * Función asíncrona para actualizar un anuncio existente en la base de datos.
 *
 * @async
 * @function
 * @param {string} Producto - Nombre del producto.
 * @param {string} Descripcion - Descripción del producto.
 * @param {number} Precio - Precio del producto.
 * @param {string} Categoria - Categoría del producto.
 * @param {string} Zona_Geografica - Zona geográfica del vendedor.
 * @param {number} ID_Vendedor - ID del vendedor.
 * @param {string} Ruta_Foto - Ruta de la foto del producto.
 * @param {number} Precio_Stripe - Precio del producto para Stripe.
 * @param {string} Enlace_Pago - Enlace de pago del producto.
 * @param {number} id_anuncio - ID del anuncio.
 * @throws {Error} Lanza un error si hay un problema al actualizar el anuncio.
 * @return {Promise<Object>} Devuelve una promesa que se resuelve en el objeto del anuncio actualizado.
 */
const updateAds = async (Producto, Descripcion, Precio, Categoria, Zona_Geografica, ID_Vendedor, Ruta_Foto,  Precio_Stripe, Enlace_Pago, id_anuncio) => {
  let client, result;
  try {
    client = await pool.connect();


    const data = await client.query(querieAds.byActualizar, [Producto, Descripcion, Precio, Categoria, Zona_Geografica, ID_Vendedor, Ruta_Foto, Precio_Stripe, Enlace_Pago, id_anuncio]);

    result = data.rows[0];

  } catch (error) {
    console.error(error);
    throw new Error('Error al modificar');
  } finally {
    client.release();
  }
  return result;
};

/**
 * Función asíncrona para borrar un anuncio en la base de datos.
 *
 * @async
 * @function
 * @param {number} id_anuncio - ID del anuncio.
 * @throws {Error} Lanza un error si hay un problema al borrar el anuncio.
 * @return {Promise<Object>} Devuelve una promesa que se resuelve en el objeto de la respuesta de la base de datos.
 */
const borrarAd = async (id_anuncio) => {
  let client, result;
  try {
    client = await pool.connect();

    const data = await client.query(querieAds.byBorrarUna, [id_anuncio]);
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
  getAllAds,
  getById,
  getByNombre,
  getByNombreUsuario,
  getByIdUsuario,
  getByCategoria,
  postAds,
  updateAds,
  borrarAd
}