var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var datetime = require('node-datetime')
var router = express.Router();
var knex = require('../database/knex')
var queries = require("../database/queries")

/* GET users listing. */
router.get('/', function(req, res, next) {
    // var exists = false
    var userName = req.user.nickname

    queries.Users({username: req.user.nickname})
        .then(function(){
            res.render('users', { title: 'Blog', user: req.user})
        })
    console.log('User: ' + userName)

});

router.post('/submit', function(req, res, next) {
    var postTitle = req.body.postTitle
    var postEntry = req.body.postEntry
    var postUser = req.user.nickname
    var dt = datetime.create(Date.now())
    var postDate = dt.format('Y-m-d H:M')
    var users = req.user.nickname
    console.log('Title: ',postTitle)
    console.log('Entry: ', postEntry)
    console.log('User: ', postUser)
    console.log('Date: ', postDate)
    queries.Posts({
        title: postTitle,
        body: postEntry,
        author_id: users.uid,
        postDate: postDate
    })
    .then(function(){
        res.redirect('/users/' + postTitle)
        console.log("Hello")
    })
    .catch(function(err) {
        next(err)
    })

})

router.get('/:postTitle', function(req, res, next) {
    res.render('post', {
        postTitle: req.params.postTitle
    })
})

module.exports = router;
