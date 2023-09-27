const express = require("express");
const { register, login, changePass, recoverPass, renewToken } = require('../controllers/authController');

const router = express.Router();


router.post('/register', register);

router.post('/login', login);

router.post('/changepass', changePass);

router.post('/recoverpass', recoverPass);

router.get('/renew', renewToken);

module.exports = router;