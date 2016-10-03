exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({uid: 2, username: 'James Kirk'}),
        knex('users').insert({uid: 3, username: 'Jean-Luc Picard'}),
        knex('users').insert({uid: 4, username: 'Christopher Pike'}),
        knex('users').insert({uid: 5, username: 'William Riker'}),
        knex('users').insert({uid: 6, username: 'Deanna Troi'})
      ]);
    });
};
