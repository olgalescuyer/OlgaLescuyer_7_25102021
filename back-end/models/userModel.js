const db = require('../db/db-connect');

// let sql = 'SELECT u_email FROM user WHERE u_email = ?';
// db.query(sql, (err, result) => {}

exports.findByEmail = (email) => {
        const sql = `SELECT u_email FROM user WHERE u_email = ${email}`;
        return new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {

                if (result === undefined) {
                    reject('Utilisateur non trouvé !')
                } else {
                    resolve(result);
                }

            })
        })

    }
    // encapsulation
    // fetch a déjà une promesse dedans 
    // .catch je récupère reject