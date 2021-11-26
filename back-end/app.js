// express 
const express = require('express');

const app = express();

// import db config + connect :
require('./db/db-connect');

// Define Routes
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

// parser URL-encoded bodies ( as sent by HTML forms) 
// app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies ( as sent by API clients)
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

// Define Routes
app.use('/api/auth', userRoutes);
app.use('api/posts', postRoutes);

module.exports = app;