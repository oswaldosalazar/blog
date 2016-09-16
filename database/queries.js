var knex = require('./knex')

module.exports = {
    Exists: function(user) {
        console.log("From Query Exists: ", user.username)
        return knex('users').where('username', user.username)
    },
    Users: function(data) {
        return module.exports.Exists(data)
        .then(function(user) {
            // console.log('User from Users: ', user)
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
    Comments: function() {
        return knex('comments')
    }
}
