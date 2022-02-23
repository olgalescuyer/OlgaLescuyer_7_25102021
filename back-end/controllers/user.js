const userModel = require("../models/userModel");
const fs = require("fs");

const { validationResult } = require("express-validator");

require("dotenv").config();
// masque

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // grabs the values of req :
  // console.log(req.body);
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      let sqlInserts = [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        hash,
        req.body.admin,
      ];
      // console.log(sqlInserts);

      userModel
        .insertIntoUser(sqlInserts)
        .then((dataUser) =>
          res.status(201).json({
            userId: dataUser.insertId,
            token: jwt.sign({ userId: dataUser.insertId }, process.env.TOKEN, {
              expiresIn: "24h",
            }),
          })
        )
        .catch((error) =>
          res.status(400).json({ message: "Vous avez déjà un compte !" })
        );
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  userModel
    .findByEmail(req.body.email)
    .then((user) => {
      // console.log(user);
      bcrypt
        .compare(req.body.password, user[0].u_password)
        .then((valid) => {
          // console.log(valid)
          if (!valid) {
            // console.log('Password is incorrect');
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user[0].u_id,
            role: user[0].u_admin === 1 ? "admin" : "membre",
            token: jwt.sign({ userId: user[0].u_id }, process.env.TOKEN, {
              expiresIn: "24h",
            }),
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
    userModel
      .findUserById(userIdFromToken)
      .then((user) => res.status(200).json(user[0]))
      .catch((error) => res.status(404).json({ error }));
  } else {
    res.status(400).json({ message: "user Id from params not valid !" });
  }
};

exports.modifyOneUser = (req, res, next) => {
  // - compare id token & id params for api security ;
  // -- find the user - query db ;

  // -- check if new obj has a new image file ;
  // ---- delete old image file by fs.unlink ;

  // -- check if new obj has a new password ;
  // --- add bcrypt for new password ;

  // -- make a new object for the db ;
  // --- update the user - query db ;

  // validator :
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // for return a number from params :
  const userIdFromParams = parseInt(req.params.id, 10);
  const userIdFromToken = req.bearerToken.userId;

  const userObject = req.file
    ? {
        ...JSON.parse(req.body.user),
        image: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
        ...JSON.parse(req.body.user),
        image: null,
      };

  const isAuthorized = (tokenId, paramsId) =>
    tokenId === paramsId ? true : false;

  const deleteImg = (img) => {
    const filename = img.split("/images/")[1];

    fs.unlink(`images/${filename}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`\nDeleted file: ${filename}`);
      }
    });
  };

  const updateUser = (sqlInserts) => {
    userModel
      .updateOneUser(sqlInserts)
      .then((response) => {
        res.status(200).json({ message: "User modifié !!" });
      })
      .catch((error) => res.status(500).json({ error }));
  };

  !isAuthorized(userIdFromToken, userIdFromParams)
    ? res.status(401).json({ message: "Unathorized" })
    : userModel
        .findUserById(userIdFromToken)
        .then((user) => {
          // console.log(user);

          bcrypt
            .hash(userObject.password, 10)
            .then((hash) => {
              sqlInserts = [
                userIdFromToken,
                userObject.firstName,
                userObject.lastName,
                userObject.email,
                hash,
                userObject.image,
              ];
              // console.log(sqlInserts);
              updateUser(sqlInserts);
            })
            .catch((error) => res.status(500).json({ error }));

          user[0].u_avatar !== null
            ? deleteImg(user[0].u_avatar)
            : console.log("from db img", user[0].u_avatar);
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.deleteOneUser = (req, res, next) => {
  // for returne a number from params :
  const userIdFromParams = parseInt(req.params.id, 10);
  // console.log('userIdFromParams :', userIdFromParams);
  const userIdFromToken = req.bearerToken.userId;

  if (userIdFromParams === userIdFromToken) {
    userModel
      .deleteOneUserByUser(userIdFromToken)
      .then((response) => res.status(200).json({ message: "User supprimé !" }))
      .catch((error) => res.status(500).json({ error: "👎  !" }));
  } else {
    res.status(400).json({ message: "user Id from params not valid !" });
  }
};
