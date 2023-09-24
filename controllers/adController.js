const { getAllAds, postAds, updateAds, getById, borrarAd } = require('../models/adsModel');
const { postPics } = require('../models/picModel');



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
        const { Producto, Descripcion, Precio, Categoria, Zona_Geografica, Gasto_Envio_Incluido, ID_Vendedor } = req.body;

        if (!Producto || !Descripcion || !Precio || !Categoria || !Zona_Geografica || !Gasto_Envio_Incluido || !ID_Vendedor) {
            return res.status(400).json({
                ok: false,
                msg: "rellene todos los campos"
            });
        }

        data = await postAds(Producto, Descripcion, Precio, Categoria, Zona_Geografica, Gasto_Envio_Incluido, ID_Vendedor);

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

const uploadImage = async (req, res) => {
   
    let data;
    try {
        const { id_anuncio, ruta_foto=`uploads/${req.file.filename}` } = req.body;

        if (!id_anuncio || !ruta_foto) {
            return res.status(400).json({
                ok: false,
                msg: "rellene todos los campos"
            });
        }

        data = await postPics(id_anuncio, ruta_foto );
        console.log(ruta_foto)
        if (data) {
            res.status(200).json({
                ok: true,
                msg: 'Imagen agregada',
                data
            });
        } else {
            throw new Error('Error al agreagar la imagen');
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
        const { Producto, Descripcion, Precio, Categoria, Zona_Geografica, Gasto_Envio_Incluido, ID_Vendedor } = req.body;


        if (!Producto || !Descripcion || !Precio || !Categoria || !Zona_Geografica || !Gasto_Envio_Incluido || !ID_Vendedor) {
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
        data = await updateAds(Producto, Descripcion, Precio, Categoria, Zona_Geografica, Gasto_Envio_Incluido, ID_Vendedor, id_anuncio);


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
    createAds,
    uploadImage,
    actualizarAds,
    deleteAds
}