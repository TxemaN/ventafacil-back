const firebase = require('firebase/app');
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MSG_SENDER_ID,
    appId: process.env.API_ID
};
// const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getIdToken } = require("firebase/auth");
firebase.initializeApp(firebaseConfig);

const register = async (req, res) => {
    const { email, password } = req.body;
    const auth = getAuth();

    try {
        //console.log(auth)
        const userCreado = await createUserWithEmailAndPassword(auth, email, password);
        //Respuesta HTTP 201 Created cuenta creada
        res.status(201).json({
            ok: true,
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
            console.log(error);
            // Respuesta HTTP 500 Internal Server Error para otros errores
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
            userIniciado,
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
            console.log(error);
            // Respuesta HTTP 500 Internal Server Error para otros errores
            res.status(500).json({
                ok: false,
                message: 'Error interno del servidor'
            });
            // const errorMsg = error.message
            // res.send(errorMsg)
        };
    };
};

const renew = async (req, res) => {
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
                //Respuesta HTTP 500 Internal Server Error para otros errores
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
    renew
};