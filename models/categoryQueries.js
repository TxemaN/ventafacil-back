
/**
 * Objeto que contiene las consultas SQL preparadas para trabajar con la tabla de categorías.
 * @type {Object}
 */
const querieCats = {
    /**
     * Consulta que obtiene todas las categorías de la tabla.
     * @type {string}
     */
    byTodas: 'SELECT * FROM categorias',
    
    /**
     * Consulta que obtiene una categoría específica de la tabla usando su ID.
     * @type {string}
     */
    byId: 'SELECT * FROM categorias WHERE id_categoria = $1',
    
    /**
     * Consulta que obtiene categorías de la tabla basado en un patrón de nombre.
     * @type {string}
     */
    byNombre: 'SELECT * FROM categorias WHERE Nombre LIKE $1',
    
    /**
     * Consulta que inserta una nueva categoría en la tabla y devuelve la categoría creada.
     * @type {string}
     */
    byInsertCat: 'INSERT INTO categorias (Nombre, descripcion) VALUES ($1, $2) RETURNING *',
    
    /**
     * Consulta que elimina una categoría de la tabla usando su ID.
     * @type {string}
     */
    byBorrarUna: 'DELETE FROM categorias WHERE id_categoria = $1'
};

  


    module.exports = {querieCats}