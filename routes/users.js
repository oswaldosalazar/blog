var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var datetime = require('node-datetime')
var router = express.Router();
var knex = require('../database/knex')
var queries = require("../database/queries")

/* GET users listing. */
router.get('/', function(req, res, next) {
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

    console.log('Title: ',postTitle)
    console.log('Entry: ', postEntry)
    console.log('User: ', postUser)
    console.log('Date: ', postDate)

    queries.User_Id({username: req.user.nickname})
        .then(function(data) {
            console.log(data[0].uid)
            return queries.Posts({
                title: postTitle,
                body: postEntry,
                author_id: data[0].uid,
                postDate: postDate
            })
        })
        .then(function(data) {
            res.redirect('/users/posts')
            console.log("Hello")
        })
        .catch(function(err) {
            next(err)
        })
})

router.get('/posts', function(req, res, next) {
    queries.AllPosts()//.orderBy('id','desc')
        .then(function(posts) {
            console.log('All posts: ', posts)
            res.render('post', {
                posts: posts
            })
        })

    // res.render('post', {
    //     title: 'Welcome to Express'
    // })

})

module.exports = router;
