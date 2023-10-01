
const querieCats = {
    
    byTodas : 'SELECT * FROM categorias',
    byId : 'SELECT * FROM categorias WHERE id_categoria = $1',
    byNombre : 'SELECT * FROM categorias WHERE Nombre LIKE $1',
    byInsertCat : 'INSERT INTO categorias (Nombre, descripcion, ruta_foto) VALUES ($1, $2, $3) RETURNING *',
    byBorrarUna: 'DELETE FROM categorias WHERE id_categoria = $1'
    };
   

  


    module.exports = {querieCats}