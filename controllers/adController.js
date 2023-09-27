
const { getAllAds, postAds, updateAds, getById, getByNombre, getByNombreUsuario, getByCategoria, borrarAd } = require('../models/adsModel');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const urlLocation = "http://api.positionstack.com/v1/forward";
const claveLocation= process.env.LOCATION_KEY

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
      return  res.status(200).json({
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
      return  res.status(200).json({
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

const getByCategory = async (req, res) => {
    //   
    let data;
    try {
        const { Categoria } = req.body;

        data = await getByCategoria(Categoria);

//RETURN ADEMÁS DE STATUS
      return  res.status(200).json({
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
        const { Producto, Descripcion, Precio, Categoria, Zona_Geografica, ID_Vendedor, Ruta_foto = `uploads/${req.file.filename}`, Nombre_Vendedor } = req.body;
       
        const locate = await fetch(`${urlLocation}?access_key=${claveLocation}&query=${Zona_Geografica}, Spain`)
            
                
               
                
        let stripeProduct = await stripe.products.create({
            name: Producto,
            description: Descripcion,
        });
        let stripePrice = await stripe.prices.create({
            unit_amount: Precio * 100,
            currency: 'eur',
            product: stripeProduct.id,
        });
        let datos = await locate.json()
        let Precio_Stripe = stripePrice.id;
        let Producto_Stripe = stripeProduct.id;
        let Producto_Latitude =datos.data[0].latitude
        let Producto_Longitude =datos.data[0].longitude
        
        let data = await postAds(Producto, Descripcion, Precio, Categoria, Zona_Geografica, ID_Vendedor,  Ruta_foto, Precio_Stripe, Producto_Stripe, Producto_Latitude, Producto_Longitude, Nombre_Vendedor );
        if (data&&locate.ok) {
           //RETURN Y 404
            
          return  res.status(200).json({
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
        const { Producto, Descripcion, Precio, Categoria, Zona_Geografica, ID_Vendedor, Nombre_vendedor, Ruta_foto = `uploads/${req.file.filename}`, Producto_Stripe } = req.body;


       


        const originalData = await getById(id_anuncio);


        if (Producto === originalData.Producto && Descripcion === originalData.Descripcion) {
            return res.status(200).json({
                ok: true,
                msg: 'Anuncio actualizado.',
            });

        }
        const product = await stripe.products.update(Producto_Stripe,
            {
                name: Producto,
                description: Descripcion,
            });

            let stripePrice = await stripe.prices.create({
                unit_amount: Precio * 100,
                currency: 'eur',
                product: Producto_Stripe,
            });
            let Precio_Stripe = stripePrice.id;
        data = await updateAds(Producto, Descripcion, Precio, Categoria, Zona_Geografica, ID_Vendedor, Nombre_vendedor, Ruta_foto, Precio_Stripe, id_anuncio);


        const updatedData = await getById(id_anuncio);

      return  res.status(200).json({
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
    getByCategory
}