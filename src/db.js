var mysql = require('mysql')

const ConfigParser = require('configparser');
const config = new ConfigParser();
config.read('.config.ini');

var host = config.get('DB', 'host');
var user = config.get('DB', 'user');
var password = config.get('DB', 'password');

var pool = mysql.createPool({
    connectionLimit: 1,
    host: host,
    user: user,
    password: password
})
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
        return
})
module.exports = pool