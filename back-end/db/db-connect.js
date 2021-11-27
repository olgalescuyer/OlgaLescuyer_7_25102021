const mysql = require('mysql');
const dbConfig = require('./db-config');

const db = mysql.createConnection(dbConfig);

db.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + db.threadId);
});

module.exports = db;