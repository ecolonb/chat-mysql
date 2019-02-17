const mysql = require('mysql');
const { promisify } = require('util');
const { keysDBOptions } = require('./keys.js');

const pool = mysql.createPool(keysDBOptions);

pool.getConnection((err, connection) => {
    if (err) {
        return console.error('Database error: ', err)
    }
    if (connection) {
        console.log('Databse connection OK: ');
        return connection.release();
    }
});
// Convert callbacks to promises functions
pool.query = promisify(pool.query);

module.exports = pool;