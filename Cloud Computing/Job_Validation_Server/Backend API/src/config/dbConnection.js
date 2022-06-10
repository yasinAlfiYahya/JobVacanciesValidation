const {createPool}  = require('mysql');
require('dotenv').config()



let conn = createPool({
    host:"35.225.172.171",
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
    connectionLimit:process.env.conLimit
})


module.exports = conn;