const postModel = require('../models/postModel');
const fs = require('fs');
// file system for  images

const { validationResult } = require('express-validator');

exports.createPost = (req, res, next) => {
    const postData = JSON.parse(req.body.post);
    // console.log(postData);
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    // console.log(imageUrl);

    const sqlInserts = [postData.title, postData.text, imageUrl, req.bearerToken.userId];
    // console.log(sqlInserts);

    postModel.insertIntoPost(sqlInserts)
        .then((response) => {
            res.status(201).json({ message: 'Post créé !' });
            // console.log(response);
        })
        .catch(error => res.status(500).json({ error: '👎 !' }));

};

exports.modifyOnePost = (req, res, next) => {
    const sqlInserts = [req.params.id, req.bearerToken.userId];

    postModel.findOnePostByIds(sqlInserts)
        .then(post => {
            const filename = post[0].p_image.split('/images/')[1];
            // console.log(filename);
            fs.unlink(`images/${filename}`, (err => {
                if (err) {
                    console.log(err);
                } else {
                    // console.log(`\nDeleted file: ${filename}`);

                    const postObject = req.file ? {
                        ...JSON.parse(req.body.post),
                        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    } : {...req.body };

                    const sqlInserts = [postObject.title, postObject.text, postObject.image, req.params.id, req.bearerToken.userId];
                    // console.log('sqlInserts :', sqlInserts);

                    postModel.updateOnePost(sqlInserts)
                        .then(response => res.status(200).json({ message: 'Post modifié !' }))
                        .catch(error => res.status(500).json({ error }));

                }
            }))
        })


    .catch(error => res.status(400).json({ error }));

};

exports.deleteOnePost = (req, res, next) => {

    const sqlInserts = [req.params.id, req.bearerToken.userId];

    postModel.findOnePostByIds(sqlInserts)
        .then(post => {
            const filename = post[0].p_image.split('/images/')[1];
            // console.log(filename);
            fs.unlink(`images/${filename}`, (err => {
                if (err) {
                    console.log(err);
                } else {
                    // console.log(`\nDeleted file: ${filename}`);

                    postModel.deleteOnePostByUser(sqlInserts)
                        .then(response => res.status(200).json({ message: 'Article supprimée !' }))
                        .catch(error => res.status(400).json({ error }));
                }
            }))
        })
        .catch(error => res.status(500).json({ error }));
}

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

    const userIdFromToken = req.bearerToken.userId;
    // console.log(userIdFromToken);

    const postIdFromParams = req.params.id;
    // console.log(postIdFromParams);

    const like = req.body.like;


};