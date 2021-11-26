const userModel = require('../models/userModel');
const db = require('../db/db-connect');
const mysql = require('mysql');

require("dotenv").config();
// masque


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
    // I grab the values of req :
    // const { first_name, last_name, email, password } = req.body;

    console.log(req.body.firstName);

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;


    bcrypt.hash(password, 10)

    .then((hash) => {
            console.log(hash);

            let sqlInserts = [firstName, lastName, email, hash];

            userModel.insertIntoUser(sqlInserts)

            .then((response) => {
                    res.status(201).json({ response });
                    console.log(response);
                })
                .catch(error => res.status(400).json({ error }));

        })
        .catch(error => res.status(500).json({ error }));

};

exports.login = (req, res, next) => {

    // const { u_email, password } = req.body;
    // or :
    const email = req.body.email;
    const password = req.body.password;

    console.log('req.body : ', email, password);

    userModel.findByEmail(email)
        .then((user) => {

            console.log('response from userModel :', user[0].u_password);
            console.log('user is an ', typeof user)

            // res.status(200).json(user[0]); // !!!! don't touch it

            bcrypt.compare(req.body.password, user[0].u_password)

            .then(valid => {

                    console.log(valid)

                    if (!valid) {
                        console.log('Password is incorrect');
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }

                    res.status(200).json({
                        userId: user[0].u_id,
                        role: user[0].u_admin === 1 ? 'admin' : 'membre',
                        token: jwt.sign({ userId: user[0].u_id },
                            process.env.TOKEN, { expiresIn: '24h' }
                        )
                    });
                })
                .catch((error) => res.status(500).json({ error }));

        })
        .catch((error) => res.status(404).json({ error }));

};

exports.getOneUser = (req, res, next) => {

    // console.log(req.params);
    // grabs the id from params of request ?? :
    // const id = req.params.id;

    // or from token ? :
    const idFromToken = req.bearerToken.userId;
    // console.log(idFromToken);

    // save the id in a params of the method :
    userModel.findUserById(idFromToken)
        .then(user => res.status(200).json(user[0]))
        .catch(error => res.status(404).json({ error }));

};

exports.modifyOneUser = (req, res, next) => {

};

exports.deleteOneUser = (req, res, next) => {

};