/*
* Uri methods
* */

var MongoClient = require('mongodb').MongoClient,
    hat = require('hat'),
    randomstring = require("randomstring"),
    config = require('../config.js');

MongoClient.connect(config.mongoserver, {w : 1}, function(err, db) {

    if(err) {
        console.log(err);
    }
    var collection = db.collection('uri');

    exports.generateURI = function(longurl, callback) {
        var shorturl = randomstring.generate(config.urlen).toLowerCase();
        collection.insert({
            "origin": longurl,
            "short": shorturl
        }, {safe: true}, function(err) {
            callback(err, shorturl);
        });
    }

    exports.getURI = function(shorturl, callback) {
        collection.findOne({
            "short": shorturl
        }, function(err, doc) {
            if (err) {
                return callback(err, null);
            }
            if (doc) {
                callback(err, doc);
            } else {
                callback(null, null);
            }
        });
    }

    exports.checkLong = function(longurl, callback) {
        collection.findOne({
            "origin": longurl
        }, function(err, doc) {
            if (err) {
                return callback(err, null);
            }
            if (doc) {
                callback(null, doc);
            } else {
                callback(null, null);
            }
        });
    }

});
