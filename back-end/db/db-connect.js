const mysql = require('mysql');
const dbConfig = require('./db-config');

const db = mysql.createConnection(dbConfig);

// db.connect();

// // testing of the connection : 
// db.query('SELECT 1 + 1 AS solution', function(error, results, fields) {

//     if (error) {
//         return console.error('error: ' + error.message);
//     }
//     // if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
//     console.log('Database connected....');
// });

// db.end();

db.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + db.threadId);
});

// db.connect((err) => {
//     if (err) throw err;
//     console.log('Database connected....');

// });

module.exports = db;