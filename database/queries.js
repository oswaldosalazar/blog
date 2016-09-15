var knex = require('./knex')

module.exports = {
    Exists: function(user) {
        // console.log('In queries:', data.username)
        console.log("From Query Exists: ", user.username)
        return knex('users').where('username', user.username)
    },
    Users: function(data) {
        return module.exports.Exists(data)
        .then(function(user) {
            console.log(user)
            if(!user.length){
                return knex('users').insert(data)
            }
        })
        // knex('users').whereNotIn('username', data.username)
        //     .then(function () {
        //         knex('users').insert(data))
        //     }
        // return knex('users').insert(data)
    },
    Posts: function(data) {
        return knex('posts').insert(data)
    },
    Comments: function() {
        return knex('comments')
    }
}
