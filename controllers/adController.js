
const { getAllAds, postAds, updateAds, getById, getByNombre, getByNombreUsuario, getByIdUsuario, getByCategoria, borrarAd } = require('../models/adsModel');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const urlLocation = "http://api.positionstack.com/v1/forward";
const claveLocation = process.env.LOCATION_KEY

/**
 * @file Módulo que contiene los controladores para las rutas de los anuncios.
 */

/**
 * Controlador para obtener todos los anuncios.
 * 
 * @function getAds
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Retorna una respuesta con el estado HTTP y los datos obtenidos o un mensaje de error.
 */
const getAds = async (req, res) => {
    let data;
    try {
        data = await getAllAds();
        return res.status(200).json({
            ok: true,
            data
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'No pilla la query'
        });
    }
};

/**
 * Controlador para obtener un anuncio específico por su ID.
 * 
 * @function getOneById
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Retorna una respuesta con el estado HTTP y los datos obtenidos o un mensaje de error.
 */
const getOneById = async (req, res) => {
    let data;
    try {
        const id_anuncio = req.params.id_anuncio;
        data = await getById(id_anuncio);
        return res.status(200).json({
            ok: true,
            data
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'No pilla la query'
        });
    }
};

/**
 * Controlador para obtener anuncios basados en el nombre del producto.
 * 
 * @function getByName
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Retorna una respuesta con el estado HTTP y los datos obtenidos o un mensaje de error.
 */
const getByName = async (req, res) => {
    let data;
    try {
        const { producto } = req.body;
        data = await getByNombre('%' + producto + '%');
        return res.status(200).json({
            ok: true,
            data: data
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'No pilla la query por nombre'
        });
    }
};

/**
 * Controlador para obtener anuncios basados en el nombre del vendedor.
 * 
 * @function getByUserName
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Retorna una respuesta con el estado HTTP y los datos obtenidos o un mensaje de error.
 */
const getByUserName = async (req, res) => {
    let data;
    try {
        const { Nombre_Vendedor } = req.body;
        data = await getByNombreUsuario(Nombre_Vendedor);
        return res.status(200).json({
            ok: true,
            data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No pilla la query por nombre de usuario'
        });
    }
};

/**
 * Controlador para obtener anuncios basados en el ID del vendedor.
 * 
 * @function getByIdUser
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Retorna una respuesta con el estado HTTP y los datos obtenidos o un mensaje de error.
 */
const getByIdUser = async (req, res) => {
    let data;
    try {
        const id_vendedor = req.params.id_vendedor;
        data = await getByIdUsuario(id_vendedor);
        return res.status(200).json({
            ok: true,
            data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No pilla la query por ID de usuario'
        });
    }
};

/**
 * Controlador para obtener anuncios basados en la categoría del producto.
 * 
 * @function getByCategory
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Retorna una respuesta con el estado HTTP y los datos obtenidos o un mensaje de error.
 */
const getByCategory = async (req, res) => {
    let data;
    try {
        const { Categoria } = req.body;
        data = await getByCategoria(Categoria);
        return res.status(200).json({
            ok: true,
            data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No pilla la query por categoria'
        });
    }
};


const getByCategoryParam = async (req, res) => {
    //   
    let data;
    try {
        const categoria = req.params.categoria;

        data = await getByCategoria(categoria);

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
        // Desestructuración de los datos necesarios del cuerpo de la solicitud.
        const { producto, descripcion, precio, categoria, zona_geografica, ID_vendedor, imagen_anuncio, nombre_vendedor } = req.body;
        
        // Ruta donde se almacenará la foto del anuncio.
        const ruta_foto = `uploads/${imagen_anuncio}`;
        
        // Consulta a un servicio externo para obtener la ubicación geográfica del anuncio.
        const locate = await fetch(`${urlLocation}?access_key=${claveLocation}&query=${zona_geografica}, Spain`);
        
        // Creación del producto en la plataforma de Stripe.
        let stripeProduct = await stripe.products.create({
            name: producto,
            description: descripcion,
        });
        
        // Creación del precio del producto en la plataforma de Stripe.
        let stripePrice = await stripe.prices.create({
            unit_amount: precio * 100,
            currency: 'eur',
            product: stripeProduct.id,
        });
        
        // Creación de un enlace de pago en la plataforma de Stripe.
        const paymentLink = await stripe.paymentLinks.create({
            line_items: [
                {
                    price: stripePrice.id,
                    quantity: 1,
                },
            ],
        });
        
        // Obtención de los datos de la ubicación geográfica.
        let datos = await locate.json();
        
        // Asignación de valores adicionales para la creación del anuncio.
        let Precio_Stripe = stripePrice.id;
        let Producto_Stripe = stripeProduct.id;
        let Producto_Latitude = datos.data[0].latitude;
        let Producto_Longitude = datos.data[0].longitude;
        let Enlace_Pago = paymentLink.url;
        
        // Llamada a la función para crear el anuncio en la base de datos.
        let data = await postAds(producto, descripcion, precio, categoria, zona_geografica, ID_vendedor, ruta_foto, Precio_Stripe, Producto_Stripe, Producto_Latitude, Producto_Longitude, nombre_vendedor, Enlace_Pago);
        
        // Verificación del éxito en la creación del anuncio y la obtención de la ubicación.
        if (data && locate.ok) {
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



/**
 * Controlador para actualizar un anuncio en la plataforma, dado su ID.
 * 
 * @function actualizarAds
 * @async
 * @param {Object} req - Objeto de solicitud HTTP, que contiene en el cuerpo los datos necesarios para actualizar el anuncio y en los parámetros el ID del anuncio a actualizar.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Retorna una respuesta con el estado HTTP y un mensaje indicando si el anuncio fue actualizado exitosamente o un mensaje de error.
 */
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

/**
 * Controlador para eliminar un anuncio de la plataforma, dado su ID.
 * 
 * @function deleteAds
 * @async
 * @param {Object} req - Objeto de solicitud HTTP, que contiene en los parámetros el ID del anuncio a eliminar.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Retorna una respuesta con el estado HTTP y un mensaje indicando si el anuncio fue eliminado exitosamente o un mensaje de error.
 */
const deleteAds = async (req, res) => {
    try {
        const id_anuncio = req.params.id_anuncio;

        const data = await borrarAd(id_anuncio);

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
    getByCategory,
    getByCategoryParam
}