const express = require("express");
const { register, login, renew } = require('../controllers/authController');

const router = express.Router();


router.post('/register', register);

router.post('/login', login);

router.get('/renew', renew);

module.exports = router;