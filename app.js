const express = require("express");
const cors = require('cors');
const  bodyParser = require('body-parser');
const firebase = require('firebase/app');



const app = express();

require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MSG_SENDER_ID,
    appId: process.env.API_ID
  };

firebase.initializeApp(firebaseConfig);
const port = process.env.PORT || 3000;

app.use(cors());



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use('/api/v1/users', require("./routes/userRoutes"));
app.use('/api/v1/auth', require('./routes/authRoutes'));

app.listen(port, () => {
    console.log(`Servidor ON en ${port}`)
})
  