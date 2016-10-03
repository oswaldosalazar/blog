var knex = require('./knex')

module.exports = {
    Exists: function(user) {
        return knex('users').where('username', user.username)
    },
    Users: function(data) {
        return module.exports.Exists(data)
        .then(function(user) {
            if(!user.length){
                return knex('users').insert(data)
            }
        })
    },
    User_Id: function(data) {
        return knex('users').where('username', data.username)
    },
    Posts: function(data) {
        return knex('posts').insert(data)
    },
    PostsById: function(data) {
        return knex('posts').where('id', data)
    },
    EditPost: function (id, data) {
        return knex('posts').where('id', id).update(data)
    },
    AllPosts: function(data) {
        return knex('posts').leftJoin('users', 'uid', 'author_id')
    },
    AllComments: function() {
        return knex('comments')
    },
    Comments: function(data) {
        return knex('comments').insert(data)
    },
    CommentsByPostId: function(postID) {
        return knex('comments').innerJoin('posts','posts.id', 'comments.post_id').where('post_id', postID).select('comments.id AS commentID', 'comments.comment_body AS body', 'post_id' )
    },
    CommentsById: function(commentID) {
        return knex('comments').where('comments.id', commentID).select('comments.id AS commentID', 'comments.comment_body AS body', 'post_id' )
    }
}
