const mysql = require('mysql');
const dbConfig = require('./db-config');

const db = mysql.createConnection(dbConfig.connection);

// --"version 1" de w3schools = connection + CREATE DATABASE dans un flacon(function) :
db.connect((err) => {
    if (err) throw err;
    console.log('Database connected....');
    // db.query('CREATE DATABASE groupomania', function(err, result) {
    //     if (err) throw err;
    //     console.log('Databases created !');
    // });
});


// --"version 2" d'un type indien = sans db.connect et sans function anonyme et sans err :

// db.query('CREATE DATABASE ' + dbConfig.database);
// db.query('\
// CREATE TABLE `' + dbConfig.database + '`.`' + dbConfig.user_table + '` ( \
//     `u_id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT, \
//     `u_first_name` VARCHAR(255) NOT NULL, \
//     `u_last_name` VARCHAR(255) NOT NULL, \
//     `u_email` VARCHAR(255) NOT NULL, \
//     `u_password` VARCHAR(320) NOT NULL, \
//         PRIMARY KEY (`u_id`), \
//        UNIQUE INDEX `u_email_UNIQUE` (`u_email`) \
// )');

// console.log('Success: Database Table User Created!');

// db.end();

// ! doit-je faire les templates de table dans les ./models ?????????