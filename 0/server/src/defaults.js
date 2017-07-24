const datalayer = require('./db');

exports.DbInitializator = class {
    static Campaigns(client, done) {
        client.query(
            "CREATE TYPE campaignstatus AS ENUM ('active', 'inactive', 'archived', 'deleted'); CREATE TABLE IF NOT EXISTS campaigns (id smallserial PRIMARY KEY, campaign text NOT NULL path text NOT NULL DEFAULT '/' status campaignstatus start DATE days smallserial)",
            (err) => {
                done(err);
                if(err) return console.error('Error: executing sql query', err);
            }
        );
    }

    static initialize() {
        datalayer.DB.connect((err, client, done) => {
            if(err) return console.error('Error: connecting to postgres user pool failed', err);

            exports.DbInitializator.Campaigns(client, done);
        });
    }
};

