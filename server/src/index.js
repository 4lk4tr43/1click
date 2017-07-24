const express = require('express');
const datalayer = require('./db');
const defaults = require('./defaults');

const app = express();
app.use('/static', express.static('/static'));

app.get('/', function (req, res) {
    res.send('This is the 1click service.');
});

app.get('/search-replace', function (req, res) {
    res.send('This is the 1click service.');
});

app.listen(80, function () {
    console.log('Server running on port 80');

    defaults.DbInitializator.initialize();
});