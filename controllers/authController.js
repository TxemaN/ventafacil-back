const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");


const register = async (req, res) => {
    
    const {email, password} = req.body;
    const auth = getAuth();

    try {
       const userCreado = await createUserWithEmailAndPassword(auth, email, password)
       //console.log(userCredentials.user)
       res.send('usuario creado!')
    } catch (error) {
        const errorMsg = error.message
        res.send(errorMsg)
    }
}

const login = async (req, res) => {
    
    const {email, password} = req.body;
    const auth = getAuth();

    try {
       const userIniciado = await signInWithEmailAndPassword(auth, email, password)
       res.send('sesion iniciada!')
    } catch (error) {
        const errorMsg = error.message
        res.send(errorMsg)
    }
}

module.exports = {
    register,
    login
}