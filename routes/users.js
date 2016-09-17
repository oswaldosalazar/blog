var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var datetime = require('node-datetime')
var router = express.Router();
var knex = require('../database/knex')
var queries = require("../database/queries")

/* GET users listing. */
router.get('/', function(req, res, next) {
    // var userName = req.user.nickname

    queries.Users({username: req.user.nickname})
        .then(function(){
            res.render('users', { title: 'Blog', user: req.user})
        })
    // console.log('User: ' + userName)
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
                post_body: postEntry,
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
            // queries.AllComments()
            // .then(function(comments) {
                // var post_id = comments[0].post_id
                // console.log(comments)
                // console.log(data[0].uid)
                // return queries.CommentsById(post_id)
                // .then(function(data) {
                    // console.log(data)
                    res.render('post', {
                        posts: posts
                    })
                // })
            // })
        })
        .catch(function(err) {
            next(err)
        })

})

router.post('/posts', function(req, res, next) {
    var commentEntry = req.body.commentEntry
    var dt = datetime.create(Date.now())
    var postDate = dt.format('Y-m-d H:M')
    console.log('Comment: ',commentEntry)
    console.log('Date: ', postDate)

    queries.User_Id({username: req.user.nickname})
        .then(function(data) {
            return queries.Comments({
                comment_body: commentEntry,
                post_id: req.body.postId,
                author_id: data[0].uid,
                postDate: postDate
            })
        })
        .then(function(data) {
            res.redirect('/users/posts')
        })
        .catch(function(err) {
            next(err)
        })
})

module.exports = router;
