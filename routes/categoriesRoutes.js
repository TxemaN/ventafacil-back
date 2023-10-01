const express = require('express');
const router = express.Router();

const { getCategorias,
    getPorNombre,
    getPorNombreComoParam,
    createCategory,
    deleteCats} = require('../controllers/categoryController')

router.get('/', getCategorias)
router.get('/pornombre/:nombre', getCategorias)

router.post('/agregar',  createCategory)

router.delete('/eliminar/:id_categoria', deleteCats)

module.exports = router