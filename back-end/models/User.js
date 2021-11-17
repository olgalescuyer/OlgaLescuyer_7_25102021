const mysql = require('mysql');

const User = (user) => {
    this.u_id = user.u_id,
        this.u_first_name = user.u_first_name,
        this.u_last_name = user.u_last_name,
        this.u_email = user.u_email,
        this.u_password = user.u_password
};

module.exports = User;