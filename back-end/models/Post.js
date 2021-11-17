const mysql = require('mysql');

const Post = (post) => {

    this.p_id = post.p_id,
        this.p_fk_user_id = post.p_fk_user_id,
        this.p_title = post.p_title,
        this.p_rext = post.p_rext,
        this.p_image = post.p_image,
        this.p_time = post.p_time
};

module.exports = Post;