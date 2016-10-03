var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var datetime = require('node-datetime')
var router = express.Router();
var knex = require('../database/knex')
var queries = require("../database/queries")

/* GET users listing. */
router.get('/', function(req, res, next) {

    queries.Users({username: req.user.nickname})
        .then(function(){
            res.render('users', { title: 'Blog', user: req.user})
        })
});

router.post('/submit', function(req, res, next) {
    var postTitle = req.body.postTitle
    var postEntry = req.body.postEntry
    var postUser = req.user.nickname
    var dt = datetime.create(Date.now())
    var postDate = dt.format('Y-m-d H:M')

    queries.User_Id({username: req.user.nickname})
        .then(function(data) {
            return queries.Posts({
                title: postTitle,
                post_body: postEntry,
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

router.get('/posts', function(req, res, next) {
    queries.AllPosts().orderBy('id','desc')
        .then(function(posts) {
            res.render('post', {
                posts: posts
            })
        })
        .catch(function(err) {
            next(err)
        })
})

router.get('/posts/:id', function(req, res, next) {
    var id = req.params.id
    queries.PostsById(id)
    .then(function(posts){
      queries.CommentsByPostId(id)
      .then(function(comments) {
        res.render('comments', {
          posts: posts[0],
          comments: comments
        })
      })
    })
    .catch(function(err) {
    next(err)
    })
})

router.get('/posts/:id/edit', function(req, res, next) {
    var id = req.params.id

    queries.PostsById(id)
        .then(function(posts) {
            res.render('edit_post', {
                posts: posts
            })
        })
        .catch(function(err) {
        next(err)
        })
})

router.post('/posts/:id/edit', function(req, res, next) {
    var id = req.params.id
    var postTitle = req.body.postTitle
    var postEntry = req.body.postEntry

    queries.EditPost(id, {
        title: postTitle,
        post_body: postEntry,
        })
        .then(function(data) {
            res.redirect('/users/posts')
        })
        .catch(function(err) {
        next(err)
        })
})

router.get('/posts/:id/comments/edit/:commentID', function(req, res, next) {
    var id = req.params.id
    var commentID =  req.params.commentID
    console.log('commentID: ', commentID)
    queries.CommentsById(commentID)
        .then(function(comments) {
            res.render('partials/modal', {
              comments: comments[0]
            })
        })
        .catch(function(err) {
        next(err)
        })
})

router.post('/post/comment/edit', function(req, res, next) {
    var commentID = parseInt(req.body.commentID, 10)
    var commentEntry = req.body.commentEntry
    var post_id = parseInt(req.body.postId, 10)
    var dt = datetime.create(Date.now())
    var postDate = dt.format('Y-m-d H:M')
    console.log('commentID: ', commentID, typeof(commentID))
    queries.CommentsEdit(commentID, {
        comment_body: commentEntry,
        postDate: postDate
        })
        .then(function(data) {
            console.log(data)
            res.redirect('/users/posts/' + post_id)
        })
        .catch(function(err) {
            next(err)
        })
})

router.post('/submit', function(req, res, next) {
    var postTitle = req.body.postTitle
    var postEntry = req.body.postEntry
    var postUser = req.user.nickname
    var dt = datetime.create(Date.now())
    var postDate = dt.format('Y-m-d H:M')

    queries.User_Id({username: req.user.nickname})
        .then(function(data) {
            return queries.Posts({
                title: postTitle,
                post_body: postEntry,
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

router.post('/posts', function(req, res, next) {
    var commentEntry = req.body.commentEntry
    var dt = datetime.create(Date.now())
    var postDate = dt.format('Y-m-d H:M')

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
