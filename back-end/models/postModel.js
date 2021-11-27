const db = require('../db/db-connect');
const mysql = require('mysql');

exports.insertIntoPost = (sqlInserts) => {

    let sql = 'INSERT INTO post ( p_title, p_text, p_image, p_fk_user_id ) VALUES ( ?, ?, ?, ?)';

    sql = mysql.format(sql, sqlInserts);

    return new Promise((resolve, reject) => {

        db.query(sql, (error, result) => {

            if (result === undefined || result.length === 0) {

                reject({ error: '👎 !' })

            } else {

                // console.log('post result.insertId from db : ', result.insertId);

                resolve({ message: 'Post créé !' })
            }
        });

    })

}

// if (error) {
//     return res.status(400).json({ error: error });
// }
// return res.status(201).json({ message: "The post has been created !" })