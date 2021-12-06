const userModel = require('../models/userModel');

const { validationResult } = require('express-validator');

require("dotenv").config();
// masque

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // grabs the values of req :
    // console.log(req.body);
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            let sqlInserts = [req.body.firstName, req.body.lastName, req.body.email, hash];
            // console.log(sqlInserts);

            userModel.insertIntoUser(sqlInserts)
                .then(response => res.status(201).json({ response }))
                .catch(error => res.status(400).json({ error }));

        })
        .catch(error => res.status(500).json({ error }));

};

exports.login = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    userModel.findByEmail(req.body.email)
        .then((user) => {
            // console.log(user);
            bcrypt.compare(req.body.password, user[0].u_password)
                .then(valid => {
                    // console.log(valid)
                    if (!valid) {
                        // console.log('Password is incorrect');
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
    // for returne a number from params :
    const userIdFromParams = parseInt(req.params.id, 10);
    // console.log('userIdFromParams :', typeof userIdFromParams);

    const userIdFromToken = req.bearerToken.userId;
    // console.log('userIdFromToken :', typeof userIdFromToken);

    // strictly Conditional Statement :
    if (userIdFromParams === userIdFromToken) {

        userModel.findUserById(userIdFromToken)
            .then(user => res.status(200).json(user[0]))
            .catch(error => res.status(404).json({ error }));

    } else {
        res.status(400).json({ message: 'user Id from params not valid !' });
    }
};

exports.modifyOneUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // for returne a number from params :
    const userIdFromParams = parseInt(req.params.id, 10);
    // console.log('userIdFromParams :', userIdFromParams);
    const userIdFromToken = req.bearerToken.userId;
    // console.log(userIdFromToken);

    if (userIdFromParams === userIdFromToken) {

        bcrypt.hash(req.body.password, 10)
            .then((hash) => {
                const sqlInserts = [req.body.firstName, req.body.lastName, req.body.email, hash, userIdFromToken];
                // console.log(sqlInserts);

                userModel.updateOneUser(sqlInserts)
                    .then(response => res.status(200).json({ message: 'User modifié !' }))
                    .catch(error => res.status(400).json({ error: '👎  !' }));

            })
            .catch(error => res.status(500).json({ error }));

    } else {
        res.status(400).json({ message: 'user Id from params not valid !' });
    }
};

exports.deleteOneUser = (req, res, next) => {
    // for returne a number from params :
    const userIdFromParams = parseInt(req.params.id, 10);
    // console.log('userIdFromParams :', userIdFromParams);
    const userIdFromToken = req.bearerToken.userId;

    if (userIdFromParams === userIdFromToken) {

        userModel.deleteOneUserByUser(userIdFromToken)
            .then(response => res.status(200).json({ message: 'User supprimé !' }))
            .catch(error => res.status(500).json({ error: '👎  !' }));
    } else {

        res.status(400).json({ message: 'user Id from params not valid !' })
    }

};