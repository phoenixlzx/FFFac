
/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path')
    , MongoStore = require('connect-mongo')(express)
    , config = require('./config.js')
    , flash = require('connect-flash')
    , i18n = require('i18n');

i18n.configure({
    locales:['zh-cn'],
    defaultLocale: config.language,
    directory: './i18n',
    updateFiles: false,
    indent: "\t",
    extension: '.json'
});


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser(config.cookieSecret));
app.use(express.session({
    secret: config.cookieSecret,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}, //30 days
    store: new MongoStore({
        db: config.mongodb,
        clear_interval: 3600
    })
}));
// app.use(express.csrf());
app.use(i18n.init);
app.use(flash());
app.use(app.router);
app.use(require('less-middleware')({
    dest: __dirname + '/public/',
    src: __dirname + '/public',
    compress: true
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res) {
    req.flash('error', '404');
    res.status(404);
    res.render('404', {
        siteName: config.siteName,
        title: res.__('404') + ' - ' + config.siteName,
        allowReg: config.allowReg,
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes(app);

http.createServer(app).listen(app.get('port'), '127.0.0.1', function(){
  console.log('Express server listening on port ' + app.get('port'));
});
