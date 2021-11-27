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


};

exports.getAllPosts = (req, res, next) => {
    let allPosts = [];




};

exports.getOnePost = (req, res, next) => {

};

exports.manageLike = (req, res, next) => {

};