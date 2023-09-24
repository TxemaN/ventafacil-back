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





const postAds = async (Producto, Descripcion, Precio, Categoria, Zona_Geografica, Gasto_Envio_Incluido, ID_Vendedor) => {
  let client, result;
  try {
    client = await pool.connect();


    const data = await client.query(querieAds.byInsertQuery, [Producto, Descripcion, Precio, Categoria, Zona_Geografica, Gasto_Envio_Incluido, ID_Vendedor]);

    result = data.rows[0];

  } catch (error) {
    console.error(error);
    throw new Error('Error al crear la entrada');
  } finally {
    client.release();
  }
  return result;
};

const updateAds = async (Producto, Descripcion, Precio, Categoria, Zona_Geografica, Gasto_Envio_Incluido, ID_Vendedor, id_anuncio) => {
  let client, result;
  try {
    client = await pool.connect();


    const data = await client.query(querieAds.byActualizar, [Producto, Descripcion, Precio, Categoria, Zona_Geografica, Gasto_Envio_Incluido, ID_Vendedor, id_anuncio]);

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
  postAds,
  updateAds,
  borrarAd
}