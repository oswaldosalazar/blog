var dotenv = require('dotenv')
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport')
var fs = require('fs');
var hbs = require('hbs');
var strategy = require('./setup-passport')

var cookieParser = require('cookie-parser');
var session = require('express-session')

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup


hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartial('modal',
    fs.readFileSync(__dirname + '/views/partials/modal.hbs', 'utf8'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'shhh',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes)
app.use('/users', users)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.get('/callback',
    passport.authenticate('auth0', { failureRedirect: 'http://localhost:300/callback'}),
    function(req, res) {
        if (!req.user) {
            throw new Error('user null')
        }
        res.redirect('/user')
    })

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
