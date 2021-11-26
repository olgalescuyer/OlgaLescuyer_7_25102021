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
            console.log('coucou');

            // if (result === undefined) {


            //     reject({ error: 'undefined' })

            // } else if (result.length === 0) {

            //     reject({ error: 'email déjà existe !' })
            // } else {

            //     console.log('result from db : ', result);
            //     resolve(result);
            // }


            if (err) reject({ error: 'Vous avez déjà un compte !' });
            resolve({ message: 'Utilisateur créé !' })

        })
    })
}

exports.findByEmail = (email) => {

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

    const sql = `SELECT * FROM user WHERE u_id = ?`;

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

exports.updateOneUser = (sqlInserts, userId) => {

    let sql = `UPDATE user SET u_first_name = ?, u_last_name = ?, u_email = ? WHERE u_id = ` + db.escape(userId);

    sql = mysql.format(sql, sqlInserts);



    return new Promise((resolve, reject) => {

        db.query(sql, sqlInserts, (err, result) => {

            if (result === undefined || result.length === 0) {

                reject({ error: '👎  !' })
            } else {

                console.log('result from db : ', result);
                resolve(result);
            }

        })
    })

}

exports.deleteOneUserByUser = (userId) => {

    let sql = `DELETE FROM user WHERE u_id = ` + db.escape(userId);

    return new Promise((resolve, reject) => {

        db.query(sql, (err, result) => {

            if (result === undefined || result.length === 0) {

                reject({ error: '👎  !' })
            } else {

                console.log('result from db : ', result);
                resolve(result);
            }

        })
    })
}

// encapsulation :
// fetch a déjà une promesse dedans .then
// .catch je récupère reject