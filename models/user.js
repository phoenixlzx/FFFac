/*
* User methods
* */

var MongoClient = require('mongodb').MongoClient,
    hat = require('hat'),
    config = require('../config.js');

function User(user) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.activekey = user.activekey;
    this.role = user.role;
}

module.exports = User;

MongoClient.connect(config.mongoserver, {w : 1}, function(err, db) {

    if(err) {
        console.log(err);
    }
    var collection = db.collection('users');

// save user data.
    User.prototype.save = function(callback) {
        // user infomation to save.
        var user = {
            name: this.name,
            email: this.email,
            password: this.password,
            activekey: this.activekey,
            role: this.role
        };

        collection.count('users', function(err, count) {
            if (err) {
                return callback(err, null);
            }
            if (count === 0) {
                user.role = 'admin';
            }
            collection.insert(user, {safe: true}, function(err, user) {
                db.close();
                callback(err, user); // return user data if success.
            });
        });
    };

    User.checkActivekey = function(activekey, callback) {
        collection.findOne({
            "activekey": activekey,
            "role": 'inactive'
        }, function(err, doc) {
            if (err) {
                return callback(err, null);
            }
            if (doc) {
                callback(err, doc);
            } else {
                callback(err, null);
            }
        });
    };

    User.activate = function(activekey, callback) {
        collection.update({"activekey": activekey}, {$set : {
            "role": 'user',
            "activekey": null
        }}, function(err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    };

// read user data.
    User.get = function(name, callback) {
        collection.findOne({
            "name": name
        }, function(err, doc) {
            if (err) {
                return callback(err, null);
            }
            if (doc) {
                var user = new User(doc);
                callback(null, user);
            } else {
                callback(null, null);
            }
        });
    };

    User.check = function(name, email, callback) {
        collection.findOne({ $or : [
            {"name": name},
            {"email": email}
        ]}, function(err, doc) {
            if (err) {
                return callback(err, null);
            }
            if (doc) {
                var user = new User(doc);
                callback(null, user);
            } else {
                callback(null, null);
            }
        });
    };

    User.edit = function(user, callback) {
        collection.update({"name": user.name}, { $set: {
            "name": user.name,
            "password": user.password,
            "email": user.email
        }}, function(err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    };

    User.delete = function(username, callback) {
        collection.remove({"name": username}, function(err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    };

    User.createApi = function(username, callback) {
        collection.update({"name": username}, { $set: {
            "apikey": hat()
        }}, function(err, apikey) {
            if (err) {
                return callback(err, null);
            }
            callback(null, apikey);
        });
    };

    User.getApi = function(username, callback) {
        collection.findOne({
            "name": username
        }, function(err, doc) {
            if (err) {
                return callback(err, null);
            }
            if (doc) {
                callback(null, doc.apikey);
            } else {
                callback(null, null);
            }
        });
    };

    User.checkApi = function(apikey, callback) {
        collection.findOne({
            "apikey": apikey
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
    };

    User.createResetkey = function(username, email, callback) {
        var resetkey = hat(),
            resetTime = new Date().getTime();
        collection.update({
            "name":username,
            "email":email
        }, { $set : {
            "resetkey": resetkey,
            "resetTime": resetTime
        }}, function(err) {
            if (err) {
                return callback(err);
            }
            callback(err, resetkey);
        });
    };

    User.clearResetkey = function(resetkey) {
        setTimeout(function () {
            collection.update({"resetkey": resetkey}, { $set: {
                "resetkey": null
            }}, function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log('Resetkey ' + resetkey + ' Cleared.');
            });
        }, 3600000)
    };

    User.checkResetkey = function(resetkey, callback) {
        collection.findOne({
            "resetkey": resetkey
        }, function(err, doc) {
            if (err) {
                return callback(err, null);
            }
            if(doc) {
                var date = new Date().getTime();
                if (date - doc.resetTime > 3600000) {
                    return callback('RESETKEY_INVALID', null);
                }
                callback(null, doc); // query success, return user data.
            } else {
                callback(null, null); // query failed, return null.
            }
        });
    };
});