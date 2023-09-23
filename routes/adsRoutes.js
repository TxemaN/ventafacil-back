const express = require('express');
const router = express.Router();

const {getAds, createAds, actualizarAds, deleteAds} = require('../controllers/adController')

//getAds
router.get('/', getAds)

//createAds
router.post('/anunciar', createAds)

//updateAds

router.put('/actualizar/:id_anuncio', actualizarAds)

router.delete('/eliminar/:id_anuncio', deleteAds)



module.exports = router