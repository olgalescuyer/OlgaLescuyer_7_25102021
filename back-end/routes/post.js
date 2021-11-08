const express = require('express');
const router = express.Router();

router.post('/', ); // add new post
router.get('/', ); // get all the posts
router.get('/:id', ); // get one post
router.put('/:id', ); // modify one post
router.delete('/:id', ); // delete one post

module.exports = router;