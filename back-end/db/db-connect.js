const mysql = require('mysql');
const dbConfig = require('./db-config');

const db = mysql.createConnection(dbConfig.connection);

db.connect((err) => {
    if (err) throw err;
    console.log('Database connected....');

});