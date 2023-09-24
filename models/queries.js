const querieAds = {
    
    byAll : 'SELECT * FROM anuncios',
    byId : 'SELECT * FROM anuncios WHERE id_anuncio = $1',
    byInsertQuery : 'INSERT INTO anuncios (Producto, Descripcion , Precio, Categoria, Zona_Geografica, Gasto_Envio_Incluido, ID_Vendedor) VALUES ($1, $2, $3, $4, $5, $6, $7 ) RETURNING *',
    byActualizar: `UPDATE anuncios SET Producto=$1, Descripcion=$2 , Precio=$3, Categoria=$4, Zona_Geografica=$5, Gasto_Envio_Incluido=$6, ID_Vendedor=$7  WHERE id_anuncio = $8 `,
    byBorrarUna: 'DELETE FROM anuncios WHERE id_anuncio = $1'
    };

    const queriePics = {
        byInsertQuery : 'INSERT INTO fotos (id_anuncio, ruta_foto) VALUES ($1, $2) RETURNING *',
        };


    module.exports = {querieAds, queriePics}