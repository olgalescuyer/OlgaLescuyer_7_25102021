const postModel = require('../models/postModel');
const fs = require('fs');
// file system for  images

exports.createPost = (req, res, next) => {

    const title = req.body.title;
    const text = req.body.text;
    const image = req.body.image;
    // console.log(req.body);

    const userIdFromToken = req.bearerToken.userId;
    // console.log(userIdFromToken);

    const sqlInserts = [title, text, image, userIdFromToken];
    // console.log(sqlInserts);

    postModel.insertIntoPost(sqlInserts)
        .then((response) => {
            res.status(201).json({ response });
            // console.log(response);
        })
        .catch(error => res.status(500).json({ error }));


    // const post = new Post({
    //     ...postData,
    //     image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    //     date: date.getFullYear() + "-" + month + "-" + day + " " + date.getHours() + ":" + date.getMinutes()

    // });

};

exports.modifyOnePost = (req, res, next) => {

    const { title, text, image, userId, postId } = req.body;
    // console.log(req.body);

    const userIdFromToken = req.bearerToken.userId;
    // console.log(userIdFromToken);

    // const postIdFromParams = req.params.id;
    // console.log(postIdFromParams);

    sqlInserts = [title, text, image, postId, userIdFromToken];
    // console.log(sqlInserts);

    if (userId == userIdFromToken) {

        postModel.updateOnePost(sqlInserts)
            .then(response => res.status(200).json({ message: 'Post modifié !' }))
            .catch(error => res.status(400).json({ error }));
    } else {

        res.status(400).json({ message: 'user Id from body not valid !' });
    }

};

exports.deleteOnePost = (req, res, next) => {

    const postIdFromBody = req.body.postId;
    const userIdFromBody = req.body.userId;

    const userIdFromToken = req.bearerToken.userId;
    // console.log(userIdFromToken);

    const sqlInserts = [postIdFromBody, userIdFromBody];

    if (userIdFromBody == userIdFromToken) {

        postModel.deleteOnePostByUser(sqlInserts)
            .then(response => res.status(200).json({ message: 'Article supprimée !' }))
            .catch(error => res.status(400).json({ error }));
    } else {
        res.status(400).json({ message: 'user Id from body not valid !' });
    }

};

exports.getAllPosts = (req, res, next) => {

    postModel.findAllPosts()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {

    const postIdFromParams = req.params.id;
    // console.log(postIdFromParams);

    const userIdFromToken = req.bearerToken.userId;
    // console.log(userIdFromToken);

    const sqlInserts = [postIdFromParams, userIdFromToken];
    // console.log(sqlInserts);

    postModel.findOnePostByIds(sqlInserts)
        .then(post => res.status(200).json(post[0]))
        .catch(error => res.status(404).json({ error }));

};

exports.manageLike = (req, res, next) => {

};