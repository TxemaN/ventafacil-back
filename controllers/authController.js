require('../config/firebaseConfig')
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, sendPasswordResetEmail, getIdToken } = require("firebase/auth");

const register = async (req, res) => {
    const { email, password } = req.body;
    const auth = getAuth();

    try {
        //console.log(auth)
        const userCreado = await createUserWithEmailAndPassword(auth, email, password);
        //Respuesta HTTP 201 Created cuenta creada
        res.status(201).json({
            ok: true,
            userCreado: userCreado.user,
            message: `Usuario ${email} creado satisfactoriamente`
        });
        //res.send('usuario creado!')
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
            // const errorMsg = error.message
            // res.send(errorMsg)
        };
    };
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const auth = getAuth();

    try {
        const userIniciado = await signInWithEmailAndPassword(auth, email, password);
        //Respuesta HTTP 200 OK inciado
        res.status(200).json({
            ok: true,
            userIniciado: userIniciado.user,
            message: 'Sesión iniciada'
        });
        // res.send('sesion iniciada!')
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
            // const errorMsg = error.message
            // res.send(errorMsg)
        };
    };
};

const changePass = async (req, res) => {
    const newPassword = req.body.newPassword;
    const auth = getAuth();
    const user = auth.currentUser

    try {

        if (user) {
            await updatePassword(newPassword);

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

const recoverPass = async (req, res) => {
    const { email } = req.body;
    const auth = getAuth();

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

const renewToken = async (req, res) => {
    const auth = getAuth();
    const user = auth.currentUser

    // console.log(user)
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
        // Usuario no autenticado
        res.status(401).json({
            ok: false,
            message: 'Usuario no autenticado'
        });
    };
};


module.exports = {
    register,
    login,
    changePass,
    recoverPass,
    renewToken
};