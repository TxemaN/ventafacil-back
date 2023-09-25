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
const {getAds, createAds, actualizarAds, deleteAds, getOneById} = require('../controllers/adController')

//getAds
router.get('/', getAds)

router.get('/:id_anuncio', getOneById)

//createAds
router.post('/anunciar', upload.single('imagen_anuncio'),  createAds)

//updateAds

router.put('/actualizar/:id_anuncio', actualizarAds)

//deleteAds

router.delete('/eliminar/:id_anuncio', deleteAds)





module.exports = router