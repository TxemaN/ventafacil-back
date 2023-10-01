const express = require('express');
const router = express.Router();

const {
     getCategorias,
    getPorNombre,
    createCategory,
    deleteCats } = require('../controllers/categoryController')


/** 
 * Ruta para obtener todas las categorías.
 * 
 * @name getCategorias
 * @path {GET} /
 * @action getCategorias
 */
router.get('/', getCategorias);

/** 
 * Ruta para crear una nueva categoría.
 * 
 * @name createCategory
 * @path {POST} /agregar
 * @action createCategory
 */
router.post('/agregar', createCategory);

/** 
 * Ruta para eliminar una categoría basada en su id.
 * 
 * @name deleteCats
 * @path {DELETE} /eliminar/:id_categoria
 * @action deleteCats
 */
router.delete('/eliminar/:id_categoria', deleteCats);

module.exports = router;