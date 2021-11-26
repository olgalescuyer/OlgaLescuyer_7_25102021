const jwt = require('jsonwebtoken');
// authentification
require("dotenv").config();
// masque

module.exports = (req, res, next) => {
    try {
        // I grab the token from the request =>
        // split : return an array with 'Bearer' & token =>
        // I grab only token :
        const token = req.headers.authorization.split(' ')[1];

        // verify : for decode token ( payload + tokenSecret) =>
        req.bearerToken = jwt.verify(token, process.env.TOKEN);
        console.log(req.bearerToken);

        // I don't understand this :
        // if (req.body.id && req.body.id !== userId) {

        //     throw 'User ID non valable';

        // } else {
        //     next();
        // }

        next();

    } catch (error) {
        res.status(401).json({ error: 'Requête non authentifiée !' });
    }
}