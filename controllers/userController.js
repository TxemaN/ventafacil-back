
const { createUser, deleteUser, getAllUsers, getByUsername, getUserByEmail, updateUser, getUserById ,updatePassword} = require('../models/userModel');
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
    const {
        nombre,
        apellidos,
        username,
        email,
        rol = "user",
        contacto,
        provincia,
        ciudad,
        pin, 
        confirmPin, 
    } = req.body;

    console.log('Datos recibidos de la solicitud:', req.body);

    const verificar = await checkUserExists(username, email);
    console.log('Usuario ya existe:', verificar.msg);

    if (verificar.ok) {
        return res.status(400).json({ error: verificar.msg });
    }

    if (pin !== confirmPin) {
        console.log('Las contraseñas no coinciden');
        return res.status(400).json({ error: 'Las contraseñas no coinciden' });
    }

    try {
        const hashedPin = await bcrypt.hash(pin, 10); // Usa bcrypt.hash para crear el hash de la contraseña
        let user = {
            nombre,
            apellidos,
            username,
            email,
            rol,
            contacto,
            provincia,
            ciudad,
            pin: hashedPin, 
        };

        const newUser = await createUser(user);
        console.log('Nuevo usuario creado:', newUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error durante la creación del usuario:', error);
        res.status(500).json({ error: 'Póngase en contacto con el administrador' });
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
        res.status(200).json(users);
    } catch (error) {
        console.error('Error: ', error.msg);
        res.status(500).send('Contacte al administrador');
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
            return res.status(400).send('Ingrese un ID, nombre de usuario o dirección de correo electrónico');
        }

        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error: ', error.msg);
        res.status(500).send('Contacte al administrador');
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
            return res.status(404).send('Usuario no encontrado');
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error: ', error.msg);
        res.status(500).send('Error del servidor');
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
        const userId = req.params.id;
        const updatedData = req.body;

        const updatedUser = await updateUser(userId, updatedData);

        if (!updatedUser) {
            return res.status(404).send('Usuario no encontrado');
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error: ', error.msg);
        res.status(500).send('Contacte con el administrador');
    }
};


/**
 * Controlador para cambiar la contraseña de un usuario por su ID.
 *
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise} Una promesa que resuelve en un objeto JSON con un mensaje de éxito.
 * @throws {Error} Si se produce un error durante el cambio de contraseña o si la contraseña actual es incorrecta.
 */
const userPasswordControl = async (req, res) => {
    const userId = req.params.id;
    const { currentPin, newPin, confirmPin } = req.body;

    try {
        // Obtenha o usuário do banco de dados com base no ID (você precisará implementar essa função)
        const user = await getUserById(userId);

        // Verifique se o usuário existe
        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }

        // Verifique se a senha atual fornecida é correta
        const pinMatch = await bcrypt.compare(currentPin, user.pin);

        if (!pinMatch) {
            return res.status(400).json({ error: 'Senha atual incorreta' });
        }

        // Verifique se a nova senha e a confirmação coincidem
        if (newPin !== confirmPin) {
            return res.status(400).json({ error: 'As novas senhas não coincidem' });
        }

        // Hash da nova senha
        const hashedPin = bcrypt.hashSync(newPin, 10);

        // Atualize a senha no banco de dados
        const updatedUser = await updatePassword(userId, hashedPin);

        // Inclua uma mensagem de sucesso na resposta
        res.status(200).json({ ok: true, msg: 'Senha alterada com sucesso' });
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).send('Entre em contato com o admin');
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
        if (userByUsername) return { ok: true, msg: 'Nombre de usuario ya está en uso' };
        const userByEmail = await getUserByEmail(email);
        if (userByEmail) return { ok: true, msg: 'Correo electrónico ya está en uso' };
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
    userPasswordControl
};
