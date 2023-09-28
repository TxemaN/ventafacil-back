require('../config/firebaseConfig');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, sendPasswordResetEmail, getIdToken, updateProfile, signOut } = require("firebase/auth");
// Captura del objeto contenedor de toda la data manejada por Firebase para la autenticación, necesario en todas las funciones
const auth = getAuth();
/**
 * Controlador para crear una cuenta de usuario con Firebase Auth.
 *
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise} Una promesa que resuelve en un objeto JSON con los detalles del usuario creado y el mensaje de resultado.
 * @throws {Error} Si se produce un error durante la creación del usuario.
 */
const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userCreado = await createUserWithEmailAndPassword(auth, email, password);
        //Almacenamiento del rol en la propiedad displayName
        await updateProfile(userCreado.user, { displayName: 'user' })
        //Datos necesarios para formulario SQL
        const datosPerfil = {
            uidFireBase: userCreado.user.uid,
            emailFireBase: userCreado.user.email,
            rolFireBase: userCreado.user.displayName
        };
        //Respuesta HTTP 201 Created cuenta creada
        res.status(201).json({
            ok: true,
            datosPerfil,
            message: `Usuario ${email} creado satisfactoriamente`
        });

    } catch (error) {
        //Respuesta HTTP 400 Bad Request Correo ya en uso
        if (error.code === 'auth/email-already-in-use') {
            res.status(400).json({
                ok: false,
                message: 'Correo electrónico en uso'
            });

        } else {
            console.log('Error:', error);
            // Respuesta HTTP 500 Internal Server Error
            res.status(500).json({
                ok: false,
                message: 'Error interno del servidor'
            });
        };
    };
};

/**
 * Controlador para inciar sesion con Firebase Auth.
 *
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise} Una promesa que resuelve en un objeto JSON con los detalles de inicio de sesion y mensaje de resultado.
 * @throws {Error} Si se produce un error durante el inicio de sesión.
 */
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userIniciado = await signInWithEmailAndPassword(auth, email, password);
        //Datos necesarios para formulario SQL
        const datosPerfil = {
            uidFireBase: userIniciado.user.uid,
            emailFireBase: userIniciado.user.email,
            rolFireBase: userIniciado.user.displayName
        };
        //Respuesta HTTP 200 OK inciado
        res.status(200).json({
            ok: true,
            datosPerfil,
            message: 'Sesión iniciada'
        });

    } catch (error) {
        //Respuesta HTTP 401 Unauthorized si las credenciales son incorrectas
        if (error.code === 'auth/invalid-login-credentials') {
            res.status(401).json({
                ok: false,
                message: 'Usuario o contraseña incorrectos'
            });

        } else {
            console.log('Error:', error);
            //Respuesta HTTP 500 Internal Server Error
            res.status(500).json({
                ok: false,
                message: 'Error interno del servidor'
            });
        };
    };
};

/**
 * Controlador para cambiar la contraseña de la cuenta con Firebase Auth.
 *
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise} Una promesa que resuelve en un objeto JSON con la respuesta y el mensaje de resultado.
 * @throws {Error} Si se produce un error durante el cambio de contraseña.
 */
const changePass = async (req, res) => {
    const { newPassword } = req.body;
    const user = auth.currentUser

    try {

        if (user) {
            await updatePassword(user, newPassword);

            //Respuesta HTTP 200 OK contraseña actualizada
            res.status(200).json({
                ok: true,
                message: 'Contraseña actualizada.'
            });
        } else {
            //Respuesta HTTP 401 Unauthorized si no está autenticado
            res.status(401).json({
                ok: false,
                message: 'Usuario no autenticado, inicia sesión de nuevo.'
            });
        };

    } catch (error) {
        console.log('Error:', error)
        // Respuesta HTTP 500 Internal Server Error
        res.status(500).json({
            ok: false,
            message: 'Error interno del servidor'
        });
    };
};


/**
 * Controlador para recuperar la contraseña olvidada con Firebase Auth.
 *
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise} Una promesa que resuelve en un objeto JSON con la respuesta y el mensaje de resultado.
 * @throws {Error} Si se produce un error durante la solicitud.
 */
const recoverPass = async (req, res) => {
    const { email } = req.body;

    try {
        await sendPasswordResetEmail(auth, email);
        //Respuesta HTTP 200 OK correo enviado
        res.status(200).json({
            ok: true,
            message: `Correo de recuperación enviado, si ${email} tiene cuenta asociada, recibirá un email de recuperacion.`
        });

    } catch (error) {
        console.error('Error:', error);
        // Respuesta HTTP 500 Internal Server Error
        res.status(500).json({
            ok: false,
            message: 'Error al enviar el correo de restablecimiento de contraseña.'
        });
    };
};

/**
 * Controlador para renovar token de sesion iniciada con Firebase Auth.
 *
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise} Una promesa que resuelve en un objeto JSON con el mensaje de resultado y el token renovado.
 * @throws {Error} Si se produce un error durante la renovación.
 */
const renewToken = async (req, res) => {
    const user = auth.currentUser

    if (user) {
        try {

            //Establecemos forceRefresh(parámetro opcional) true para forzar renew
            const token = await getIdToken(user, true);
            //Respuesta HTTP 200 OK renovado
            res.status(200).json({
                ok: true,
                message: 'Token de autenticación renovado con éxito',
                token
            });

        } catch (error) {
            //Respuesta HTTP 401 Unauthorized si las credenciales son incorrectas
            if (error.code === 'auth/user-not-signed-in') {
                res.status(401).json({
                    ok: false,
                    message: 'Usuario no autenticado'
                });

            } else {
                console.log(error);
                //Respuesta HTTP 500 Internal Server Error
                res.status(500).json({
                    ok: false,
                    message: 'Error del servidor'
                });
            };
        };

    } else {
        //Respuesta HTTP 401 Unauthorized si las credenciales son incorrectas
        res.status(401).json({
            ok: false,
            message: 'Usuario no autenticado'
        });
    };
};

/**
 * Controlador para cerrar sesión con Firebase Auth.
 *
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise} Una promesa que resuelve en un objeto JSON la respuesta y con el mensaje de resultado.
 * @throws {Error} Si se produce un error durante el cierre de sesión.
 */
const logout = async (req, res) => {

    try {
        await signOut(auth)
        res.status(200).json({
            ok: true,
            message: 'Sesión cerrada, hasta pronto!'
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            ok: false,
            error: 'Error al cerrar sesión'
        });
    };
};

module.exports = {
    register,
    login,
    changePass,
    recoverPass,
    renewToken,
    logout
};