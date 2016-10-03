
exports.up = function(knex, Promise) {
    return knex.schema.createTable('comments', function(table) {
        table.increments('id').primary()
        table.string('comment_body', 1000)
        table.integer('author_id')
            .references('uid')
            .inTable('users')
            .onDelete('CASCADE')
        table.integer('post_id')
            .references('id')
            .inTable('posts')
            .onDelete('CASCADE')
        table.dateTime('postDate')
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('comments')
};
