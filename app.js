const express = require("express")
const cors = require('cors')

const app = express();

require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(cors());

//parse application/x-www-form-urlencoded 
app.use(express.urlencoded({ extended: false }))

//parse application/json
app.use(express.json())

app.use('/api/v1/ventafacil/ads', require('./routes/adsRoutes'));

app.use('/api/v1/users', require("./routes/userRoutes"));

app.use('/api/v1/auth', require('./routes/authRoutes'));

app.listen(port, () => {
    console.log(`Servidor ON en ${port}`)
})
  