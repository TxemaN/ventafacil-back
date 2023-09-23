const express = require('express');
const router = express.Router();

const {getAds} = require('../controllers/adController')

//getAds
router.get('/', getAds)




module.exports = router