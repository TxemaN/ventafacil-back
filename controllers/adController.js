const { getAllAds, postAds } = require('../models/adsModel');


const getAds = async (req, res) => {
    //   
    let data;
    try {
       
        
            data = await getAllAds();


        res.status(200).json({
            ok: true,
            data
        });
     } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: true,
            msg: 'No pilla la query'
        });

    }
};

const createAds = async (req, res) => {
    let data;
    try {
        const { Producto, Descripcion , Precio, Categoria, Zona_Geografica, Gasto_Envio_Incluido, ID_Vendedor } = req.body;

        if (!Producto || !Descripcion || !Precio || !Categoria || !Zona_Geografica ||!Gasto_Envio_Incluido ||!ID_Vendedor ) {
            return res.status(400).json({
                ok: false,
                msg: "rellene todos los campos"
            });
        }

        data = await postAds(Producto, Descripcion , Precio, Categoria, Zona_Geografica, Gasto_Envio_Incluido, ID_Vendedor);

        if (data) {
            res.status(200).json({
                ok: true,
                msg: 'Anuncio creado',
                data
            });
        } else {
            throw new Error('Error al crear el anuncio');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte el admin'
        });
    }
};





module.exports = {
    getAds,
    createAds
}