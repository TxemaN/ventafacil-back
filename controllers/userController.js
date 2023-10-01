
const { createUser, deleteUser, getAllUsers, getByUsername, getUserByEmail, updateUser, getUserById,getUserByUid } = require('../models/userModel');

const bcrypt = require('bcrypt');

/**
 * Controlador para crear un nuevo usuario en el sistema.
 *
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise} Una promesa que resuelve en un objeto JSON con los detalles del usuario creado.
 * @throws {Error} Si se produce un error durante la creación del usuario.
 */
const userCreateControl = async (req, res) => {
    try {
    const {
        uid_Firebase,nombre, apellidos, username, email, rol, contacto, provincia, ciudad
    } = req.body;

    console.log('Datos recibidos de la solicitud:', req.body);

    const verificar = await checkUserExists(username, email);
    console.log('Usuario ya existe:', verificar.msg);

    if (verificar.ok) {
        return res.status(400).json({ 
            ok: false ,
            msg: verificar.msg });
    }


    const newUser = await createUser({
        uid_Firebase,
        nombre,
        apellidos,
        username,
        email,
        rol,
        contacto,
        provincia,
        ciudad
    });

        console.log('Nuevo usuario creado:', newUser);
        return res.status(201).json({ok:true,newUser});
    } catch (error) {
        console.error('Error durante la creación del usuario:', error);
       return  res.status(500).json({ok:false ,msg: 'Póngase en contacto con el administrador' });
    }
};



/**
 * Controlador para obtener todos los usuarios del sistema.
 *
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise} Una promesa que resuelve en un objeto JSON con la lista de todos los usuarios.
 * @throws {Error} Si se produce un error al obtener la lista de usuarios.
 */
const userAllCOntrol = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({ok:true,users});
    } catch (error) {
         console.error('Error durante la creación del usuario:', error);
       return  res.status(500).json({ok:false ,msg: 'Póngase en contacto con el administrador' });
    }
};


/**
 * Controlador para buscar un usuario por ID, nombre de usuario o dirección de correo electrónico.
 *
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise} Una promesa que resuelve en un objeto JSON con el usuario encontrado.
 * @throws {Error} Si se produce un error durante la búsqueda o si el usuario no se encuentra.
 */
const userBuscarControl = async (req, res) => {
    try {
        const { id, username, email } = req.body;
        let user;
        
        if (id) {
            user = await getUserById(id);
        } else if (username) {
            user = await getByUsername(username);
        } else if (email) {
            user = await getUserByEmail(email);
        } else {
            return res.status(400).json({ok:false ,
                msg:'Ingrese un ID, nombre de usuario o dirección de correo electrónico.'});
        }

        if (!user) {
            return res.status(404).json('Usuario no encontrado.');
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error durante la creación del usuario:', error);
        return  res.status(500).json({ok:false ,msg: 'Póngase en contacto con el administrador' });
    }
};

const userByUidControl = async (req, res) => {
    try {
        const user = await getUserByUid(req.params.uid);  // Mudar 'id' para 'uid'

        if (!user) {
            return res.status(404).json('Usuario no encontrado.');
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error durante la búsqueda del usuario:', error);
        return res.status(500).json({ok:false, msg: 'Póngase en contacto con el administrador'});
    }
};




/**
 * Controlador para obtener un usuario por su ID.
 *
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise} Una promesa que resuelve en un objeto JSON con el usuario encontrado por su ID.
 * @throws {Error} Si se produce un error durante la búsqueda o si el usuario no se encuentra.
 */
const userByIdControl = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);

        if (!user) {
            return res.status(404).json('Usuario no encontrado.');
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error durante la creación del usuario:', error);
        return  res.status(500).json({ok:false ,msg: 'Póngase en contacto con el administrador' });
    }
};


/**
 * Controlador para actualizar un usuario por su ID.
 *
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise} Una promesa que resuelve en un objeto JSON con el usuario actualizado por su ID.
 * @throws {Error} Si se produce un error durante la actualización o si el usuario no se encuentra.
 */
const userUpdateControl = async (req, res) => {
    try {
        const userId = req.params.uid; 

        const updatedData = req.body;
        console.log('Dados recebidos:', updatedData);
        const updatedUser = await updateUser(userId, updatedData);

        if (!updatedUser) {
            return res.status(404).json('Usuario no encontrado.');
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error durante la creación del usuario:', error);
        return  res.status(500).json({ok:false ,msg: 'Póngase en contacto con el administrador' });
    }
};


/**
 * Controlador para eliminar un usuario por su ID.
 *
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise} - Una promesa que representa la ejecución de la función.
 * @throws {Error} Si ocurre un error durante la eliminación del usuario.
 */
const userDeleteControl = async (req, res) => {
    try {
        const userId = req.params.id;
        const deleted = await deleteUser(userId);

        if (!deleted) {
            return res.status(404).json('Usuario no encontrado.');
        }

        res.status(200).send('Usuario eliminado correctamente.');
    } catch (error) {
        console.error('Error durante la creación del usuario:', error);
        return  res.status(500).json({ok:false ,msg: 'Póngase en contacto con el administrador' });
    }
};





/**
 * Comprueba si un nombre de usuario o una dirección de correo electrónico ya están en uso por otros usuarios.
 * @param {string} username - El nombre de usuario a comprobar.
 * @param {string} email - La dirección de correo electrónico a comprobar.
 * @returns {Promise} Una promesa que resuelve en un objeto JSON con una indicación de si el nombre de usuario o el correo electrónico ya están en uso y un mensaje correspondiente.
 * @throws {Error} Si se produce un error durante la comprobación.
 */
const checkUserExists = async (username, email) => {
    try {
        const userByUsername = await getByUsername(username);
        if (userByUsername) return { ok: false, msg: 'Nombre de usuario ya está en uso' };
        const userByEmail = await getUserByEmail(email);
        if (userByEmail) return { ok: false, msg: 'Correo electrónico ya está en uso' };
        return { ok: false, msg: '' };
    } catch (error) {
        console.error('Error: ', error.msg);
        throw new Error('Contacte con el administrador');
    }
};




module.exports = {
    userCreateControl,
    userAllCOntrol,
    userBuscarControl,
    userByIdControl,
    userUpdateControl,
    userDeleteControl,
    userByUidControl
    
};

