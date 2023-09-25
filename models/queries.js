const querieAds = {
    
    byAll : 'SELECT * FROM anuncios',
    byId : 'SELECT * FROM anuncios WHERE id_anuncio = $1',
    byInsertQuery : 'INSERT INTO anuncios (Producto, Descripcion , Precio, Categoria, Zona_Geografica, ID_Vendedor, Ruta_foto, Precio_Stripe) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    byActualizar: `UPDATE anuncios SET Producto=$1, Descripcion=$2 , Precio=$3, Categoria=$4, Zona_Geografica=$5, Gasto_Envio_Incluido=$6, ID_Vendedor=$7  WHERE id_anuncio = $8 `,
    byBorrarUna: 'DELETE FROM anuncios WHERE id_anuncio = $1'
    };

  


    module.exports = {querieAds}