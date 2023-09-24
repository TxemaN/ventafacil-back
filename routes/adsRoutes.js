const express = require('express');
const router = express.Router();


const {getAds, createAds, actualizarAds, deleteAds, uploadImage} = require('../controllers/adController')

//getAds
router.get('/', getAds)

//createAds
router.post('/anunciar', createAds)

//updateAds

router.put('/actualizar/:id_anuncio', actualizarAds)

//deleteAds

router.delete('/eliminar/:id_anuncio', deleteAds)

//uploadImages
router.post('/incluirimagen', uploadImage)



module.exports = router