const db = require('../db/db-connect');
const mysql = require('mysql');

exports.insertIntoLike = (sqlInserts) => {

    let sql = 'INSERT INTO like_or_not ( l_fk_user_id, l_fk_post_id, l_choice ) VALUES ( ?, ?, ?)';
    sql = mysql.format(sql, sqlInserts);

    return new Promise((resolve, reject) => {

        db.query(sql, (error, result) => {

            if (result === undefined || result.affectedRows === 0) {
                reject(error);

            } else {
                // console.log('post result.insertId from db : ', result.insertId);
                resolve(result);
            }
        });
    })
}

exports.updateLikeOfUser = (sqlInserts) => {

    let sql = `REPLACE INTO like_or_not ( l_choice ) VALUES ( ? )`;
    sql = mysql.format(sql, sqlInserts);

    return new Promise((resolve, reject) => {

        db.query(sql, (err, result) => {

            if (result === undefined || result.affectedRows === 0) {
                // console.log('result from db : ', result);
                reject(err)
            } else {

                // console.log('result from db : ', result);
                resolve(result);
            }

        })
    })
}

exports.findLike = (sqlInserts) => {

    let sql = `SELECT * FROM like_or_not WHERE l_fk_post_id =  AND l_fk_user_id = ?`;
    sql = mysql.format(sql, sqlInserts);

    db.query(sql, (err, result) => {
        if (result === undefined || result.length === 0) {
            // console.log('result from db : ', result);
            reject(err)
        } else {

            // console.log('result from db : ', result);
            resolve(result);
        }

    })
}