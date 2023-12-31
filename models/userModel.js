

const { pool } = require('../utils/connectPool');  
const { queriesUser } = require('./queries2');

/**
 * Cria um novo usuário no banco de dados.
 *
 * @param {Object} user - As informações do usuário a serem inseridas.
 * @param {string} user.nombre - O nome do usuário.
 * @param {string} user.apellidos - Os apelidos do usuário.
 * @param {string} user.username - O nome de usuário do usuário.
 * @param {string} user.email - O endereço de e-mail do usuário.
 * @param {string} user.rol - O papel do usuário (por padrão, 'user').
 * @param {number} user.contacto - O número de contato do usuário.
 * @param {string} user.provincia - A província do usuário.
 * @param {string} user.ciudad - A cidade do usuário.
 * @param {string} user.pin - O PIN do usuário.
 * @returns {Promise<Object>} O usuário criado.
 * @throws {Error} Se ocorrer um erro durante a criação do usuário.
 */
const createUser = async (user) => {
    const {  uid_Firebase,nombre, apellidos, username, email, rol= "user", contacto, provincia, ciudad } = user;

    console.log(user)
    try {
        const client = await pool.connect();
        const result = await client.query(
            queriesUser.criarUser,
            [ uid_Firebase,nombre, apellidos, username, email,rol ,contacto,provincia,  ciudad  ]
        );
        client.release();
        return result.rows[0];  
    } catch (error) {
        console.error('Error in createUser: ', error);
        throw error;
    }
};

/**
 * Obtiene todos los usuarios almacenados en la base de datos.
 *
 * @returns {Promise<Array>} Un array de todos los usuarios.
 * @throws {Error} Si ocurre un error al obtener los usuarios.
 */
const getAllUsers = async () => {
    try {
        const client = await pool.connect();
   
        const result = await client.query(queriesUser.mostrarTodosUsers);
        client.release();
        return result.rows;  // Retorna todos los usuarios
    } catch (error) {
        console.error('Error en getAllUsers: ', error);
        throw error;
    }
};

/**
 * Obtiene un usuario por su dirección de correo electrónico.
 *
 * @param {string} email - La dirección de correo electrónico del usuario.
 * @returns {Promise<Object>} El usuario encontrado o `undefined` si no se encuentra.
 * @throws {Error} Si ocurre un error al obtener el usuario por correo electrónico.
 */
const getUserByEmail = async (email) => {
    try {
        const client = await pool.connect();
        const result = await client.query(queriesUser.buscarPorEmail, [email]);
        client.release();
        return result.rows[0];  // Retorna el usuario encontrado o `undefined`
    } catch (error) {
        console.error('Error en getUserByEmail: ', error);
        throw error;
    }
};


/**
 * Obtiene un usuario por su nombre de usuario.
 *
 * @param {string} username - El nombre de usuario del usuario.
 * @returns {Promise<Object>} El usuario encontrado o `undefined` si no se encuentra.
 * @throws {Error} Si ocurre un error al obtener el usuario por nombre de usuario.
 */
const getByUsername = async (username) => {
    try {
        const client = await pool.connect();
        const result = await client.query(queriesUser.buscarPorUsername, [username]);
        client.release();
        return result.rows[0]; 
    } catch (error) {
        console.error('Error en getByUsername: ', error);
        throw error;
    }
};


/**
 * Obtiene un usuario por su ID.
 *
 * @param {number} id - El ID del usuario que se desea obtener.
 * @returns {Promise<Object>} El usuario encontrado o `undefined` si no se encuentra.
 * @throws {Error} Si ocurre un error al obtener el usuario por su ID.
 */
const getUserById = async (id) => {
    try {
        const client = await pool.connect();
        const result = await client.query(queriesUser.buscarPorId, [id]);
        client.release();
        return result.rows[0];  // Retorna el usuario encontrado o `undefined`
    } catch (error) {
        console.error('Error en getUserById: ', error);
        throw error;
    }
};

/**
 * Esta función obtiene un usuario de la base de datos basándose en su UID.
 *
 * @async
 * @function
 * @param {string} uid - El UID del usuario que se quiere obtener.
 * @returns {Promise<Object>} El objeto del usuario si se encuentra, undefined si no se encuentra.
 * @throws Se lanzará un error si hay un problema con la conexión a la base de datos o la consulta.
 */
const getUserByUid = async (uid) => {
    try {
        const client = await pool.connect();
        const result = await client.query(queriesUser.buscarPorUid, [uid]);  // Mudar 'buscarPorId' para 'buscarPorUid'
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error en getUserByUid: ', error);
        throw error;
    }
};



/**
 * Actualiza los datos de un usuario por su ID.
 *
 * @param {number} id - El ID del usuario que se desea actualizar.
 * @param {Object} updatedData - Los nuevos datos del usuario a actualizar.
 * @param {string} updatedData.nombre - El nuevo nombre del usuario.
 * @param {string} updatedData.apellidos - Los nuevos apellidos del usuario.
 * @param {string} updatedData.username - El nuevo nombre de usuario del usuario.
 * @param {string} updatedData.email - El nuevo correo electrónico del usuario.
 * @param {string} updatedData.rol - El nuevo rol del usuario.
 * @param {number} updatedData.contacto - El nuevo número de contacto del usuario.
 * @param {string} updatedData.provincia - La nueva provincia del usuario.
 * @param {string} updatedData.ciudad - La nueva ciudad del usuario.
 * @returns {Promise<Object>} El usuario actualizado.
 * @throws {Error} Si ocurre un error al actualizar los datos del usuario.
 */
const updateUser = async (uid_Firebase, updatedData) => {
    const { nombre, apellidos, username, email, rol, contacto, provincia, ciudad } = updatedData;
  
    try {
        const client = await pool.connect();
        const result = await client.query(
            queriesUser.actualizarUser,
            [uid_Firebase, nombre, apellidos, username, email, rol, contacto, provincia, ciudad, uid_Firebase]  
        );
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error en updateUser: ', error);
        throw error;
    }
};



/**
 * Elimina un usuario por su ID.
 *
 * @param {number} id - El ID del usuario que se desea eliminar.
 * @returns {Promise<Object>} Un mensaje indicando que el usuario se ha eliminado correctamente.
 * @throws {Error} Si ocurre un error al eliminar el usuario.
 */
const deleteUser = async (id) => {
    try {
        const client = await pool.connect();
        await client.query(queriesUser.deletarUser, [id]);
        client.release();
        return { message: 'Usuario eliminado correctamente.' };
    } catch (error) {
        console.error('Error en deleteUser: ', error);
        throw error;
    }
};



module.exports = {
    createUser,
    getAllUsers,
    getUserByEmail,
    getByUsername,
    getUserById,
    updateUser,
    deleteUser,
    getUserByUid
};
