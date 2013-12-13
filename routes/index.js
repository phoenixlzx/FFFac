// Module dependencies
var config = require('../config.js'),
    crypto = require('crypto'),
    async = require('async'),
    hat = require('hat'),
    User = require('../models/user.js'),
    Admin = require('../models/admin.js'),
    Uri = require('../models/uri.js'),
    check = require('validator').check,
    sanitize = require('validator').sanitize,
    nodemailer = require("nodemailer");

// Mail setup
// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP", {
    service: config.serviceMailSMTP,
    // host: "smtp.moedns.com", // hostname
    //secureConnection: true, // use SSL
    // port: 465, // port for secure SMTP
    auth: {
        user: config.serviceMailUser,
        pass: config.serviceMailPass
    }
});

// App routes

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index', {
            siteName: config.siteName,
            title: res.__('HOME') + ' - ' + config.siteName,
            allowReg: config.allowReg,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.get('/signup', checkNotLogin, function(req, res) {
        res.render('signup', {
            siteName: config.siteName,
            title: res.__("SIGNUP") + ' - ' + config.siteName,
            allowReg: config.allowReg,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.post('/gosignup', checkNotLogin, function(req, res) {
        if (!config.allowReg) {
            res.redirect('/');
            return req.flash(res.__("REG_NOT_ALLOWED"));
        }
        var name = req.body.username,
            mail = req.body.email,
            password = req.body.password,
            repeatPassword = req.body['password-repeat'];

        try {
            check(name, 'USERNAME_EMPTY').notEmpty();
            check(name, 'USERNAME_ALPHANUMERIC').isAlphanumeric();
            check(password, 'PASSWORD_EMPTY').notEmpty();
            check(repeatPassword, 'PASSWORD_NOT_EQUAL').equals(password);
            check(mail, 'EMAIL_INVALID').len(4, 64).isEmail();
        } catch (e) {
            // req.flash('error', res.__(e.message));
            return res.send(500);
        }

        // get password hash
        var hash = crypto.createHash('sha256'),
            password = hash.update(req.body.password).digest('hex');
        var newUser = new User({
            name: name,
            password: password,
            email: mail,
            activekey: hat(),
            role: 'inactive'
        });
        // check if username exists.
        User.check(newUser.name, newUser.email, function(err, user){
            // console.log(user);
            if(user) {
                err = 'USER_EXISTS';
            }
            if(err) {
                // req.flash('error', res.__(err));
                return res.send(502);
            }
            newUser.save(function(err){
                if(err){
                    //req.flash('error',err);
                    return res.send(502);
                }
                // Send verification Email.
                var activeLink = 'http://' + config.url + '/activate?activekey=' + newUser.activekey;
                if (config.ssl) {
                    activeLink = 'https://' + config.url + '/activate?activekey=' + newUser.activekey;
                }
                console.log(activeLink);
                var mailOptions = {
                    from: config.serviceMailSender, // sender address
                    to: newUser.email, // list of receivers
                    subject: res.__('USER_VERIFICATION') + ' - ' + config.siteName, // Subject line
                    text: res.__('USER_VERIFICATION_BODY', newUser.name, config.siteName, activeLink)
                }
                // console.log(mailOptions.text);
                // send mail with defined transport object
                smtpTransport.sendMail(mailOptions, function(err, response) {
                    // console.log('executed');
                    if (err) {
                        console.log(err);
                    }
                    smtpTransport.close();
                    // req.session.user = newUser; // store user information to session.
                    // req.flash('success',res.__('REG_AWAITING_VERIFICATION'));
                    res.send(200);
                });

            });
        });
    });

    // User activation
    app.get('/activate', checkNotLogin, function(req, res) {
        var activekey = req.query.activekey;
        User.checkActivekey(activekey, function(err, user) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }

            if (!user) {
                req.flash('error', res.__('USER_ACTIVATED_NOT_EXIST'));
                return res.redirect('/');
            }

            User.activate(activekey, function(err) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('/');
                }
                req.session.user = user;
                req.flash('success', res.__('USER_ACTIVATED'));
                res.redirect('/');
            });
        });
    });

    // Login/logout
    app.get('/login', checkNotLogin, function(req,res){
        res.render('login',{
            title: res.__('LOGIN') + ' - ' + config.siteName,
            siteName: config.siteName,
            allowReg: config.allowReg,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.post('/gologin', checkNotLogin, function(req, res){
        // Generate password hash
        var hash = crypto.createHash('sha256'),
            password = hash.update(req.body.password).digest('hex');
        // check login details
        /*
        try {
            check(req.body.username, 'USERNAME_ALPHANUMERIC').isAlphanumeric();
        } catch (e) {
            req.flash('error', res.__(e.message));
            return res.redirect('/login');
        }
        */
        User.get(req.body.username, function(err, user) {
            if (!user) {
                // req.flash('error', res.__('LOGIN_FAIL'));

                return res.send(404); // res.redirect('/login');
            } else if (user.password != password) {
                // Send warning message.
                var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                // setup e-mail data with unicode symbols
                var mailOptions = {
                    from: config.serviceMailSender, // sender address
                    to: user.email, // list of receivers
                    subject: res.__('LOGIN_FAIL_WARNING') + ' - ' + config.siteName, // Subject line
                    text: res.__('LOGIN_FAIL_WARNING_BODY') + ip // plaintext body
                }
                // send mail with defined transport object
                smtpTransport.sendMail(mailOptions, function(err, response) {
                    // console.log('executed');
                    if (err) {
                        console.log(err);
                    }
                    smtpTransport.close();
                    // req.flash('error', res.__('LOGIN_FAIL'));
                    return res.send(401); // res.redirect('/login');
                });
            } else {
                if (user.role == 'inactive') {
                    // req.flash('error', res.__('USER_NOT_ACTIVATED'));
                    return res.send(401); // res.redirect('/login');
                } else {
                    req.session.user = user;
                    // req.flash('success', res.__('LOGIN_SUCCESS'));
                    res.send(200);
                }
            }
        });
    });


    // Password recovery
    app.get('/forgot-password', checkNotLogin, function(req, res) {
        res.render('forgot-password',{
            title: res.__('RESET_PASSWORD') + ' - ' + config.siteName,
            siteName: config.siteName,
            allowReg: config.allowReg,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.post('/forgot-password', checkNotLogin, function(req, res) {
        var mail = req.body.email,
            ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        // Check email format
        try {
            check(mail, 'EMAIL_INVALID').len(4, 64).isEmail();
        } catch (e) {
            req.flash('error', res.__(e.message));
            return res.redirect('/forgot-password');
        }

        User.check(null, mail, function(err, user) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/forgot-password');
            }
            if (!user) {
                req.flash('error', res.__('USER_NOT_FOUND'));
                return res.redirect('/reset-password');
            }

            // Get user info, generate key then send to user.
            User.createResetkey(user.name, user.email, function(err, resetkey) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('/forgot-password');
                }
                // console.log(resetkey);

                var resetLink = 'http://' + config.url + '/reset-password?resetkey=' + resetkey;
                if (config.ssl) {
                    resetLink = 'https://' + config.url + '/reset-password?resetkey=' + resetkey;
                }
                // console.log(resetLink);
                var mailOptions = {
                    from: config.serviceMailSender, // sender address
                    to: user.email, // list of receivers
                    subject: res.__('RESET_PASSWORD') + ' - ' + config.siteName, // Subject line
                    text: res.__('RESET_PASS_BODY_1') + resetLink + res.__('RESET_PASS_BODY_2') + ip // plaintext body
                }
                // send mail with defined transport object
                // console.log(mailOptions.text);
                smtpTransport.sendMail(mailOptions, function(err, response) {
                    // console.log(response);
                    if (err) {
                        console.log(err);
                    }
                    // User.clearResetkey(resetkey);
                    smtpTransport.close();
                    req.flash('success', res.__('RESET_MAIL_SENT'));
                    return res.redirect('/login');
                });
            });
        });

    });

    app.get('/reset-password', checkNotLogin, function(req, res) {
        res.render('reset-password',{
            title: res.__('RESET_PASSWORD') + ' - ' + config.siteName,
            siteName: config.siteName,
            siteTagline: config.siteTagline,
            allowReg: config.allowReg,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.post('/reset-password', checkNotLogin, function(req, res) {
        var resetkey = req.query.resetkey;

        try {
            check(req.body.password, 'PASSWORD_EMPTY').notEmpty();
            check(req.body['password-repeat'], 'PASSWORD_NOT_EQUAL').equals(req.body.password);
            check(resetkey, 'RESETKEY_INCORRECT').isAlphanumeric().len(32);
        } catch (e) {
            req.flash('error', res.__(e.message));
            return res.redirect('/');
        }

        // get password hash
        var hash = crypto.createHash('sha256'),
            password = hash.update(req.body.password).digest('hex');

        User.checkResetkey(resetkey, function(err, user) {
            if (err) {
                req.flash('error', res.__(err));
                return res.redirect('/');
            }
            if (!user) {
                req.flash('error', res.__('USER_NOT_FOUND'));
                return res.redirect('/');
            }

            var newUser = new User({
                name: user.name,
                password: password,
                email: user.email
            });

            User.edit(newUser, function(err, user){
                if(err) {
                    req.flash('error', res.__(err));
                    return res.redirect('/');
                }
                req.flash('success', res.__('PASSWORD_UPDATED'));
                req.session.user = null;
                res.redirect('/login');
            });

        });

    });

    app.post('/logout', checkLogin, function(req, res) {
        req.session.user = null;
        req.flash('success',res.__('LOGOUT_SUCCESS'));
        res.redirect('/');
    });

    app.get('/account', checkLogin, function(req, res) {
        res.render('account',{
            title: res.__('MY_ACCOUNT') + ' - ' + config.siteName,
            siteName: config.siteName,
            allowReg: config.allowReg,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.post('/account', checkLogin, function(req, res) {
        var email = req.body.email,
            hash = crypto.createHash('sha256'),
            password = hash.update(req.body.password).digest('hex'),
            newPassword = req.body.newpass,
            repeatPassword = req.body['password-repeat'],
            inputError = '';

        if (password != req.session.user.password) {
            inputError = 'WRONG_PASSWORD';
        }
        if (repeatPassword || newPassword) {
            var hash = crypto.createHash('sha256'),
                newPassword = hash.update(newPassword).digest('hex');
            var hash = crypto.createHash('sha256'),
                repeatPassword = hash.update(repeatPassword).digest('hex');
            if (repeatPassword != newPassword) {
                inputError = 'PASSWORD_NOT_EQUAL';
            }
            password = newPassword;
        }

        try {
            check(email, 'EMAIL_INVALID').len(4, 64).isEmail();
        } catch (e) {
            inputError = e.message;
        }

        if (inputError) {
            req.flash('error', res.__(inputError));
            return res.redirect('/account');
        }

        var newUser = new User({
            name: req.session.user.name,
            email: email,
            password: password
        });

        User.check(null, newUser.email, function(err, user){
            // console.log(user);
            if(user && newUser.email != req.session.user.email) {
                err = 'USER_EXISTS';
            }
            if(err) {
                req.flash('error', res.__(err));
                return res.redirect('/account');
            }

            User.edit(newUser, function(err, user){
                console.log(err);
                if(err) {
                    req.flash('error', res.__(err));
                    return res.redirect('/account');
                }
                req.flash('success', res.__('USER_UPDATED'));
                req.session.user = null;
                res.redirect('/login');
            });
        });
    });

    app.get('/special', checkLogin, function(req, res) {
        res.render('special',{
            title: res.__('SPECIAL') + ' - ' + config.siteName,
            siteName: config.siteName,
            allowReg: config.allowReg,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.post('/geturi', function(req, res) {
        var longurl = req.body.longurl;
        if (longurl.indexOf('://') === -1) {
            longurl = 'http://' + longurl;
        }
        try {
            check(longurl, 'URL_INVALID').isUrl();
        } catch (e) {
            return res.send(400, res.__(e.message));
        }
        Uri.checkLong(longurl, function(err, doc) {
            if (err) {
                res.send(502, err.message);
            }
            if (longurl.startsWith('http://fff.ac') || longurl.startsWith('https://fff.ac')) {
                return res.send(400);
            }
            if (doc) {
                res.send(200, doc.short);
            } else {
                Uri.generateURI(longurl, function(err, shortUri) {
                    if (err) {
                        res.send(502, err.message);
                    }
                    res.send(200, shortUri);
                });
            }
        });
    });

    app.get('/:shorturi', function(req, res) {
        // console.log(req.params.shorturi);
        Uri.getURI(req.params.shorturi, function(err, doc) {
            // console.log(doc);
            if (err) {
                console.log(err.message);
            }
            if (!doc) {
                // TODO Uri 404 Page
                return res.redirect('/');
            } else {
                res.redirect(doc.origin);
            }
            /*
            res.render('jump',{
                title: res.__('JUMPING') + ' - ' + config.siteName,
                siteName: config.siteName,
                allowReg: config.allowReg,
                user: req.session.user,
                longurl: doc.origin,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
            */
        });
    });
}

// Session functions
function checkLogin(req, res, next) {
    if(!req.session.user) {
        req.flash('error', res.__('LOGIN_NEEDED'));
        return res.redirect('/login');
    }
    next();
}

function checkNotLogin(req, res, next) {
    if(req.session.user) {
        req.flash('error', res.__('ALREADY_LOGIN'));
        return res.redirect('/');
    }
    next();
}

// Useful stuff
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
  };
}