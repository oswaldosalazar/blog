var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */

var env = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:4000/callback'
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Blog', env: env });
});

router.get('/login', function(req, res){
    res.render('login', { env: env })
})

router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
})

router.get('/callback',
    passport.authenticate('auth0', {failureRedirect: 'http://localhost:4000/callback'}),
    function(req, res) {
        res.redirect(req.session.returnTo || '/users')
    })

module.exports = router;
