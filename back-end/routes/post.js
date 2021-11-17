const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const { createPost, modifyOnePost, deleteOnePost, getAllPosts, getOnePost, manageLike } = require('../controllers/post');

router.post('/', auth, multer, createPost); // add new post
router.put('/:id', auth, multer, modifyOnePost); // modify one post
router.delete('/:id', auth, multer, deleteOnePost); // delete one post
router.get('/', auth, multer, getAllPosts); // get all the posts
router.get('/:id', auth, multer, getOnePost); // get one post

router.post('/:id/like', auth, manageLike); // like a post

module.exports = router;