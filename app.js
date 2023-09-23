const express = require("express")
const cors = require('cors')
var bodyParser = require('body-parser')

const app = express();

require('dotenv').config();

const port = process.env.PORT || 3000;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.listen(port, () => {
    console.log(`Servidor ON en ${port}`)
})
  