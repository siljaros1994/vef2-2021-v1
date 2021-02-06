import express from 'express';

const express = require('express');
const path = require('path');
const app = express();
const { myVideo, getElementById } = require('./src/videos.js');

app.set('view engine', 'ejs');

res.sendFile(path.join(__dirname, 'public/index.html'));

app.listen(30000, () => {
    console.log('Fannst ekki');
});

app.use((req, res) => {

    res.statusCode = 404;
    res.end("404 - page not found");
});

const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.set({ 'Content-Type': 'text/plain; charset=utf-8' });

    res.send('Home page');
});

module.exports = router;