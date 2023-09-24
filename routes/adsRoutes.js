const express = require('express');
const router = express.Router();
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    
    cb(null, file.fieldname  + "-" + Date.now() + '.png' )
  }
})
const upload = multer({ storage: storage })
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
router.post('/incluirimagen', upload.single('imagen_anuncio'), uploadImage)



module.exports = router