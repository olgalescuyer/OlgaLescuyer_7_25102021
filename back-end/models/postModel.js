const db = require('../db/db-connect');
const mysql = require('mysql');

exports.insertIntoPost = (sqlInserts) => {

    let sql = 'INSERT INTO post ( p_title, p_text, p_image, p_fk_user_id ) VALUES ( ?, ?, ?, ?)';

    sql = mysql.format(sql, sqlInserts);

    return new Promise((resolve, reject) => {

        db.query(sql, (error, result) => {

            if (result === undefined || result.affectedRows === 0) {
                reject(error);

            } else {
                // console.log('post result from db : ', result);
                console.log(result.length);
                resolve(result.insertId);
            }
        });
    })
}

exports.findOnePostByIds = (postId) => {

    let sql = 'SELECT * FROM post WHERE p_id = ? ';


    return new Promise((resolve, reject) => {

        db.query(sql, [postId], (err, result) => {

            if (result === undefined || result.length === 0) {
                // console.log(result);

                reject({ error: '👎 Article non trouvée !' })
            } else {

                // console.log('result from db : ', result);
                resolve(result);
            }
        })
    })
}

exports.updateOnePost = (sqlInserts) => {

    let sql = 'UPDATE post SET p_title = ?, p_text = ?, p_image = ? WHERE p_id = ? AND p_fk_user_id = ?';

    sql = mysql.format(sql, sqlInserts);
    // console.log(sql);

    return new Promise((resolve, reject) => {

        db.query(sql, (error, result) => {

            // checks if the result has a .changedRows :
            if (result === undefined || result.changedRows === 0) {

                console.log(result);

                reject({ error })
            } else {

                // console.log('result from db : ', result);
                resolve(result);
            }
        })
    })
}

exports.findAllPosts = () => {

    const sql = 'SELECT * FROM post INNER JOIN user ON post.p_fk_user_id = user.u_id ORDER BY p_time DESC';

    return new Promise((resolve, reject) => {

        db.query(sql, (err, result) => {

            if (result === undefined || result.length === 0) {

                reject({ error: '👎  !' })
            } else {

                // console.log('result from db : ', result);
                resolve(result);
            }
        })
    })
}

exports.deleteOnePostByUser = (postId) => {

    let sql = 'DELETE FROM post WHERE p_id = ? ';

    return new Promise((resolve, reject) => {

        db.query(sql, [postId], (err, result) => {

            if (result === undefined || result.affectedRows === 0) {
                // console.log(result);
                reject({ error })
            } else {
                // console.log('result from db : ', result);
                resolve(result);
            }
        })
    })
}