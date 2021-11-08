const express = require('express');
const router = express.Router();

router.post('/signup', ); // new user sign up

router.post('/login', (req, res, next) => {
    res.status(200).json({ 
        message:   '✔️ api/auth/login' 
    });
}); // user login

router.get('/:id', ); // get user profile
router.put('/:id', ); // modify user profile
router.delete('/:id', ); // delete user profile

module.exports = router;