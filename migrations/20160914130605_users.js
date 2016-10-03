
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
        table.increments('uid').primary()
        table.string('username').unique()
        table.timestamps()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users')

};
