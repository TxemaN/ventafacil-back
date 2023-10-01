const { getAllCategories, getByNombre, postCats, borrarCat } = require('../models/categoryModels');

/**
 * @file Módulo que contiene los controladores para acceder a categorías por distintos criterios.
 */

/**
 * Controlador para obtener todas las categorías disponibles en la plataforma.
 * 
 * @function getCategorias
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Retorna una respuesta con el estado HTTP, y las categorías obtenidas o un mensaje de error.
 */
const getCategorias = async (req, res) => {
    let data;
    try {
        // Obtener todas las categorías.
        data = await getAllCategories();

        // Retornar la respuesta con las categorías.
        return res.status(200).json({
            ok: true,
            data
        });
    } catch (error) {
        console.log(error);
        // En caso de error, retornar un mensaje de error.
        return res.status(500).json({
            ok: false,
            msg: 'No pilla la query'
        });
    }
};

/**
 * Controlador para obtener categorías por nombre.
 * 
 * @function getPorNombre
 * @async
 * @param {Object} req - Objeto de solicitud HTTP, que contiene en el cuerpo el nombre a buscar.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Retorna una respuesta con el estado HTTP, y las categorías encontradas o un mensaje de error.
 */
const getPorNombre = async (req, res) => {
    let data;
    try {
        // Extraer el nombre de la solicitud.
        const { Nombre } = req.body;

        // Obtener categorías que coincidan con el nombre proporcionado.
        data = await getByNombre('%' + Nombre + '%');

        // Retornar la respuesta con las categorías.
        return res.status(200).json({
            ok: true,
            data: data
        });
    } catch (error) {
        console.log(error);
        // En caso de error, retornar un mensaje de error.
        return res.status(500).json({
            ok: false,
            msg: 'No pilla la query por nombre'
        });
    }
};


const getPorNombreComoParam = async (req, res) => {
    //   
    let data;
    try {
        const id_categoria = req.params.nombre;

        data = await getByNombre( Nombre );


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
        const { nombre, descripcion, ruta_foto } = req.body
            
        
        let data = await postCats(nombre, descripcion, ruta_foto);
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
        // En caso de error, retornar un mensaje de error.
        return res.status(500).json({
            ok: false,
            msg: 'Error al crear la categoría.'
        });
    }
};

/**
 * Controlador para eliminar una categoría según su ID.
 *
 * @function deleteCats
 * @async
 * @param {Object} req - Objeto de solicitud HTTP, que contiene en los parámetros de ruta el ID de la categoría a eliminar.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Retorna una respuesta con el estado HTTP y un mensaje de éxito o de error.
 */
const deleteCats = async (req, res) => {
    try {
        const { id_categoria } = req.params;  // Extraer el ID de la categoría de los parámetros de ruta.

        // Eliminar la categoría.
        const data = await deleteCategory(id_categoria);  // Asume una función que maneja la eliminación de la categoría.

        // Retornar la respuesta con el estado de éxito.
        return res.status(200).json({
            ok: true,
            msg: 'Categoría eliminada exitosamente.'
        });
    } catch (error) {
        console.log(error);
        // En caso de error, retornar un mensaje de error.
        return res.status(500).json({
            ok: false,
            msg: 'Error al eliminar la categoría.'
        });
    }
};

module.exports = {
    getCategorias,
    getPorNombre,
    getPorNombreComoParam,
    createCategory,
    deleteCats

}