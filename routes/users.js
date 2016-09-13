var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var bodyParser = require('body-parser')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('users', { title: 'Blog', user: req.user});
    var userName = req.user.nickname
    console.log('User: ' + userName)
});

router.get('/:postTitle', function(req, res, next) {
    res.render('post', {
        postTitle: req.params.postTitle
    })
})

router.post('/submit', function(req, res, next) {
    var postTitle = req.body.postTitle
    var postEntry = req.body.postEntry
    res.redirect('/users/' + postTitle)
    console.log('Title: ',postTitle)
    console.log('Entry: ', postEntry)

})

module.exports = router;
