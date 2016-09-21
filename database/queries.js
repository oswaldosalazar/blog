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
    AllComments: function(data) {
        return knex('comments')
    },
    Comments: function(data) {
        return knex('comments').insert(data)
    },
    CommentsByPostId: function(data) {
        return knex('comments').leftJoin('posts','posts.id', 'post_id').where('post_id', data)
    },
    CommentsById: function(data) {
        return knex('comments').where('id', data)
    }
}
