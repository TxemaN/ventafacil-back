const express = require("express")
const cors = require('cors')
const  bodyParser = require('body-parser')

const app = express();

require('dotenv').config();

const port = process.env.PORT || 3000;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/api/v1/ventafacil/ads', require('./routes/adsRoutes'));

app.use('/api/v1/users', require("./routes/userRoutes"));


app.listen(port, () => {
    console.log(`Servidor ON en ${port}`)
})
  