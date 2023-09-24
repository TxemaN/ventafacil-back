/**
 * Importa las funciones 'check' y 'validationResult' del módulo 'express-validator'.
 *
 * @requires express-validator
 */
const { check, validationResult } = require('express-validator');


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

    // Validación para 'password'
    check('pin')
        .notEmpty().withMessage('Contraseña obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        .matches(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/).withMessage('La contraseña debe contener al menos 1 mayúscula y 1 número'),

    // Validación para 'confirmPassword'
    check('confirmPin', 'Confirmación de contraseña obligatoria').not().isEmpty(),
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
 * Validaciones para la contraseña de un usuario.
 *
 * @type {Array}
 */
const checkPassword = [
    // Validación para 'password'
    check('newPin')
        .notEmpty().withMessage('Contraseña obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        .matches(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/).withMessage('La contraseña debe contener al menos 1 mayúscula y 1 número'),

    // Validación para 'confirmPassword'
    check('confirmPin', 'Confirmación de contraseña obligatoria').not().isEmpty()
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
    checkCreateUser,
    checkUpdate,
    checkPassword,
    checkResult
};
