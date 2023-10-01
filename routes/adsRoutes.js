const express = require('express');
const {checkCreateAd, checkResult} = require('../middleware/validationCheck');
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
const {getAds, createAds, actualizarAds, deleteAds, getOneById, getByName, getByUserName, getByIdUser, getByCategory, getByCategoryParam} = require('../controllers/adController')

//getAds
router.get('/', getAds)
//GET BY ID
router.get('/anuncio/:id_anuncio', getOneById)

//BUSCAR POR NOMBRE PRODUCTO
router.post('/buscar', getByName )

//BUSCAR POR NOMBRE USUARIO

router.post('/buscarusuario', getByUserName )

//POR ID USUARIO 
router.get('/buscaridusuario/:id_vendedor', getByIdUser )

//BUSCAR POR CATEGORIA
router.post('/buscarcategoria', getByCategory)

router.get('/categoriaparam/:categoria', getByCategoryParam)



//createAds
router.post('/anunciar', [upload.single('imagen_anuncio'), checkCreateAd, checkResult],  createAds)

//updateAds

router.put('/actualizar/:id_anuncio', [upload.single('imagen_anuncio'), checkCreateAd, checkResult], actualizarAds)

//deleteAds

router.delete('/eliminar/:id_anuncio', deleteAds)





module.exports = router