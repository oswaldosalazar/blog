
exports.up = function(knex, Promise) {
    return knex.schema.createTable('comments', function(table) {
        table.increments('id')
        table.string('body')
        table.integer('author_id')
            .references('uid')
            .inTable('users')
        table.integer('post_id')
            .references('id')
            .inTable('posts')
        table.dateTime('postDate')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('comments')
};
