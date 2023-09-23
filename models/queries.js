const querieAds = {
    
    byAll : 'SELECT * FROM anuncios',
    byId : 'SELECT * FROM anuncios WHERE id_anuncio = $1',
    byActualizar: `UPDATE anuncios SET Producto=$1, Descripcion=$2 , Precio=$3, Categoria=$4, Zona_Geografica=$5, Gasto_Envio_Incluido=$6, ID_Vendedor=$7  WHERE id_anuncio = $8 `,
    byBorrarUna: 'DELETE FROM anuncios WHERE id_anuncio = $1'
    };




    module.exports = {querieAds}