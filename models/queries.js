const querieAds = {
    
    byAll : 'SELECT * FROM anuncios',
    byId : 'SELECT * FROM anuncios WHERE id_anuncio = $1'
    };




    module.exports = {querieAds}