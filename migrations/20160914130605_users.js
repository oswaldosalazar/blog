
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
        table.increments('uid').primary()
        table.string('username').unique()
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users')

};
