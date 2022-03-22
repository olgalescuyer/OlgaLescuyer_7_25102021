const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const {
  createPost,
  modifyOnePost,
  deleteOnePost,
  getAllPosts,
  getOnePost,
  createLike,
  updateLike
} = require("../controllers/post");

router.post("/", auth, multer, createPost); // add a new post
router.put("/:id", auth, multer, modifyOnePost); // modify one post
router.delete("/:id", auth, multer, deleteOnePost); // delete one post
router.get("/", auth, getAllPosts); // get all the posts
router.get("/:id", auth, getOnePost); // get one post

router.post("/:id/like", auth, createLike); // like-dislike one post
router.put("/:id/like", auth, updateLike); // like-dislike update like

module.exports = router;
