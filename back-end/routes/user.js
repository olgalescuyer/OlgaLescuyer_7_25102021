const express = require('express');
const router = express.Router();

const { signup, login, getOneUser, modifyOneUser, deleteOneUser } = require('../controllers/user');

router.post('/signup', signup); // new user sign up
router.post('/login', login); // new user login
router.get('/:id', getOneUser); // get user profile
router.put('/:id', modifyOneUser); // modify user profile
router.delete('/:id', deleteOneUser); // delete user profile

module.exports = router;