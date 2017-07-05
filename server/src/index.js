const express = require('express');
const datalayer = require('./db');
const defaults = require('./defaults');

const app = express();
app.use('/static', express.static('/static'));

app.get('/', function (req, res) {
    datalayer.DB.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }

        //use the client for executing the query
        client.query('SELECT $1::int AS number', ['1'], function(err, result) {
            //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
            done(err);

            if(err) {
                return console.error('error running query', err);
            }
            console.log(result.rows[0].number);
            //output: 1
        });
    });

    res.send('Hello World!');
});

app.listen(80, function () {
    console.log('Server running on port 80');

    defaults.DbInitializator.initialize();
});