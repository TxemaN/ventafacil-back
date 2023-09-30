const express = require('express');
const {
    userAllCOntrol,
    userBuscarControl,
    userByIdControl,
    userDeleteControl,
    userUpdateControl,
    userCreateControl,
    userByUidControl,
} = require('../controllers/userController');
const {
    checkCreateUser,
    checkUpdate,
    checkResult
} = require('../middleware/validationCheck');


const router = express.Router();

/**
 * Ruta para crear un nuevo usuario.
 *
 * @route POST /api/users/create
 * @group Usuarios - Operaciones relacionadas con usuarios.
 * @returns 201 - El usuario ha sido creado exitosamente.
 * @throws {Error} 400 - Error de validación.
 * @throws {Error} 500 - Error interno del servidor.
 */
router.post('/create', [checkCreateUser, checkResult], userCreateControl);

/**
 * Ruta para obtener todos los usuarios.
 *
 * @route GET /api/users/
 * @group Usuarios - Operaciones relacionadas con usuarios.
 * @returns  200 - Lista de usuarios.
 * @throws {Error} 500 - Error interno del servidor.
 */
router.get('/', userAllCOntrol);

/**
 * Ruta para buscar usuarios por criterios específicos.
 *
 * @route GET /api/users/buscar
 * @group Usuarios - Operaciones relacionadas con usuarios.
 * @returns  200 - Lista de usuarios que coinciden con los criterios de búsqueda.
 * @throws {Error} 500 - Error interno del servidor.
 */
router.get('/buscar', userBuscarControl);

/**
 * Ruta para obtener un usuario por su ID.
 *
 * @route GET /api/users/{id}
 * @group Usuarios - Operaciones relacionadas con usuarios.
 * @param {number} - El ID del usuario.
 * @returns  200 - Detalles del usuario.
 * @throws {Error} 404 - Usuario no encontrado.
 * @throws {Error} 500 - Error interno del servidor.
 */
router.get('/:id', userByIdControl);

router.get('/uid/:uid', userByUidControl)


/**
 * Ruta para actualizar un usuario por su ID.
 *
 * @route PUT /api/users/{id}
 * @group Usuarios - Operaciones relacionadas con usuarios.
 * @param {number}  - El ID del usuario a actualizar.
 * @returns  200 - Usuario actualizado.
 * @throws {Error} 400 - Error de validación.
 * @throws {Error} 404 - Usuario no encontrado.
 * @throws {Error} 500 - Error interno del servidor.
 */
router.put('/:uid', [checkUpdate, checkResult], userUpdateControl);



/**
 * Ruta para eliminar un usuario por su ID.
 *
 * @route DELETE /api/users/{id}
 * @group Usuarios - Operaciones relacionadas con usuarios.
 * @param {number} - El ID del usuario a eliminar.
 * @returns  200 - Mensaje de éxito.
 * @throws {Error} 404 - Usuario no encontrado.
 * @throws {Error} 500 - Error interno del servidor.
 */
router.delete('/:id', userDeleteControl);

module.exports = router;
