const { getAllAds, postAds, updateAds, getById, borrarAd } = require('../models/adsModel');
const stripe = require('stripe')(process.env.STRIPE_KEY);



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

const getOneById = async (req, res) => {
    //   
    let data;
    try {
        const id_anuncio = req.params.id_anuncio;

        data = await getById(id_anuncio);


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
    try {
        const { Producto, Descripcion, Precio, Categoria, Zona_Geografica, ID_Vendedor, Ruta_foto=`uploads/${req.file.filename}`} = req.body;
        if (!Producto || !Descripcion || !Precio || !Categoria || !Zona_Geografica || !ID_Vendedor || !Ruta_foto) {
            return res.status(400).json({
                ok: false,
                msg: "rellene todos los campos"
            });
        }
        let stripeProduct = await stripe.products.create({
            name: Producto,
            description: Descripcion,
        });
        let stripePrice = await stripe.prices.create({
            unit_amount: Precio * 100,
            currency: 'eur',
            product: stripeProduct.id,
        });
        let Precio_Stripe = stripePrice.id;
        let data = await postAds(Producto, Descripcion, Precio, Categoria, Zona_Geografica, ID_Vendedor, Ruta_foto, Precio_Stripe);
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


const actualizarAds = async (req, res) => {
    let data;
    try {
        const id_anuncio = req.params.id_anuncio;
        const { Producto, Descripcion, Precio, Categoria, Zona_Geografica, ID_Vendedor } = req.body;


        if (!Producto || !Descripcion || !Precio || !Categoria || !Zona_Geografica || !ID_Vendedor) {
            return res.status(400).json({
                ok: false,
                msg: 'El anuncio debe tener todos los campos',
            });
        }


        const originalData = await getById(id_anuncio);


        if (Producto === originalData.Producto && Descripcion === originalData.Descripcion) {
            return res.status(200).json({
                ok: true,
                msg: 'Anuncio actualizado.',
            });
        }

        // 
        data = await updateAds(Producto, Descripcion, Precio, Categoria, Zona_Geografica, ID_Vendedor, id_anuncio);


        const updatedData = await getById(id_anuncio);

        res.status(200).json({
            ok: true,
            msg: 'Anuncio actualizado ',
            data: updatedData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'No cambia la query'
        });
    }
};


const deleteAds = async (req, res) => {
    try {
        let data;
        const id_anuncio = req.params.id_anuncio;
        if (isNaN(id_anuncio)) {
            return res.status(400).json({
                ok: false,
                msg: 'Id invalido.',
            });
        }

        data = await borrarAd(id_anuncio);

        if (data) {
            res.status(200).json({
                ok: true,
                msg: 'Anuncio retirado',
            });
        } else {
            res.status(404).json({
                ok: false,
                msg: 'El anuncio no existe',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'No pilla la query',
        });
    }
};


module.exports = {
    getAds,
    getOneById,
    createAds,
    actualizarAds,
    deleteAds
}