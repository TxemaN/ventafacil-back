const {Pool} = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database:'Ventafacil' ,
    password: "1234"

  });

  module.exports = {pool}