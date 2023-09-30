
const { getAllAds, postAds, updateAds, getById, getByNombre, getByNombreUsuario, getByIdUsuario, getByCategoria, borrarAd } = require('../models/adsModel');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const urlLocation = "http://api.positionstack.com/v1/forward";
const claveLocation = process.env.LOCATION_KEY

/** Controlador para acceder a todos los anuncios.*/
const getAds = async (req, res) => {
    //   
    let data;
    try {


        data = await getAllAds();

        //RETURN Y GESTIONAR 404
        return res.status(200).json({
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

/** Controlador para acceder a un anuncio según su ID.*/
const getOneById = async (req, res) => {
    //   
    let data;
    try {
        const id_anuncio = req.params.id_anuncio;

        data = await getById(id_anuncio);

        //RETURN Y GESTIONAR 404
        return res.status(200).json({
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

/** Controlador para hacer búsqeuda por nombre.*/
const getByName = async (req, res) => {
    //   
    let data;
    try {
        const { Producto } = req.body;

        data = await getByNombre('%' + Producto + '%');

        //RETURN ADEMÁS DE STATUS
        return res.status(200).json({
            ok: true,
            data: data
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: true,
            msg: 'No pilla la query por nombre'
        });

    }
};

/** Controlador para hacer búsqeuda por nombre.*/
const getByUserName = async (req, res) => {
    //   
    let data;
    try {
        const { Nombre_Vendedor } = req.body;

        data = await getByNombreUsuario(Nombre_Vendedor);

        //RETURN ADEMÁS DE STATUS
        return res.status(200).json({
            ok: true,
            data
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: true,
            msg: 'No pilla la query por nombre de usuario'
        });

    }
};

const getByIdUser = async (req, res) => {
    //   
    let data;
    try {
        const id_vendedor = req.params.id_vendedor;

        data = await getByIdUsuario(id_vendedor);

        //RETURN ADEMÁS DE STATUS
        return res.status(200).json({
            ok: true,
            data
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: true,
            msg: 'No pilla la query por ID de usuario'
        });

    }
};

const getByCategory = async (req, res) => {
    //   
    let data;
    try {
        const { Categoria } = req.body;

        data = await getByCategoria(Categoria);

        //RETURN ADEMÁS DE STATUS
        return res.status(200).json({
            ok: true,
            data
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: true,
            msg: 'No pilla la query por categoria'
        });

    }
};

/** Controlador para crear anuncios*/
const createAds = async (req, res) => {
    try {
        const { producto, descripcion, precio, categoria, zona_geografica, ID_vendedor, imagen_anuncio, nombre_vendedor } = req.body;
        const ruta_foto = `uploads/${imagen_anuncio}`
        const locate = await fetch(`${urlLocation}?access_key=${claveLocation}&query=${zona_geografica}, Spain`)




        let stripeProduct = await stripe.products.create({
            name: producto,
            description: descripcion,
        });
        let stripePrice = await stripe.prices.create({
            unit_amount: precio * 100,
            currency: 'eur',
            product: stripeProduct.id,
        });
        const paymentLink = await stripe.paymentLinks.create({
            line_items: [
                {
                    price: stripePrice.id,
                    quantity: 1,
                },
            ],
        });
        let datos = await locate.json()
        let Precio_Stripe = stripePrice.id;
        let Producto_Stripe = stripeProduct.id;
        let Producto_Latitude = datos.data[0].latitude
        let Producto_Longitude = datos.data[0].longitude
        let Enlace_Pago = paymentLink.url

        let data = await postAds(producto, descripcion, precio, categoria, zona_geografica, ID_vendedor, ruta_foto, Precio_Stripe, Producto_Stripe, Producto_Latitude, Producto_Longitude, nombre_vendedor, Enlace_Pago);
        if (data && locate.ok) {
            //RETURN Y 404

            return res.status(200).json({
                ok: true,
                msg: 'Anuncio creado',
                data,
                datos: datos.data[0]
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

/** Controlador para acceder a un anuncio según su ID y actualizarlo.*/
const actualizarAds = async (req, res) => {
    let data;
    try {
        const id_anuncio = req.params.id_anuncio;
        const { producto, descripcion, precio, categoria, zona_geografica, ID_vendedor, imagen_anuncio, producto_stripe } = req.body;
        const ruta_foto = `uploads/${imagen_anuncio}`

        const originalData = await getById(id_anuncio);


        if (producto === originalData.producto && descripcion === originalData.descripcion) {
            return res.status(200).json({
                ok: true,
                msg: 'Anuncio actualizado.',
            });

        }
        const product = await stripe.products.update(producto_stripe,
            {
                name: producto,
                description: descripcion,
            });

        let stripePrice = await stripe.prices.create({
            unit_amount: precio * 100,
            currency: 'eur',
            product: producto_stripe,
        });
        let Precio_Stripe = stripePrice.id;
        const paymentLink = await stripe.paymentLinks.create({
            line_items: [
                {
                    price: stripePrice.id,
                    quantity: 1,
                },
            ],
            
        });
        
        let Enlace_Pago = paymentLink.url
        data = await updateAds(producto, descripcion, precio, categoria, zona_geografica, ID_vendedor, ruta_foto, Precio_Stripe, Enlace_Pago, id_anuncio);


        const updatedData = await getById(id_anuncio);

        return res.status(200).json({
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

/** Controlador para acceder a un anuncio según su ID y eliminarlo.*/
const deleteAds = async (req, res) => {
    try {
        let data;
        const id_anuncio = req.params.id_anuncio;

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
    deleteAds,
    getByName,
    getByUserName,
    getByIdUser,
    getByCategory
}