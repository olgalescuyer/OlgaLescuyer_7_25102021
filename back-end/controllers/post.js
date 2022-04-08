const postModel = require("../models/postModel");
const likeModel = require("../models/likeModel");
const fs = require("fs");
// file system for  images

const { validationResult } = require("express-validator");

exports.createPost = (req, res, next) => {
  const postData = JSON.parse(req.body.post);
  // console.log("post data :", postData);
  // console.log("req file :", req.file);
  // console.log("req body :", req.body.post);

  let imageUrl = req.file;
  imageUrl === undefined
    ? (imageUrl = null)
    : (imageUrl = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`);

  const sqlInserts = [
    postData.title,
    postData.text,
    imageUrl,
    req.bearerToken.userId,
  ];
  // console.log(sqlInserts);

  postModel
    .insertIntoPost(sqlInserts)
    .then((postId) => {
      res.status(201).json({ postId, message: "Post créé !" });
      // console.log(response);
    })
    .catch((error) => res.status(500).json({ error: "👎 !" }));
};

exports.modifyOnePost = (req, res, next) => {
  // console.log(req.body);
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        image: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...JSON.parse(req.body.post) };

  // console.log("postObject", postObject);

  const sqlInserts = [
    postObject.title,
    postObject.text,
    postObject.image,
    req.params.id,
    req.bearerToken.userId,
  ];
  // console.log("--------------------------", sqlInserts);

  const deletePostWithImg = (img) => {
    const filename = img.split("/images/")[1];

    fs.unlink(`images/${filename}`, (err) => {
      if (err) {
        updatePost(sqlInserts);
        console.log(err);
      } else {
        console.log(`\nDeleted file: ${filename}`);
        updatePost(sqlInserts);
      }
    });
  };

  const updatePost = (inserts) => {
    postModel
      .updateOnePost(inserts)
      .then((response) => res.status(200).json({ message: "Post modifié !" }))
      .catch((error) => res.status(500).json({ error }));
  };

  postModel
    .findOnePostByIds(req.params.id)
    .then((post) => {
      if (post[0].p_fk_user_id === req.bearerToken.userId) {
        post[0].p_image === postObject.image || post[0].p_image === null
          ? updatePost(sqlInserts)
          : deletePostWithImg(post[0].p_image);
      } else {
        res.status(401).json({ message: "Id from token is not a valid" });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteOnePost = (req, res, next) => {
  const postId = [req.params.id];

  const deletePost = (postId) => {
    postModel
      .deleteOnePostByUser(postId)
      .then((response) =>
        res.status(200).json({ message: "Article supprimée !" })
      )
      .catch((error) => res.status(400).json({ error }));
  };

  const deletePostWithImg = (img) => {
    const filename = img.split("/images/")[1];
    // console.log(filename);

    filename
      ? fs.unlink(`images/${filename}`, (err) => {
          if (err) {
            console.log(err);
            deletePost(postId);
          } else {
            // console.log(`\nDeleted file: ${filename}`);
            deletePost(postId);
          }
        })
      : deletePost(postId);
  };

  postModel
    .findOnePostByIds(postId)
    .then((post) => {
      if (
        post[0].p_fk_user_id === req.bearerToken.userId ||
        req.bearerToken.userId === 127
      ) {
        post[0].p_image
          ? deletePostWithImg(post[0].p_image)
          : deletePost(postId);
      } else {
        res.status(400).json({ message: "Id from token is not a valid" });
      }
    })

    .catch((error) => res.status(500).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
  const userIdFromToken = req.bearerToken.userId;
  // console.log(userIdFromToken);

  const sqlInserts = [userIdFromToken, userIdFromToken];
  postModel
    .findAllPosts(sqlInserts)
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  const postIdFromParams = req.params.id;
  // console.log(postIdFromParams);

  const userIdFromToken = req.bearerToken.userId;
  // console.log(userIdFromToken);

  const sqlInserts = [postIdFromParams];
  // console.log(sqlInserts);

  postModel
    .findOnePostByIds(sqlInserts)
    .then((post) => {
      userIdFromToken === post[0].p_fk_user_id
        ? res.status(200).json(post[0])
        : res.status(401).json({ error });
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.createLike = (req, res, next) => {
  const sqlInserts = [req.bearerToken.userId, req.params.id, req.body.like];

  likeModel
    .insertIntoLike(sqlInserts)
    .then((response) => {
      res.status(201).json({ response });
      // console.log(response);
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.updateLike = (req, res, next) => {
  const sqlInserts = [
    req.body.likeId,
    req.body.userId,
    req.params.id,
    req.body.like,
  ];

  // console.log(sqlInserts);

  likeModel
    .updateLikeOfUser(sqlInserts)
    .then((response) => {
      res.status(201).json({ response });
      // console.log(response);
    })
    .catch((error) => res.status(500).json({ error }));
};
