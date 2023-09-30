const express = require('express');
const router = express.Router();

const { getCategorias,
    getPorNombre,
    createCategory,
    deleteCats} = require('../controllers/categoryController')

router.get('/', getCategorias)


router.post('/agregar',  createCategory)

router.delete('/eliminar/:id_categoria', deleteCats)

module.exports = router