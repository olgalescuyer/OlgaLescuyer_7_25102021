// express 
const express = require('express');

const app = express();

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.urlencoded({ extended: true })); //?
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('api/posts', postRoutes);

module.exports = app;