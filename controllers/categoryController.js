const { getAllCategories, getByNombre, postCats, borrarCat } = require('../models/categoryModels');

const getCategorias = async (req, res) => {
    //   
    let data;
    try {


        data = await getAllCategories();


     return res.status(200).json({
            ok: true,
            data
        });
    } catch (error) {
        console.log(error)
       return res.status(500).json({
            ok: true,
            msg: 'No pilla la query'
        });

    }
};

const getPorNombre = async (req, res) => {
    //   
    let data;
    try {
        const { Nombre } = req.body;

        data = await getByNombre('%' + Nombre + '%');


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

const createCategory = async (req, res) => {
    try {
        const { nombre } = req.body
            
        
        let data = await postCats(nombre);
        if (data.ok) {
          
            
          return  res.status(200).json({
                ok: true,
                msg: 'Categoría añadida',
                data
               
            });
        } else {
            throw new Error('Error al añadir categoría');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte el admin'
        });
    }
};


const deleteCats = async (req, res) => {
    try {
        let data;
        const id_categoria = req.params.id_categoria;
       
        data = await borrarCat(id_categoria);

        if (data) {
            res.status(200).json({
                ok: true,
                msg: 'Categoría retirada',
            });
        } else {
            res.status(404).json({
                ok: false,
                msg: 'La caegoría no existe',
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
    getCategorias,
    getPorNombre,
    createCategory,
    deleteCats

}