const { send } = require('micro')
const MongoClient = require('mongodb').MongoClient
const co = require('co')
const assert = require('assert')

module.exports = (request, response) => {
    co(function*() {
        const db = yield MongoClient.connect('mongodb://jairperezs:D1e560*9c@proschool-shard-00-00-ahjmk.mongodb.net:27017,proschool-shard-00-01-ahjmk.mongodb.net:27017,proschool-shard-00-02-ahjmk.mongodb.net:27017/test?ssl=true&replicaSet=Proschool-shard-0&authSource=admin');
        console.log("Connected correctly to server");

        const col = db.collection('documents');

        const docs = yield col.find().toArray()
        send(response, 200, docs)

        db.close();
    }).catch(err => console.log(err.stack))
}

