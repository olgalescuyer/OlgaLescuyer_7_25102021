const Post = require('../models/Post');

const fs = require('fs');
// file system for put/delete images

exports.createPost = (req, res, next) => {

    const postData = JSON.parse(req.body.postData);

    const post = new Post({
        ...postData,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        date: date.getFullYear() + "-" + month + "-" + day + " " + date.getHours() + ":" + date.getMinutes()

    });

    let sql = 'INSERT INTO post SET ?';
    db.query(sql, post, (error, result) => {
        if (error) {
            return res.status(400).json({ error: error });
        }
        return res.status(201).json({ message: "The post has been created !" })
    });

};

exports.modifyOnePost = (req, res, next) => {

    const { title, text, image } = req.body;

    let sql = 'UPDATE post SET p_title = ? p_text p_image WHERE id = ?';
    db.query(sql, [title, text, image, req.params.id], (error, result) => {
        if (error) {
            return res.status(400).json({ error: "The post can't be modified" })
        }
        return res.status(200).json(result);
    })
};

exports.deleteOnePost = (req, res, next) => {
    const id = req.params.id;
    const userId = req.u_id;

    let sql = 'DELETE FROM post WHERE id = ?';
    db.query(sql, id, (err, result) => {

    })
};

exports.getAllPosts = (req, res, next) => {
    let allPosts = [];




};

exports.getOnePost = (req, res, next) => {

};

exports.manageLike = (req, res, next) => {

};