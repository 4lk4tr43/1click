const pg = require('pg');

const config = {
    user: process.env.POSTGRES_USER,
    database: '',
    password: process.env.POSTGRES_PASSWORD,
    host: 'postgres',
    port: 5432,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
};

const pool = new pg.Pool(config);

pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack);
});

exports.DB = class {
    static connect(callback) { // callback(err, client, done)
        return pool.connect(callback);
    }
    static query(text, values, callback) { // callback(err, result)
        return pool.query(text, values, callback);
    }
};