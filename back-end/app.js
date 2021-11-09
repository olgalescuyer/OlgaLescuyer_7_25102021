// express 
const express = require('express');

const app = express();

require('./db/mysql-config');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const path = require('path');

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// parser 
app.use(express.urlencoded({ extended: true })); //?
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('api/posts', postRoutes);

module.exports = app;