const express = require('express');
const router = express.Router();

const { signup, login, getOneUser, modifyOneUser, deleteOneUser } = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', signup); // new user sign up
router.post('/login', login); // new user login

router.get('/:id', auth, getOneUser); // get user profile
router.put('/:id', auth, modifyOneUser); // modify user profile
router.delete('/:id', auth, deleteOneUser); // delete user profile

module.exports = router;