const querieAds = {
    
    byAll : 'SELECT * FROM anuncios',
    byId : 'SELECT * FROM anuncios WHERE id_anuncio = $1',
    byName : 'SELECT * FROM anuncios WHERE Producto LIKE $1',
    byUserName : 'SELECT * FROM anuncios WHERE Nombre_Vendedor = $1',
    byUserID : 'SELECT * FROM anuncios WHERE id_vendedor = $1',
    byCategoria : 'SELECT * FROM anuncios WHERE Categoria = $1',
    byInsertQuery : 'INSERT INTO anuncios (Producto, Descripcion , Precio, Categoria, Zona_Geografica, ID_Vendedor, Ruta_foto, Precio_Stripe, Producto_Stripe, Producto_Latitude, Producto_Longitude, Nombre_Vendedor) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
    byActualizar: `UPDATE anuncios SET Producto=$1, Descripcion=$2 , Precio=$3, Categoria=$4, Zona_Geografica=$5, ID_Vendedor=$6, Ruta_foto=$7, Precio_Stripe=$8  WHERE id_anuncio = $9 `,
    byBorrarUna: 'DELETE FROM anuncios WHERE id_anuncio = $1'
    };

  


    module.exports = {querieAds}