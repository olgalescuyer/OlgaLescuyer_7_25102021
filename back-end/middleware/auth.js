const jwt = require('jsonwebtoken');
// authentification
const dotenv = require("dotenv");
// masque
dotenv.config();

const tokenSecret = process.env.TOKEN;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, tokenSecret);
        const u_id = decodedToken.u_id;

        if (req.body.u_id && req.body.u_id !== u_id) {
            throw 'User ID non valable';
        } else {
            next();
        }

    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
}