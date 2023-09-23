const express = require('express');
const router = express.Router();

const {getAds, createAds} = require('../controllers/adController')

//getAds
router.get('/', getAds)

//createAds
router.post('/anunciar', createAds)



module.exports = router