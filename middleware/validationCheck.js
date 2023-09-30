/**
 * Importa las funciones 'check' y 'validationResult' del módulo 'express-validator'.
 *
 * @requires express-validator
 */
const { check, validationResult } = require('express-validator');

//MIDDLEWARE CREACIÓN ANUNCIOS
const checkCreateAd =[
    check('producto', 'Nombre del producto obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción no puede estar en blanco').not().isEmpty(),
    check('precio', 'Los usuarios deben conocer el precio').not().isEmpty(),
    check('categoria', 'Debes elegir una categoría de la lista').not().isEmpty(),
    check('zona_geografica', 'Debes elegir una zona de la lista').not().isEmpty(),
   
]









/**
 * Middleware para validar los datos de creación de usuario.
 *
 *@type {Array}
 */
const checkCreateUser = [
    // Validación para 'nombre'
    check('nombre', 'Nombre obligatorio').not().isEmpty(),

    // Validación para 'apellidos'
    check('apellidos', 'Apellidos obligatorios').not().isEmpty(),

    // Validación para 'username'
    check('username')
        .isAlphanumeric().withMessage('El nombre de usuario debe contener solo letras y números')
        .isLength({ min: 5 }).withMessage('El nombre de usuario debe tener al menos 5 caracteres'),

    // Validación para 'email'
    check('email', 'Email obligatorio').isEmail(),

    // Validación para 'contacto'
    check('contacto', 'Contacto obligatorio').not().isEmpty(),

    // Validación para 'provincia'
    check('provincia', 'Provincia obligatoria').not().isEmpty(),

    // Validación para 'ciudad'
    check('ciudad', 'Ciudad obligatoria').not().isEmpty(),

];


/**
 * Validaciones para actualizar un usuario en el sistema.
 *
 * @type {Array}
 */
const checkUpdate = [
    // Validación para 'nombre'
    check('nombre', 'Nombre obligatorio').not().isEmpty(),

    // Validación para 'apellidos'
    check('apellidos', 'Apellidos obligatorios').not().isEmpty(),

    // Validación para 'username'
    check('username')
        .isAlphanumeric().withMessage('El nombre de usuario debe contener solo letras y números')
        .isLength({ min: 5 }).withMessage('El nombre de usuario debe tener al menos 5 caracteres'),

    // Validación para 'email'
    check('email', 'Email obligatorio').isEmail(),

    // Validación para 'contacto'
    check('contacto', 'Contacto obligatorio').not().isEmpty(),

    // Validación para 'provincia'
    check('provincia', 'Provincia obligatoria').not().isEmpty(),

    // Validación para 'ciudad'
    check('ciudad', 'Ciudad obligatoria').not().isEmpty(),
];

/**
 * Middleware para manejar los errores de validación.
 *
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {Function} next - La función para llamar al siguiente middleware.
 */
const checkResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};


module.exports = {
    checkCreateAd,
    checkCreateUser,
    checkUpdate,
    checkResult
};
