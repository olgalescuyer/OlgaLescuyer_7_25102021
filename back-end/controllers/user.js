const User = require('../models/User');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const db = require('../db/db-connect');

const dotenv = require("dotenv");
dotenv.config();
// masque :
const tokenSecret = process.env.TOKEN;

// version 1 - signup/registre/s'inscrire - from one guy Swedish on YouTube :
exports.signup = (req, res, next) => {
    // I grab the values of req :
    const { first_name, last_name, email, password } = req.body;

    let sql = 'SELECT u_email FROM user WHERE u_email = ?';
    db.query(sql, [email], async(err, result) => {
        if (err) {
            console.log(err);
        }

        // so if there is an email in the db :
        if (result.length > 0) {
            return console.log('This email is already registered');
        }

        // const hash = await bcrypt.hash(password, 10);
        // console.log(hash);

        bcrypt.hash(password, 10)
            .then((hash) => {

                const user = new User({
                    u_first_name: first_name,
                    u_last_name: last_name,
                    u_email: email,
                    u_password: hash
                });

                let sql = 'INSERT INTO user SET ?';
                db.query(sql, user, (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        return res.status(201).json({ 
                            message:   '✔️ User successfully created' 
                        });
                    }
                });

            })
            .catch(error => res.status(500).json({ error }));



    });




};

exports.login = (req, res, next) => {

    const { email, password } = req.body;

    let sql = 'SELECT * FROM user WHERE u_email = ?';
    db.query(sql, email, password, (err, result) => {

        bcrypt.compare(password, result.u_password)
            .then((user) => {
                    if (!user) return res.status(401).json({ error: '👎 Utilisateur non trouvé !' });

                    const id = result.u_id;
                    const email = result.u_email;

                    const token = jwt.sign({ userId: id, userEmail: email }, tokenSecret, { expiresIn: "24h" });
                    res.status(200).json({ message:   '✔️ api/auth/login', token, userEmail: email });
                }

            )
            .catch(error => res.status(500).json({ error }));
    });

};

exports.getOneUser = (req, res, next) => {

};

exports.modifyOneUser = (req, res, next) => {

};

exports.deleteOneUser = (req, res, next) => {

};

// (req, res, next) => {
//     res.status(200).json({ 
//         message:   '✔️ api/auth/login' 
//     });
// }