"use strict";


let mongo = require('mongodb');
let client = mongo.MongoClient;
let _db;

module.exports = {
    connect() {
        client.connect('mongodb://localhost:27017/chat-dev', (err, db) => {
            if (err) {
                console.log("Error connecting to Mongo");
                process.exit(1);
            }
            _db = db;
            console.log("Connected to Mongo");
        });
    },
    contacts() {
        return _db.collection('contacts');
    },
    groups() {
        return _db.collection('groups');
    }
}
