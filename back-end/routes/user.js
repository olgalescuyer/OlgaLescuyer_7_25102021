const express = require('express');
const router = express.Router();

const { signupValidator, loginValidator } = require('../middleware/validator');

const { signup, login, getOneUser, modifyOneUser, deleteOneUser } = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', signupValidator, signup); // new user sign up
router.post('/login', loginValidator, login); // new user login

router.get('/:id', auth, getOneUser); // get user profile
router.put('/:id', auth, modifyOneUser); // modify user profile
router.delete('/:id', auth, deleteOneUser); // delete user profile

module.exports = router;