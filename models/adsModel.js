const { querieAds } = require('./queries.js')
const { pool } = require('../utils/connectPool')

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

const getByIdUsuario = async (id_vendedor) => {
  let client, result;
  try {
    client = await pool.connect();

    const data = await client.query(querieAds.byUserID, [id_vendedor]);

    if (data.rows.length === 0) {
      throw new Error('No se encontró la entrada con el NOMBRE proporcionado');
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

const getByCategoria = async (Categoria) => {
  let client, result;
  try {
    client = await pool.connect();

    const data = await client.query(querieAds.byCategoria, [Categoria]);

    if (data.rows.length === 0) {
      throw new Error('No se encontró la entrada con la CATEGORÍA SELECCIONADA');
    }

    result = await data.rows;
  } catch (error) {
    console.error(error);
    throw new Error('Error al buscar la entrada por CTEGORÍA');
  } finally {
    client.release();
  }
  return result
};

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