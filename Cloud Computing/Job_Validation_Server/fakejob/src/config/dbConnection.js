const {createPool} = require('mysql')

let conn = createPool({
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
    socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
    connectionLimit:process.env.conLimit
})
module.exports = conn;