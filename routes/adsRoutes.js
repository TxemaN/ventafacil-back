const express = require('express');
const router = express.Router();

const {getAds, createAds, actualizarAds} = require('../controllers/adController')

//getAds
router.get('/', getAds)

//createAds
router.post('/anunciar', createAds)

//updateAds

router.put('/actualizar/:id_anuncio', actualizarAds)



module.exports = router