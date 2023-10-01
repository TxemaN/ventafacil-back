/**
 * Objeto que contiene las consultas SQL preparadas para trabajar con la tabla de anuncios.
 * @type {Object}
 */
const querieAds = {
    /**
     * Consulta que obtiene todos los anuncios de la tabla.
     * @type {string}
     */
    byAll: 'SELECT * FROM anuncios',

    /**
     * Consulta que obtiene un anuncio específico de la tabla usando su ID.
     * @type {string}
     */
    byId: 'SELECT * FROM anuncios WHERE id_anuncio = $1',

    /**
     * Consulta que obtiene anuncios de la tabla basado en un patrón de nombre del producto.
     * @type {string}
     */
    byName: 'SELECT * FROM anuncios WHERE Producto LIKE $1',

    /**
     * Consulta que obtiene anuncios de la tabla basado en el nombre del vendedor.
     * @type {string}
     */
    byUserName: 'SELECT * FROM anuncios WHERE Nombre_Vendedor = $1',

    /**
     * Consulta que obtiene anuncios de la tabla basado en el ID del vendedor.
     * @type {string}
     */
    byUserID: 'SELECT * FROM anuncios WHERE id_vendedor = $1',

    /**
     * Consulta que obtiene anuncios de la tabla basado en la categoría.
     * @type {string}
     */
    byCategoria: 'SELECT * FROM anuncios WHERE Categoria = $1',

    /**
     * Consulta que inserta un nuevo anuncio en la tabla y devuelve el anuncio creado.
     * @type {string}
     */
    byInsertQuery: 'INSERT INTO anuncios (Producto, Descripcion , Precio, Categoria, Zona_Geografica, ID_Vendedor, Ruta_foto, Precio_Stripe, Producto_Stripe, Producto_Latitude, Producto_Longitude, Nombre_Vendedor, Enlace_Pago) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',

    /**
     * Consulta que actualiza los datos de un anuncio específico en la tabla usando su ID.
     * @type {string}
     */
    byActualizar: `UPDATE anuncios SET Producto=$1, Descripcion=$2 , Precio=$3, Categoria=$4, Zona_Geografica=$5, ID_Vendedor=$6, Ruta_foto=$7, Precio_Stripe=$8, Enlace_Pago=$9  WHERE id_anuncio = $10 `,

    /**
     * Consulta que elimina un anuncio de la tabla usando su ID.
     * @type {string}
     */
    byBorrarUna: 'DELETE FROM anuncios WHERE id_anuncio = $1'
};

// Exportar el objeto querieAds para ser utilizado en otros módulos
module.exports = { querieAds };
