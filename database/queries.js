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
    AllPosts: function(data) {
        return knex('posts').leftJoin('users', 'uid', 'author_id')
    },
    Post_Id: function(data) {
        return knex('posts').where('post_id', data)
    },
    Comments: function(data) {
        return knex('comments').insert(data)
    }
}
