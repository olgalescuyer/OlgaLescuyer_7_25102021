const db = require('../db/db-connect');
const mysql = require('mysql');

exports.insertIntoUser = (sqlInserts) => {

    let sql = `INSERT INTO user ( u_first_name, u_last_name, u_email, u_password) VALUES ( ?, ?, ?, ? )`;

    //From doc : Preparing Queries. You can use mysql.format to prepare a query 
    // with multiple insertion points, utilizing the proper escaping 
    // for ids and values. 
    sql = mysql.format(sql, sqlInserts);

    return new Promise((resolve, reject) => {

        db.query(sql, (err, result) => {

            if (err) reject({ error: 'Vous avez déjà un compte !' });
            resolve({ message: 'Utilisateur créé !' })

        })
    })
}

// let sql = 'SELECT u_email FROM user WHERE u_email = ?';
// db.query(sql, (err, result) => {}

exports.findByEmail = (email) => {

    // "let" is for "scope" :
    const sql = `SELECT * FROM user WHERE u_email = ?`;

    return new Promise((resolve, reject) => {

        db.query(sql, [email], (err, result) => {

            if (result === undefined || result.length === 0) {

                reject({ error: '👎 Utilisateur non trouvé !' })
            } else {

                console.log('result from db : ', result);
                resolve(result);
            }

        })
    })

}

exports.findUserById = (id) => {

    let sql = `SELECT * FROM user WHERE u_id = ?`;

    return new Promise((resolve, reject) => {

        db.query(sql, [id], (err, result) => {
            if (result === undefined || result.length === 0) {
                // console.log(result);

                reject({ error: '👎 Utilisateur non trouvé !' })
            } else {

                // console.log('result from db : ', result);
                resolve(result);
            }
        })
    })
}

// encapsulation :
// fetch a déjà une promesse dedans .then
// .catch je récupère reject