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
        // console.log('/auth token :', req.bearerToken);

        next();

    } catch (error) {
        res.status(401).json({ error: 'Requête non authentifiée !' });
    }
}